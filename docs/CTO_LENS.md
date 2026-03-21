# CTO Lens -- Dilypse

> Referentiel technique a destination des developpeurs. Chaque PR doit respecter ces exigences de performance, d'architecture et d'accessibilite.

---

## 1. Bundle & Tree-shaking

### Regle d'or : imports nommes uniquement

Les imports par defaut de librairies volumineuses empechent le tree-shaking et gonflent le bundle.

```tsx
// INTERDIT -- importe toute la librairie (300 Ko+)
import _ from 'lodash';
import * as Icons from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

// CORRECT -- importe uniquement ce qui est utilise
import debounce from 'lodash/debounce';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs'; // dayjs est deja leger (~2 Ko)
```

### Regles d'import

| Regle | Detail |
|---|---|
| **Imports nommes** | Toujours utiliser `import { X } from 'lib'` ou `import X from 'lib/X'`. |
| **Pas de wildcard** | `import *` est interdit sauf pour les types TypeScript (`import type *`). |
| **Barrel files** | Eviter les `index.ts` qui re-exportent tout un dossier. Privilegier les imports directs vers le fichier source. |
| **Analyse reguliere** | Executer `npx webpack-bundle-analyzer` ou `npx vite-bundle-visualizer` avant chaque release majeure. |
| **Budget de bundle** | Le bundle JS initial (gzippe) ne doit pas depasser **200 Ko**. Alerter au-dela de **150 Ko**. |

### Lazy loading des routes

```tsx
import { lazy, Suspense } from 'react';

// Chaque route est chargee a la demande
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Settings = lazy(() => import('./pages/Settings'));

function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

---

## 2. Re-renders React

Les re-renders inutiles degradent la reactivite, surtout sur les listes et les tableaux.

### Diagnostic

```tsx
// En developpement, activer le Profiler React DevTools
// ou utiliser le hook suivant pour detecter les re-renders :
import { useRef } from 'react';

function useRenderCount(componentName: string) {
  const count = useRef(0);
  count.current += 1;
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Render] ${componentName}: ${count.current}`);
  }
}
```

### React.memo

Utiliser `React.memo` sur les composants qui :
- Recoivent des **props stables** mais dont le parent re-render souvent.
- Sont des **elements de liste** rendus dans un `.map()`.

```tsx
// AVANT -- re-render a chaque render du parent
function ContactRow({ contact, onSelect }: Props) {
  return (
    <tr onClick={() => onSelect(contact.id)}>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
    </tr>
  );
}

// APRES -- ne re-render que si les props changent
const ContactRow = memo(function ContactRow({ contact, onSelect }: Props) {
  return (
    <tr onClick={() => onSelect(contact.id)}>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
    </tr>
  );
});
```

### useCallback et useMemo

| Hook | Quand l'utiliser | Quand NE PAS l'utiliser |
|---|---|---|
| `useCallback` | La fonction est passee en prop a un composant `memo`. | La fonction n'est pas passee en prop, ou le composant enfant n'est pas memo. |
| `useMemo` | Le calcul est couteux (> 1ms) ou le resultat est passe a un composant `memo`. | Le calcul est trivial (simple concatenation, formatage). |

```tsx
// useCallback : stabiliser la reference de la fonction
const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);

// useMemo : eviter un recalcul couteux a chaque render
const sortedContacts = useMemo(
  () => contacts.slice().sort((a, b) => a.name.localeCompare(b.name)),
  [contacts]
);
```

### Regles anti-pattern

```tsx
// INTERDIT -- objet cree a chaque render, casse le memo de l'enfant
<ContactRow contact={contact} style={{ marginTop: 8 }} />

// CORRECT -- objet stable
const rowStyle = useMemo(() => ({ marginTop: 8 }), []);
<ContactRow contact={contact} style={rowStyle} />

// INTERDIT -- fonction anonyme a chaque render
<ContactRow contact={contact} onSelect={(id) => setSelected(id)} />

// CORRECT -- reference stable
<ContactRow contact={contact} onSelect={handleSelect} />
```

---

## 3. Chargement et performance percue

### Skeleton screens

Le skeleton s'affiche **immediatement** et reproduit la structure du contenu a venir.

