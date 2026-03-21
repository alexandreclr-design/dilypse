# UI Standards -- Dilypse

> Referentiel visuel a destination des developpeurs et designers. Chaque composant livre doit respecter ces principes.

---

## 1. Principes visuels fondamentaux (CRAP)

| Principe | Description | Application concrete |
|---|---|---|
| **Contraste** | Les elements differents doivent paraitre *vraiment* differents. | Titres en `font-weight: 700`, corps en `400`. Ratio de contraste >= 4.5:1 (AA). |
| **Repetition** | Reutiliser les memes styles pour creer une coherence visuelle. | Utiliser les tokens de design (couleurs, espacements, typographies) partout. |
| **Alignement** | Chaque element doit etre visuellement connecte a un autre. | S'appuyer sur la grille ; aucun element ne doit sembler place au hasard. |
| **Proximite** | Les elements lies doivent etre regroupes. | Un label et son champ de formulaire partagent un espacement de `4px` ; les groupes de champs sont separes par `24px`. |

### Regles de contraste

- Texte normal (< 18px) : ratio minimum **4.5:1** (WCAG AA).
- Texte large (>= 18px bold ou >= 24px) : ratio minimum **3:1**.
- Elements interactifs (bordures, icones d'action) : ratio minimum **3:1** contre l'arriere-plan.

---

## 2. Systeme de grille (base 8px)

Tous les espacements, dimensions et tailles se basent sur un multiple de **8px**.

```
4px   -- exception : espacement minimal (label/champ, icone/texte)
8px   -- espacement interne serre (padding bouton icone)
16px  -- espacement standard (padding carte, gap entre elements)
24px  -- separation de groupes logiques
32px  -- marge entre sections
48px  -- marge large (header / contenu)
64px  -- marge de page ou separation majeure
```

### Application dans le code

```css
/* Utiliser les variables CSS plutot que des valeurs en dur */
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
}

.card {
  padding: var(--space-md);
  gap: var(--space-sm);
  border-radius: var(--space-sm);
}
```

> **Regle stricte** : aucune valeur d'espacement arbitraire (ex. `13px`, `21px`) ne doit apparaitre dans le code. Toute exception doit etre justifiee en revue.

---

## 3. Hierarchie typographique

| Role | Taille | Poids | Line-height | Utilisation |
|---|---|---|---|---|
| `display` | 36px | 800 | 1.2 | Titre de page principale, hero |
| `h1` | 28px | 700 | 1.3 | Titre de section principale |
| `h2` | 22px | 700 | 1.3 | Sous-section |
| `h3` | 18px | 600 | 1.4 | Titre de carte, de groupe |
| `body` | 15px | 400 | 1.5 | Texte courant |
| `body-sm` | 13px | 400 | 1.5 | Texte secondaire, descriptions |
| `caption` | 11px | 500 | 1.4 | Labels, metadata, timestamps |

### Regles

- Ne jamais utiliser plus de **3 niveaux de taille** sur un meme ecran.
- Le `line-height` du texte courant ne doit jamais descendre sous `1.4`.
- Privilegier le contraste de **poids** (`400` vs `700`) plutot que de taille pour differencier les informations a meme niveau.

---

## 4. Hierarchie des actions (boutons)

Les boutons suivent une hierarchie stricte pour guider l'utilisateur vers l'action principale.

| Niveau | Style | Utilisation | Exemple |
|---|---|---|---|
| **Primaire** | Rempli, couleur d'accent | Action principale de la page (1 seul par vue) | `Enregistrer`, `Creer` |
| **Secondaire** | Contour (outlined) | Actions complementaires | `Annuler`, `Exporter` |
| **Tertiaire** | Texte seul (ghost) | Actions mineures, navigation | `Retour`, `Voir plus` |
| **Danger** | Rempli rouge ou contour rouge | Actions destructrices | `Supprimer`, `Revoquer` |
| **Icone seule** | Bouton sans texte, tooltip obligatoire | Actions utilitaires (copier, fermer) | Icone poubelle, icone crayon |

```tsx
// Exemples de composants
<Button variant="primary">Enregistrer</Button>
<Button variant="secondary">Annuler</Button>
<Button variant="ghost">Voir plus</Button>
<Button variant="danger">Supprimer le compte</Button>
<IconButton icon={<TrashIcon />} tooltip="Supprimer" variant="danger" />
```

### Regles

- **Un seul bouton primaire** par zone d'action visible.
- Un bouton `danger` doit toujours etre accompagne d'une confirmation (modale ou inline).
- Taille minimale des boutons : `36px` de hauteur, `44px` de zone cliquable (mobile).
- Les boutons desactives utilisent `opacity: 0.5` et `cursor: not-allowed`.

---

## 5. Motion & Micro-animations

Les animations servent a **guider l'attention** et **confirmer les actions**, jamais a decorer.

### Principes

1. **Duree** : 150ms -- 300ms pour les transitions UI. Au-dela de 400ms, l'interface parait lente.
2. **Easing** : Toujours utiliser une courbe d'acceleration (`ease-out` pour les entrees, `ease-in` pour les sorties).
3. **Coherence** : Tous les elements similaires partagent la meme animation.
4. **Respect de l'utilisateur** : Honorer `prefers-reduced-motion`.

### Tokens d'animation

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animations de reference

#### Apparition d'un element (fade-in + slide-up)

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-enter {
  animation: fadeInUp var(--duration-normal) var(--ease-out) forwards;
}
```

#### Feedback de succes (checkmark)

```css
@keyframes scaleCheck {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon {
  animation: scaleCheck var(--duration-normal) var(--ease-out) forwards;
}
```

#### Chargement (skeleton pulse)

```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-100) 25%,
    var(--color-gray-200) 50%,
    var(--color-gray-100) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--space-xs);
}
```

---

## 6. Ombres et elevation

Le systeme d'ombre exprime la profondeur et la hierarchie visuelle.

| Niveau | Token | Valeur | Utilisation |
|---|---|---|---|
| 0 | `--shadow-none` | `none` | Elements a plat (inline) |
| 1 | `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.06)` | Cartes au repos, inputs |
| 2 | `--shadow-md` | `0 4px 8px rgba(0,0,0,0.08)` | Cartes au survol, dropdowns |
| 3 | `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Modales, popovers |
| 4 | `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.16)` | Dialogues critiques, overlays |

