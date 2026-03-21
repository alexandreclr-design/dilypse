---
name: Projet Dilypse — état et architecture
description: Architecture technique, état d'avancement et décisions clés du projet Dilypse
type: project
---

**Architecture :** Monorepo avec 3 dossiers (design-system, reputation, google-rank). Pas de package partagé pour le theme — dette technique connue, les tokens sont dupliqués.

**Déploiement :** Vercel auto-deploy sur push (main). Deux projets : dilypse-ds.vercel.app et dilypse-reputation.vercel.app. Root directories configurés.

**GitHub :** github.com/alexandreclr-design/dilypse — SSH auth configuré.

**Design system :** 32 stories Storybook (15 atoms, 15 molecules, 2 organisms, 1 foundations). Theme MUI complet avec 30+ overrides. Hugeicons (200+ icônes free). Sidebar dark mode (primarySolid).

**Reputation app :** Split view (liste + détail), filtres multi-select, search, batch reply queue, auto-advance, keyboard shortcuts, framer-motion, 220 avis mockés sur 50 établissements.

**Why:** Dilypse aide les entreprises multi-établissements à gérer leur réputation Google. Le volume est le facteur clé de design — les clients ont 1 à 100+ locations et 1400+ avis/mois.

**How to apply:** Toujours penser volume dans les décisions UX. Les filtres doivent avoir du search, les listes des compteurs, le workflow doit supporter le batch.
