# FRONTEND_PRACTICES.md — Pratiques React + MUI + Storybook Dilypse

## Architecture de composant

### Structure de fichiers
```
design-system/src/
  theme/
    tokens.js          → Tokens (source de vérité)
    index.js           → Theme MUI complet
  icons/
    iconMap.js          → Re-exports Hugeicons
    StarFilled.jsx      → SVG custom
  stories/
    atoms/              → Composants de base (Button, Input...)
    molecules/          → Compositions (Card, Alert, Table...)
    organisms/          → Patterns complexes (Sidebar, Header)
    foundations/        → Documentation tokens
    utils/
      DocPage.jsx       → Composant de documentation
```

### Principe de responsabilité unique
Un composant = une responsabilité. Si un composant gère logique métier ET affichage, séparer :
```jsx
// ✅ Composant de présentation pur
export default function ReviewListItem({ review, selected, onClick }) { ... }

// ✅ Logique dans le parent (App.jsx)
const filtered = useMemo(() => reviews.filter(...), [reviews, filters]);
```

---

## Styles — MUI sx prop + tokens

### Règle absolue : tokens sémantiques uniquement
```jsx
// ✅ Tokens importés
import { text, background, border, spacing } from '../theme/tokens';
const sp = spacing;

<Box sx={{
  color: text.primary,
  bgcolor: background.secondary,
  border: `1px solid ${border.primary}`,
  px: sp[6] + 'px',
  borderRadius: radius.lg + 'px',
}}>

// ❌ Jamais
<Box sx={{ color: '#171717', bgcolor: '#FAFAFA', px: '16px' }}>
```

### Utiliser les variants MUI
```jsx
// ✅ Le theme gère le style
<Typography variant="subtitle2">Label</Typography>
<Button variant="contained" size="small">Action</Button>
<TextField size="small" fullWidth />
<Select size="small" fullWidth />

// ✅ Override léger sur un variant (fontWeight, color)
<Typography variant="caption" sx={{ fontWeight: 600, color: text.tertiary }}>

// ❌ Réinventer ce que le theme fait déjà
<Typography sx={{ fontSize: 14, fontWeight: 500 }}>
<Button sx={{ bgcolor: '#1570EF', borderRadius: '8px' }}>
```

---

## Icônes

```jsx
// ✅ UI — Hugeicons
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
<HugeiconsIcon icon={Search01Icon} size={16} color={foreground.tertiary} />

// ✅ Brand — SVG inline (Google, Facebook...) — seuls hex autorisés
function GoogleIcon() {
  return <svg>...</svg>;
}

// ❌ Pas de MUI Icons
import SearchIcon from '@mui/icons-material/Search';
```

---

## Storybook — Pattern CSF3 Dilypse

### Structure d'une story
```jsx
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', display: 'block', mb: 2 }}>
      {label}
    </Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/ComponentName',
  component: ComponentName,
  parameters: { controls: { disable: true }, options: { showPanel: false } },
};

// Overview — documentation + exemples visuels
export const Overview = {
  name: 'Overview',
  render: function Render() {
    return (
      <>
        <DocPage
          title="ComponentName"
          description="Description en français."
          dos={['Règle 1', 'Règle 2']}
          donts={['Anti-pattern 1']}
          a11y={['Note accessibilité']}
          related={['AutreComposant']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="Variante par défaut">
            <ComponentName />
          </S>
          <S label="Avec icône">
            <ComponentName icon={...} />
          </S>
        </Box>
      </>
    );
  },
};

// Playground — contrôles interactifs
export const Playground = {
  render: (args) => <ComponentName {...args} />,
};
```

### Organisation dans Storybook
```
Foundations/    → Tokens, couleurs, typographie, spacing
Atoms/         → Button, Checkbox, Chip, TextField, Icon...
Molecules/     → Card, Alert, Table, Dialog, Tabs...
Organisms/     → Sidebar, Header
```

---

## Performance React

### Mémoïsation — uniquement quand nécessaire
```jsx
// ✅ useMemo pour les calculs coûteux (filtrage 220+ avis)
const filtered = useMemo(() => reviews.filter(...).sort(...), [reviews, filters]);

// ✅ useCallback pour les handlers passés à des listes
const handleSendReply = useCallback((id, text) => { ... }, [deps]);

// ❌ Ne pas mémoïser par défaut — overhead inutile
```

### Lazy loading
```jsx
// Pour les composants lourds ou rarement utilisés
const BatchReplyQueue = React.lazy(() => import('./BatchReplyQueue'));
```

---

## Workflow de création d'un composant

1. **Chercher** dans le design system si un composant similaire existe
2. **Créer** dans `design-system/src/stories/{category}/`
3. **Documenter** avec DocPage (description, dos/donts, a11y, related)
4. **Vérifier** dans Storybook local
5. **Utiliser** dans l'app en important depuis le theme partagé
6. **Push** → déploiement auto Vercel