```tsx
function ContactListSkeleton() {
  return (
    <div role="status" aria-label="Chargement des contacts">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton skeleton-avatar" />
          <div className="skeleton skeleton-text" style={{ width: '60%' }} />
          <div className="skeleton skeleton-text" style={{ width: '40%' }} />
        </div>
      ))}
    </div>
  );
}
```

### Lazy loading des images

```tsx
// Utiliser l'attribut natif loading="lazy"
<img
  src={contact.avatar}
  alt={`Photo de ${contact.name}`}
  loading="lazy"
  decoding="async"
  width={40}
  height={40}
/>
```

### Core Web Vitals -- Seuils cibles

| Metrique | Description | Seuil Bon | Seuil Acceptable | Outil de mesure |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | Temps d'affichage du plus grand element visible | < 2.5s | < 4.0s | Lighthouse, PageSpeed Insights |
| **INP** (Interaction to Next Paint) | Reactivite aux interactions | < 200ms | < 500ms | Chrome DevTools, Web Vitals JS |
| **CLS** (Cumulative Layout Shift) | Stabilite visuelle (pas de "saut" de layout) | < 0.1 | < 0.25 | Lighthouse, Layout Instability API |

### Strategies de performance

| Strategie | Impact | Implementation |
|---|---|---|
| **Code splitting par route** | Reduit le bundle initial | `React.lazy` + `Suspense` (voir section 1). |
| **Preload des routes critiques** | Accelere la navigation | `<link rel="preload">` pour les chunks des routes les plus visitees. |
| **Mise en cache API** | Reduit les appels reseau | `react-query` / `SWR` avec `staleTime` adapte au cas d'usage. |
| **Debounce des recherches** | Reduit la charge serveur | 300ms de debounce sur les champs de recherche. |
| **Virtualisation des listes** | Gere les grandes listes (> 100 elements) | `@tanstack/react-virtual` ou `react-window`. |
| **Optimistic updates** | Ameliore la perception de vitesse | Mettre a jour l'UI avant la confirmation serveur, rollback en cas d'erreur. |

---

## 4. Architecture de composants a l'echelle

### Principe YAGNI (You Aren't Gonna Need It)

> Ne pas construire de l'abstraction avant d'en avoir besoin. La generalisation prematuree est une forme de dette technique.

### Progression d'abstraction recommandee

```
1. Code inline dans le composant page
   -> Quand le code n'existe qu'a un seul endroit.

2. Extraction dans un composant local (meme dossier)
   -> Quand le composant page depasse ~150 lignes
      ou qu'un bloc logique est clairement isole.

3. Composant partage (dossier components/)
   -> Quand le composant est utilise dans >= 2 pages differentes.

4. Composant de design system (dossier ui/)
   -> Quand le composant est generique, configurable
      et n'a pas de logique metier.
```

### Structure de dossiers recommandee

```
src/
  components/           # Composants partages (metier)
    ContactCard/
      ContactCard.tsx
      ContactCard.test.tsx
      index.ts
  ui/                   # Design system (generiques, sans logique metier)
    Button/
    Input/
    Modal/
    Table/
  pages/                # Composants de page (route-level)
    Dashboard/
      Dashboard.tsx
      DashboardSkeleton.tsx
      useDashboardData.ts
  hooks/                # Hooks partages
  utils/                # Fonctions utilitaires pures
  types/                # Types TypeScript partages
```

### Regles d'architecture

