# DESIGN_SYSTEM_REF.md — Référence Design System Dilypse

## Philosophie

Dilypse mise sur la clarté opérationnelle. Chaque élément d'interface réduit la charge cognitive de l'utilisateur professionnel qui gère 1 à 100+ établissements. On privilégie la densité d'information maîtrisée, la respiration intentionnelle et la cohérence systémique. Les références UX : Linear, Stripe, Superhuman, Notion.

---

## Tokens — source de vérité

Fichier : `src/theme/tokens.js`
Import : `import { text, foreground, background, border, radius, spacing, typographyTokens, colors } from '../theme/tokens';`

### Couleurs primitives (8 palettes)

Chaque palette va de 25 (très clair) à 900 (très foncé) :
`neutral`, `blue`, `red`, `orange`, `yellow`, `green`, `pink`, `purple`

**Règle : ne jamais utiliser les primitives directement dans les composants.** Utiliser les tokens sémantiques ci-dessous.

### Texte (`text.*`)
| Token | Hex | Usage |
|---|---|---|
| `text.primary` | #171717 | Titres, noms, contenu principal |
| `text.secondary` | #4A4A4A | Descriptions, corps de texte, réponses aux avis |
| `text.tertiary` | #858585 | Méta-info, labels secondaires, sous-texte |
| `text.white` | #FFFFFF | Texte sur fond dark |
| `text.disabled` | #BFBFBF | Contenu inactif, dates peu importantes |
| `text.placeholder` | #A0A0A0 | Placeholders d'inputs uniquement |
| `text.brandPrimary` | #175CD3 | Texte sur fond brandLight (chips, filtres actifs) |
| `text.brandSecondary` | #1570EF | Liens brand, accents |
| `text.error` | #D92D20 | Statuts erreur, compteurs "non répondu" |
| `text.success` | #039855 | Statuts succès, "répondu" |

### Foreground — icônes (`foreground.*`)
| Token | Usage |
|---|---|
| `foreground.primary` | Icônes principales |
| `foreground.tertiary` | Icônes secondaires, placeholders |
| `foreground.disabled` | Icônes inactives |
| `foreground.brandPrimary` | Icônes sur fond brand (filtre actif) |
| `foreground.errorPrimary` | Dot "non répondu", icônes erreur |
| `foreground.successPrimary` | Icônes succès |

### Background (`background.*`)
| Token | Hex | Usage |
|---|---|---|
| `background.primary` | #FFFFFF | Fond de contenu, cards |
| `background.primaryHover` | #FAFAFA | Hover sur fond blanc |
| `background.primarySolid` | #0A0A0A | Sidebar dark |
| `background.secondary` | #FAFAFA | Zones secondaires, items répondus, panneau droit |
| `background.secondaryHover` | #F5F5F5 | Hover sur fond secondary, item sélectionné |
| `background.tertiary` | #EEEEEE | Badges compteurs, chips inactifs |
| `background.brandLight` | #EFF8FF | Fond filtre/chip actif |
| `background.brandLightHover` | #D1E9FF | Hover sur brandLight |
| `background.brandSolid` | #1570EF | Boutons brand, badges |
| `background.errorLight` | #FEF3F2 | Badge "non répondu" |
| `background.errorSolid` | #D92D20 | Badge sidebar |
| `background.successLight` | #ECFDF3 | Badge "répondu" |

### Border (`border.*`)
| Token | Usage |
|---|---|
| `border.primary` | Séparateurs légers, cards, dividers |
| `border.secondary` | Bordures inputs/boutons inactifs |
| `border.tertiary` | Bordures focus |
| `border.brand` | Bordure filtre actif, selected state |
| `border.brandLight` | Bordure chips actifs |

### Spacing (`spacing.*`)
```
sp[0]=0  sp[1]=2  sp[2]=4  sp[3]=6  sp[4]=8  sp[5]=12
sp[6]=16 sp[7]=20 sp[8]=24 sp[9]=32 sp[10]=40 sp[11]=48
```
Usage : `sp[6] + 'px'` → `'16px'`

### Radius (`radius.*`)
```
radius.none=0  radius.xs=2  radius.sm=4  radius.md=8
radius.lg=12   radius.xl=16  radius.full=999
```

### Typographie (`typographyTokens.*`)
```
Famille : "Inter Variable", system-ui, sans-serif
Tailles : xs=12, sm=14, md=16, lg=18, xl=20, 2xl=24, 3xl=32
Poids   : regular=400, medium=500, semibold=600, bold=700
```

---

## Composants disponibles

### Atoms (15)
- **Button** : contained/outlined/text, primary/secondary/error, sm/md/lg
- **Avatar** : image/initiales/icône, rounded/square, groupable
- **Checkbox** : checked/unchecked/indeterminate
- **Chip** : filled/outlined, deletable, avec avatar
- **CircularProgress** : determinate/indeterminate
- **Divider** : horizontal/vertical
- **Icon** : browse 200+ Hugeicons, click-to-copy
- **IconButton** : sm/md/lg
- **Radio** : avec RadioGroup
- **SegmentedControl** : ToggleButtonGroup
- **Select** : outlined, avec Autocomplete
- **Skeleton** : text/circular/rectangular
- **Switch** : on/off
- **TextField** : outlined, avec adornments
- **TextLink** : underline on hover
- **Tooltip** : placement top/right/bottom/left

### Molecules (15)
Accordion, Alert, Breadcrumbs, Card, Collapse, Dialog, Drawer, EmptyState, List, Menu, Pagination, Snackbar, Stepper, Table, Tabs

### Organisms (2)
- **Sidebar** : dark mode, groups, submenus, collapsed, user footer, badges
- **Header** : icon + title + CTA slot

---

## Conventions de nommage

```
Composants  : PascalCase (ReviewDetail, BatchReplyQueue)
Props       : camelCase (onSendReply, selectedId)
Fichiers    : PascalCase.jsx (ReviewDetail.jsx)
Stories     : Category/Name (Atoms/Button, Organisms/Sidebar)
Tokens JS   : camelCase groupé (text.primary, background.brandLight)
Events      : on + Verbe (onClick, onSendReply, onToneChange)
```
