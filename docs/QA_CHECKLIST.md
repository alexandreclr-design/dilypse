# QA_CHECKLIST.md — Auto-évaluation avant livraison

## 🎨 Design & Tokens

- [ ] Toutes les couleurs utilisent des tokens sémantiques (`text.*`, `background.*`, `border.*`, `foreground.*`)
- [ ] Aucune couleur hex hardcodée (exception : SVG brand comme Google logo)
- [ ] Les spacings utilisent `sp[X] + 'px'` — pas de valeurs px arbitraires
- [ ] Les radius utilisent `radius.*` tokens
- [ ] Le composant est visuellement cohérent avec les composants existants du Storybook

## 🔤 Typography

- [ ] Tous les textes utilisent des variants MUI (`variant="body2"`, `variant="caption"`, etc.)
- [ ] Aucun `fontSize` inline (exception : override de `fontWeight` ou `color` sur un variant)
- [ ] La hiérarchie typographique est lisible : titre > sous-titre > corps > méta

## 🧩 Composants MUI

- [ ] Les boutons utilisent les variants du theme (`variant="contained"`, `size="small"`)
- [ ] Les inputs utilisent `size="small"` et les overrides du theme
- [ ] Les icônes utilisent `HugeiconsIcon` (pas `@mui/icons-material`)
- [ ] Les composants MUI ne sont pas sur-stylés en `sx` quand le theme gère déjà le style

## 💬 UX

- [ ] Un seul bouton primaire par contexte visuel
- [ ] Les éléments liés sont groupés (loi de proximité)
- [ ] L'interface respire — spacing intentionnel entre les sections
- [ ] Pour 50+ établissements : le composant gère le volume (search, scroll, compteurs)
- [ ] Les états sont définis : default, hover, selected, disabled
- [ ] Les actions destructives ont une confirmation

## 📚 Storybook

- [ ] La story existe dans `design-system/src/stories/{category}/`
- [ ] L'Overview utilise `DocPage` avec : title, description, dos, donts, a11y, related
- [ ] Les variantes principales sont démontrées avec des sections `<S label="...">`
- [ ] Un Playground avec argTypes est présent

## ♿ Accessibilité

- [ ] Les éléments interactifs ont un label accessible
- [ ] Les icônes décoratives sont `aria-hidden`
- [ ] Le focus est visible sur tous les éléments interactifs
- [ ] La navigation clavier est logique (tab order)

## 🏗️ Performance

- [ ] Les imports Hugeicons sont ciblés (pas de `import * from`)
- [ ] Les calculs coûteux sont mémoïsés (`useMemo`, `useCallback`)
- [ ] Pas de re-renders inutiles (objets/fonctions inline passés à des enfants)

---

## Score

**Obligatoire avant push :**
- Design & Tokens : 100%
- Typography : 100%
- Composants MUI : 100%

**Recommandé :**
- UX + Storybook + a11y

**Production :**
- Tout coché