```css
:root {
  --shadow-none: none;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.16);
}

/* Transition d'elevation au survol */
.card {
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--duration-fast) var(--ease-out);
}
.card:hover {
  box-shadow: var(--shadow-md);
}
```

### Regles

- L'ombre augmente quand un element se rapproche visuellement de l'utilisateur (survol, focus, ouverture).
- Ne jamais combiner plus de **2 niveaux d'ombre** sur un meme ecran (hors modale).
- Les ombres doivent rester subtiles ; eviter les noirs opaques.

---

## 7. Checklist UI pre-livraison

Avant toute mise en production ou revue de PR, verifier les points suivants :

- [ ] **Grille 8px** -- Tous les espacements sont des multiples de 8 (exception : 4px).
- [ ] **Contraste** -- Tous les textes et elements interactifs respectent les ratios WCAG AA.
- [ ] **Hierarchie typo** -- Maximum 3 niveaux de taille par ecran ; poids utilises pour differencier.
- [ ] **Boutons** -- Un seul bouton primaire par zone d'action ; actions destructrices avec confirmation.
- [ ] **Animations** -- Durees entre 150ms et 350ms ; `prefers-reduced-motion` respecte.
- [ ] **Ombres** -- Utilisation coherente des tokens ; pas d'ombres arbitraires.
- [ ] **Responsive** -- Affichage verifie sur mobile (375px), tablette (768px) et desktop (1280px+).
- [ ] **Dark mode** -- Si applicable, tous les tokens de couleur fonctionnent en mode sombre.
- [ ] **Etats interactifs** -- Hover, focus, active, disabled visibles et distincts pour chaque element interactif.
- [ ] **Coherence** -- Le composant ressemble aux composants existants et reutilise les tokens du design system.
