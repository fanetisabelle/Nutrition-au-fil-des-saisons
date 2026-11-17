# Nutrition au fil des saisons — Version 17 avec administration Supabase

Cette version conserve l'application existante (questionnaire, menus, fiches produits, images, logo, navigation et paiement Swan) et ajoute une entrée « Administration privée » dans le menu.

## 1. Renseigner la clé publiable

Dans le fichier `supabase-config.js`, remplacer uniquement `REMPLACER_PAR_VOTRE_CLE_SB_PUBLISHABLE` par la clé commençant par `sb_publishable_` disponible dans Supabase > Project Settings > API Keys.

Ne jamais utiliser une clé `sb_secret_` ou `service_role` dans ce fichier. La clé publiable est conçue pour être utilisée dans le navigateur. Les droits d'écriture sont contrôlés par les politiques RLS.

L'URL du projet est déjà renseignée : `https://kvobxjdkfktjptlryds.supabase.co`.

## 2. Déployer sur GitHub Pages

Décompresser le ZIP, puis téléverser le contenu du dossier à la racine du dépôt GitHub Pages en remplaçant les fichiers du même nom. Conserver les autres fichiers et dossiers du dépôt, notamment `.github`.

Téléverser ensemble `index.html`, `supabase-config.js`, `sw.js`, le manifeste, les logos, les icônes, le visuel d'accueil et les quatre images de fiches recettes.

## 3. Utiliser l'administration

Ouvrir le site publié, ouvrir le menu ☰ puis « Administration privée ». Se connecter avec `fanetisabelle25@gmail.com` et le mot de passe créé dans Supabase.

Au premier accès, cliquer sur « Importer les recettes déjà présentes dans le site ». L'import ne s'effectue que si la table `public.recettes` est vide. Les recettes existantes sont reprises sans doublons, avec leurs intitulés et les noms d'images actuels.

L'administration permet ensuite d'ajouter, modifier, publier/dépublier et supprimer des recettes. Pour associer une image, saisir un chemin de fichier déjà présent dans le dépôt (ex. `./fiche-chili-revisite.png`) ou une URL publique d'image.

## Sécurité et limites

- Garder les inscriptions publiques désactivées dans Supabase.
- La clé publiable est publique par conception. Les écritures sont protégées par RLS : seule une session authentifiée portant l'adresse exacte `fanetisabelle25@gmail.com` peut gérer les lignes de `public.recettes`.
- Le masquage de l'administration dans l'interface n'est pas la protection principale : les politiques RLS de Supabase contrôlent réellement les accès aux données.
- Cette version n'active pas l'envoi d'images vers Supabase Storage. Les images doivent déjà se trouver dans le dépôt ou être accessibles par URL publique.
- Le paiement annuel Swan reste dans son fonctionnement antérieur. L'activation locale du paiement n'est pas vérifiée par un webhook bancaire et n'est donc pas sécurisée côté serveur. Ne pas considérer cette version comme un contrôle fiable des abonnements payants.
- Les réponses du questionnaire restent enregistrées localement dans le navigateur, comme avant.
