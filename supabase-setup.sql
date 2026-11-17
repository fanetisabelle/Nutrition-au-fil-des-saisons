-- Référence du schéma déjà exécuté dans le projet Supabase.
create table if not exists public.recettes (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  description text,
  ingredients jsonb not null default '[]'::jsonb,
  preparation text,
  saison text,
  categorie text,
  image_url text,
  publie boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.recettes enable row level security;
drop policy if exists "Lecture publique des recettes" on public.recettes;
drop policy if exists "Administration des recettes" on public.recettes;
create policy "Lecture publique des recettes" on public.recettes
for select to anon, authenticated using (publie = true);
create policy "Administration des recettes" on public.recettes
for all to authenticated
using ((select auth.jwt() ->> 'email') = 'fanetisabelle25@gmail.com')
with check ((select auth.jwt() ->> 'email') = 'fanetisabelle25@gmail.com');
