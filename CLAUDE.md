# CLAUDE.md — Conventions du projet Dilypse

## Structure du projet

```
Dilypse/
├── design-system/     → Storybook + composants (dilypse-ds.vercel.app)
├── reputation/        → App SaaS gestion d'avis (dilypse-reputation.vercel.app)
├── google-rank/       → Placeholder (vide)
├── docs/              → Skills et référentiels (SKILL.md, UI_STANDARDS.md, etc.)
└── CLAUDE.md          → Ce fichier
```

## Stack technique

- **React 19** en JSX (pas TypeScript)
- **MUI 7** — composants + theme overrides complet
- **Emotion** — CSS-in-JS via la prop `sx`
- **Hugeicons** — `@hugeicons/react` + `@hugeicons/core-free-icons` pour les icônes UI
- **Framer Motion** — animations dans les apps (pas dans le design system)
- **Vite 8** — build
- **Storybook 10** — documentation des composants
- **Vercel** — déploiement auto sur push (main)

## Tokens et theme

### Comment ça marche
Les tokens vivent dans `src/theme/tokens.js`. Le theme MUI dans `src/theme/index.js`.
On importe les tokens sémantiques, jamais les primitives couleur directement :

```jsx
// ✅ Correct
import { text, foreground, background, border, spacing, radius, typographyTokens } from '../theme/tokens';
const sp = spacing;
<Box sx={{ color: text.primary, bgcolor: background.secondary, px: sp[6] + 'px' }}>

// ❌ Interdit
<Box sx={{ color: '#171717', bgcolor: '#FAFAFA', px: '16px' }}>
<Box sx={{ color: colors.neutral[950] }}> // primitives directes
```

### Tokens sémantiques — quand utiliser quoi

