const CACHE_NAME = "nutrition-saisons-v17-admin-supabase";
const APP_FILES = ["./", "./index.html", "./supabase-config.js", "./manifest.webmanifest", "./logo-isabelle-fanet-192.png", "./logo-isabelle-fanet-512.png", "./logo-isabelle-fanet-1024.png", "./apple-touch-icon.png", "./hero-mediterranee.jpg", "./fiche-chili-revisite.png", "./fiche-pommes-de-terre-roties.png", "./fiche-escalivade-du-sud.png", "./fiche-chataigne-vallespir.png"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const isAppDocument = event.request.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/");
  if (isAppDocument) {
    event.respondWith(fetch(event.request).then(response => {
      if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html"))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