| Regle | Detail |
|---|---|
| **Colocation** | Les fichiers lies (composant, test, types, styles) vivent dans le meme dossier. |
| **Dependance unidirectionnelle** | `pages/ -> components/ -> ui/`. Jamais l'inverse. |
| **Pas de logique metier dans ui/** | Les composants `ui/` ne connaissent ni les API, ni les entites metier. |
| **Un composant = un fichier** | Ne pas exporter plusieurs composants depuis un seul fichier (sauf sous-composants internes). |
| **Props explicites** | Pas de `...rest` sur les props metier. Lister chaque prop explicitement. |

---

## 5. Accessibilite comme exigence non fonctionnelle

L'accessibilite n'est pas une fonctionnalite optionnelle. C'est une **exigence non fonctionnelle** au meme titre que la securite ou la performance.

### Niveau cible : WCAG 2.1 AA

| Critere | Exigence | Verification |
|---|---|---|
| **Navigation clavier** | Tous les elements interactifs sont atteignables et activables au clavier. | Tester avec Tab, Shift+Tab, Entree, Espace, Echap. |
| **Focus visible** | Un indicateur de focus est toujours visible. | Ne jamais utiliser `outline: none` sans alternative. |
| **Roles ARIA** | Les composants personnalises exposent les bons roles. | `role="dialog"`, `role="alert"`, `role="status"`, etc. |
| **Labels** | Chaque champ de formulaire a un label associe. | `<label htmlFor>`, `aria-label`, ou `aria-labelledby`. |
| **Alt text** | Chaque image informative a un texte alternatif. | Images decoratives : `alt=""` + `aria-hidden="true"`. |
| **Contraste** | Ratios conformes (voir UI_STANDARDS.md). | Verifier avec l'outil Lighthouse ou axe DevTools. |
| **Lecteur d'ecran** | L'information est comprehensible sans visuel. | Tester avec VoiceOver (macOS) ou NVDA (Windows). |

### Patterns ARIA courants

```tsx
// Modale accessible
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Supprimer le contact</h2>
  <p id="modal-description">
    Cette action est irreversible. Le contact sera definitivement supprime.
  </p>
  <Button variant="danger">Supprimer</Button>
  <Button variant="secondary">Annuler</Button>
</div>

// Toast / notification accessible
<div role="status" aria-live="polite" aria-atomic="true">
  Contact enregistre avec succes
</div>

// Bouton icone accessible
<button aria-label="Supprimer le contact" title="Supprimer le contact">
  <TrashIcon aria-hidden="true" />
</button>
```

### Gestion du focus

```tsx
// Focus trap dans une modale
import { useEffect, useRef } from 'react';

function useAutoFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return ref;
}

// Utilisation
function Modal({ children }: Props) {
  const firstFocusable = useAutoFocus<HTMLButtonElement>();
  return (
    <div role="dialog" aria-modal="true">
      {children}
      <Button ref={firstFocusable} variant="primary">
        Confirmer
      </Button>
    </div>
  );
}
```

---

## 6. Checklist CTO avant merge

Avant chaque merge sur la branche principale, verifier les points suivants :

### Performance

- [ ] **Bundle size** -- Pas de regression significative (verifier avec `npx bundlesize` ou equivalent).
- [ ] **Imports** -- Aucun import wildcard, aucun barrel file qui importe trop.
- [ ] **Lazy loading** -- Les nouvelles routes sont chargees en `React.lazy`.
- [ ] **Re-renders** -- Les listes et tableaux utilisent `React.memo` si necessaire ; pas de props instables.
- [ ] **Images** -- `loading="lazy"` et dimensions explicites (`width`, `height`) sur toutes les images.

### Architecture

- [ ] **YAGNI** -- Pas d'abstraction prematuree. Le code est extrait en composant partage uniquement s'il est reutilise.
- [ ] **Dependances** -- `pages/ -> components/ -> ui/`, jamais l'inverse.
- [ ] **Colocation** -- Tests, types et styles sont dans le meme dossier que le composant.
- [ ] **Types** -- Pas de `any`. Les types sont explicites et documentes.

### Accessibilite

- [ ] **Navigation clavier** -- Tous les elements interactifs fonctionnent au clavier.
- [ ] **Focus** -- Focus visible et gere correctement (modales, drawers).
- [ ] **ARIA** -- Roles et labels corrects sur les composants personnalises.
- [ ] **Contraste** -- Les ratios sont conformes WCAG AA.

### Qualite

- [ ] **Tests** -- Les cas nominaux et d'erreur sont couverts.
- [ ] **Erreurs** -- Les etats d'erreur sont geres et affiches a l'utilisateur.
- [ ] **Console** -- Aucun `console.log` residuel, aucun warning React en console.
- [ ] **TypeScript** -- `tsc --noEmit` passe sans erreur.
- [ ] **Lint** -- Aucune erreur ESLint non justifiee.