**Texte :**
- `text.primary` (#171717) — titres, noms, contenu principal
- `text.secondary` (#4A4A4A) — descriptions, corps de texte
- `text.tertiary` (#858585) — méta-info, labels secondaires
- `text.disabled` (#BFBFBF) — contenu inactif, placeholders visuels
- `text.placeholder` (#A0A0A0) — placeholders d'inputs uniquement
- `text.brandPrimary` (#175CD3) — texte sur fond brand light
- `text.error` / `text.success` — statuts sémantiques

**Fonds :**
- `background.primary` (#FFFFFF) — fond de contenu principal
- `background.secondary` (#FAFAFA) — zones secondaires, items lus/répondus
- `background.secondaryHover` (#F5F5F5) — hover sur fond secondary
- `background.primarySolid` (#0A0A0A) — sidebar dark
- `background.brandLight` (#EFF8FF) — fond de filtre/chip actif
- `background.errorLight` (#FEF3F2) — badge erreur
- `background.successLight` (#ECFDF3) — badge succès

**Bordures :**
- `border.primary` (#EEEEEE) — séparateurs légers, cards
- `border.secondary` (#E0E0E0) — bordures de boutons/inputs inactifs
- `border.brand` (#2E90FA) — filtre actif, sélection
- `border.brandLight` (#B2DDFF) — chips actifs

**Spacing** — toujours `sp[X] + 'px'` :
- `sp[2]`=4, `sp[3]`=6, `sp[4]`=8, `sp[5]`=12, `sp[6]`=16, `sp[7]`=20, `sp[8]`=24, `sp[9]`=32, `sp[10]`=40

**Radius :** `radius.xs`=2, `radius.sm`=4, `radius.md`=8, `radius.lg`=12

## Typography — utiliser les variants MUI

```jsx
// ✅ Correct — variant MUI (stylé par le theme)
<Typography variant="h5">Titre</Typography>          // 20px semibold
<Typography variant="subtitle1">Sous-titre</Typography> // 16px medium
<Typography variant="subtitle2">Label</Typography>    // 14px medium
<Typography variant="body1">Texte principal</Typography> // 16px regular
<Typography variant="body2">Texte secondaire</Typography> // 14px regular
<Typography variant="caption">Méta</Typography>       // 12px regular
<Typography variant="overline">LABEL SECTION</Typography> // 12px medium uppercase

// ❌ Interdit — fontSize inline
<Typography sx={{ fontSize: 13.5 }}>Texte</Typography>
```

Exception : `fontWeight` et `color` en override sur un variant sont OK.

## Icônes

```jsx
// ✅ Icônes UI — Hugeicons
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
<HugeiconsIcon icon={Search01Icon} size={16} color={foreground.tertiary} />

// ✅ Icônes brand — SVG custom inline (Google, Facebook, etc.)
// Les couleurs brand sont les seules valeurs hex autorisées en hardcode

// ❌ Interdit
import SearchIcon from '@mui/icons-material/Search'; // pas de MUI Icons
```

## Composants MUI — utiliser les variants du theme

```jsx
// ✅ Les variants sont stylées par le theme, pas besoin de sx
<Button variant="contained" size="small">Action</Button>
<Button variant="outlined" size="small">Secondaire</Button>
<Button variant="contained" color="secondary" size="small">Dark</Button>
<Select size="small" fullWidth>...</Select>
<TextField size="small" fullWidth />
<Chip size="small" label="Tag" />

// ❌ Réinventer les styles du theme
<Button sx={{ bgcolor: '#1570EF', borderRadius: '8px', fontSize: 14 }}>
```

## Pattern de story Storybook

Chaque composant suit ce format :

```jsx
import { DocPage } from '../utils/DocPage.jsx';

export default {
  title: 'Atoms/ComponentName',  // ou Molecules/ ou Organisms/
  component: ComponentName,
  parameters: { controls: { disable: true }, options: { showPanel: false } },
};

export const Overview = {
  name: 'Overview',
  render: () => (
    <>
      <DocPage
        title="ComponentName"
        description="Description en français..."
        dos={['Faire ceci', 'Faire cela']}
        donts={['Ne pas faire ceci']}
        a11y={['Note accessibilité']}
        related={['AutreComposant']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Variante 1">
          <ComponentName />
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <ComponentName {...args} />,
};
```

## Workflow de création de composant

1. Créer le composant dans `design-system/src/stories/{category}/`
2. Ajouter la story avec DocPage (Overview + Playground)
3. Vérifier dans Storybook local (`npm run storybook`)
4. Si utilisé dans une app : copier les tokens si nécessaire (dette connue)
5. Push → déploiement auto Vercel

## Déploiement

- **Auto-deploy** sur push vers `main`
- Design system : root directory `design-system/`, build `npm run build-storybook`, output `storybook-static`
- Reputation : root directory `reputation/`, build `npm run build`, output `dist`
- URLs : `dilypse-ds.vercel.app`, `dilypse-reputation.vercel.app`

## Commandes utiles

```bash
# Design system
cd design-system && npm run storybook      # Dev Storybook (port 6006/6007)
cd design-system && npm run build-storybook # Build Storybook

# Reputation
cd reputation && npm run dev               # Dev app (port 5173/5174)
cd reputation && npm run build             # Build app

# Déployer
git add -A && git commit -m "feat: description" && git push
```

## Règles non négociables

1. **Zéro hex hardcodé** — utiliser les tokens sémantiques exclusivement
2. **Zéro fontSize inline** — utiliser les variants Typography MUI
3. **Zéro style qui duplique le theme** — si le theme gère le composant, ne pas overrider
4. **Self-review avant de montrer** — vérifier tokens, variants, spacing, cohérence visuelle
5. **Storybook = source de vérité** — tout composant a sa story
6. **Respiration** — penser spacing et hiérarchie, ne pas entasser

## Dette technique connue

- Les tokens sont dupliqués entre design-system et reputation (pas de package partagé)
- Le filtre "période" est dans l'UI mais ne filtre pas réellement
- Certains atoms manquent de DocPage (CircularProgress, Skeleton, Divider)
- Pas de responsive design (desktop-only)
- Pas de tests
- Les 37 erreurs ESLint dans les stories ne sont pas corrigées

## Leçons apprises

- Toujours se référer au Storybook avant de coder — ne rien inventer
- La hiérarchie d'information est plus importante que la décoration
- Pour 50+ établissements, penser volume : search dans les pickers, compteurs, tri par urgence
- Le pattern email (Superhuman) fonctionne bien pour les listes d'items à traiter
- Auto-advance après action = le vrai batch workflow, pas des checkboxes
- Les apps de référence UX : Linear, Stripe, Notion, Superhuman, Intercom
