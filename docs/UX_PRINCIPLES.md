# UX Principles -- Dilypse

> Referentiel d'experience utilisateur. Chaque parcours et interaction doit s'appuyer sur ces principes.

---

## 1. Heuristiques fondamentales (Nielsen 10)

Ces dix heuristiques servent de grille d'evaluation pour toute interface.

| # | Heuristique | Description | Application Dilypse |
|---|---|---|---|
| 1 | **Visibilite de l'etat du systeme** | L'utilisateur sait toujours ou il en est. | Indicateurs de chargement, etats de sauvegarde (`Enregistre`, `En cours...`), breadcrumbs. |
| 2 | **Correspondance systeme / monde reel** | Le vocabulaire et les concepts sont familiers. | Utiliser le jargon metier du client, pas le jargon technique interne. |
| 3 | **Controle et liberte de l'utilisateur** | L'utilisateur peut revenir en arriere facilement. | Bouton `Annuler` toujours visible, `Ctrl+Z` quand possible, confirmation avant actions destructrices. |
| 4 | **Coherence et standards** | Les memes actions produisent les memes resultats. | Memes patterns de navigation, memes positions de boutons sur toutes les pages. |
| 5 | **Prevention des erreurs** | Empecher les erreurs avant qu'elles ne surviennent. | Validation en temps reel, desactivation des boutons quand le formulaire est invalide, confirmations. |
| 6 | **Reconnaissance plutot que rappel** | Minimiser la charge memorielle. | Suggestions, historique recent, valeurs par defaut intelligentes, labels toujours visibles. |
| 7 | **Flexibilite et efficacite** | S'adapter aux utilisateurs novices et experts. | Raccourcis clavier, actions en lot (bulk), recherche globale (`Cmd+K`). |
| 8 | **Design esthetique et minimaliste** | Chaque element affiche doit etre utile. | Pas d'information decorative ; chaque texte, icone ou element sert un objectif. |
| 9 | **Aide a la reconnaissance et correction des erreurs** | Les messages d'erreur sont clairs et actionnables. | `"Le nom doit contenir au moins 3 caracteres"` au lieu de `"Erreur de validation"`. |
| 10 | **Aide et documentation** | L'aide est accessible sans etre intrusive. | Tooltips contextuels, centre d'aide integre, onboarding progressif. |

---

## 2. Lois UX

### Loi de Fitts

> Le temps pour atteindre une cible est fonction de sa distance et de sa taille.

**Applications :**
- Les actions principales (CTA) sont **grandes et proches** de la zone d'attention.
- Les boutons de validation sont positionnes en bas a droite des formulaires (zone naturelle de fin de lecture).
- Les zones de clic des elements de navigation font au minimum **44x44px** sur mobile.
- Les actions destructrices sont **eloignees** des actions principales pour eviter les clics accidentels.

### Loi de Hick

> Le temps de decision augmente avec le nombre et la complexite des options.

**Applications :**
- Maximum **5 a 7 elements** dans une navigation principale.
- Les formulaires longs sont decoupes en **etapes** (wizard / stepper).
- Les selects avec plus de 10 options incluent un champ de **recherche**.
- Proposer des **valeurs par defaut** pour reduire les decisions a prendre.

### Loi de Jakob

> Les utilisateurs passent la majorite de leur temps sur *d'autres* sites. Ils s'attendent a ce que le votre fonctionne de la meme maniere.

**Applications :**
- Le logo en haut a gauche ramene a l'accueil.
- Les tableaux sont triables en cliquant sur les en-tetes.
- Le bouton de deconnexion se trouve dans un menu utilisateur en haut a droite.
- Les formulaires se soumettent avec `Entree` ; `Echap` ferme les modales.
- Les liens sont visuellement distincts du texte courant.

### Loi de Miller

> La memoire de travail retient environ **7 (+/- 2) elements** simultanement.

**Applications :**
- Grouper les informations en **blocs logiques** (chunking) : numeros de telephone (`06 12 34 56 78`), listes a puces.
- Les tableaux de bord affichent **3 a 5 metriques cles**, pas 15.
- Les menus deroulants regroupent les options par categories.

### Loi de Postel

> Etre **liberal dans ce qu'on accepte**, strict dans ce qu'on envoie.

**Applications :**
- Accepter les numeros de telephone avec ou sans espaces, tirets, indicatifs.
- Accepter les recherches avec fautes de frappe (fuzzy matching).
- Les champs de date acceptent plusieurs formats (`21/03/2026`, `2026-03-21`, `21 mars 2026`).
- Normaliser les donnees cote serveur, pas cote utilisateur.

### Effet de position serielle

> Les utilisateurs retiennent mieux les **premiers** et les **derniers** elements d'une liste.

**Applications :**
- Placer les actions les plus importantes en **debut** et **fin** de barre d'outils.
- Dans un menu de navigation, l'element le plus utilise est en premiere position, les parametres et le profil en derniere.
- Dans un onboarding, la premiere et la derniere etape doivent etre les plus marquantes.

---

## 3. Patterns UX de reference pour un SaaS

### 3.1 Navigation

| Pattern | Quand l'utiliser | Implementation |
|---|---|---|
| **Sidebar fixe** | Application avec >= 5 sections principales | Sidebar de 240px, collapsible a 64px (icones seules). |
| **Breadcrumbs** | Hierarchie de plus de 2 niveaux | Toujours visible sous le header ; le dernier element n'est pas cliquable. |
| **Recherche globale** | Toute application SaaS | `Cmd+K` / `Ctrl+K` ouvre une command palette. Recherche sur les entites principales. |
| **Tabs** | Contenu parallele au meme niveau | Maximum 6 onglets visibles ; au-dela, utiliser un menu `Plus`. |
| **Fil d'Ariane contextuel** | Workflows multi-etapes | Stepper horizontal avec etats : complete, en cours, a venir. |

### 3.2 Formulaires

| Regle | Detail |
|---|---|
| **Labels au-dessus des champs** | Toujours visibles, jamais uniquement en placeholder. |
| **Validation en temps reel** | Valider au `blur` pour les champs individuels, au `submit` pour la coherence globale. |
| **Messages d'erreur inline** | Affiches sous le champ concerne, en rouge, avec une icone et un texte explicatif. |
| **Indicateurs obligatoires** | Marquer les champs obligatoires avec `*`. Si la majorite est obligatoire, marquer les optionnels avec `(optionnel)`. |
| **Progression** | Pour les formulaires > 5 champs, afficher un indicateur de progression ou decouper en etapes. |
| **Sauvegarde automatique** | Pour les formulaires longs, sauvegarder le brouillon automatiquement et l'indiquer visuellement. |

```tsx
// Pattern de validation inline
<FormField
  label="Adresse e-mail"
  required
  error={errors.email}
  hint="Nous ne partagerons jamais votre adresse."
>
  <Input
    type="email"
    value={email}
    onChange={setEmail}
    onBlur={validateEmail}
    aria-invalid={!!errors.email}
    aria-describedby="email-error"
  />
</FormField>
```

### 3.3 Feedback

| Type | Duree | Position | Exemple |
|---|---|---|---|
| **Toast de succes** | 3 secondes, auto-dismiss | En haut a droite | `"Contact enregistre avec succes"` |
| **Toast d'erreur** | Persistant (dismiss manuel) | En haut a droite | `"Echec de l'envoi. Verifiez votre connexion."` |
| **Toast d'information** | 5 secondes, auto-dismiss | En haut a droite | `"Nouvelle version disponible"` |
| **Inline feedback** | Persistant | Sous le champ / dans le contexte | Message de validation, etat de sauvegarde |
| **Modale de confirmation** | Jusqu'a l'action utilisateur | Centre de l'ecran | `"Etes-vous sur de vouloir supprimer ?"` |
| **Banner** | Persistant ou dismissible | Haut de page | Maintenance prevue, limite de forfait atteinte |

#### Regles pour les toasts

- Empilables : maximum **3 toasts** visibles simultanement.
- Les toasts de succes ne doivent **pas** bloquer le flux utilisateur.
- Les toasts d'erreur doivent proposer une **action corrective** quand c'est possible (`Reessayer`).

### 3.4 Tableaux de donnees

| Fonctionnalite | Quand l'implementer |
|---|---|
| **Tri** | Toujours, sur les colonnes pertinentes. Indiquer visuellement la colonne et la direction. |
| **Recherche / filtre** | Des que le tableau depasse 10 lignes. |
| **Pagination** | Tableaux > 25 lignes. Proposer 10, 25, 50 elements par page. |
| **Selection et actions en lot** | Quand les utilisateurs doivent agir sur plusieurs elements (supprimer, exporter, taguer). |
| **Colonnes redimensionnables** | Tableaux avec > 5 colonnes ou contenu de longueur variable. |
| **Ligne vide (empty state)** | Toujours. Afficher un message et une action : `"Aucun contact. Ajoutez votre premier contact."` |
| **Chargement** | Skeleton rows pendant le chargement initial ; spinner inline pour les rafraichissements. |

```tsx
// Pattern d'empty state
<EmptyState
  icon={<ContactsIcon />}
  title="Aucun contact"
  description="Ajoutez votre premier contact pour commencer."
  action={<Button variant="primary">Ajouter un contact</Button>}
/>
```

### 3.5 Micro-copy

| Contexte | Mauvais exemple | Bon exemple |
|---|---|---|
| Bouton de soumission | `Soumettre` | `Creer le contact` |
| Erreur generique | `Une erreur est survenue` | `Impossible d'enregistrer. Verifiez les champs en rouge.` |
| Confirmation de suppression | `Confirmer` | `Oui, supprimer definitivement` |
| Champ vide | *(pas de placeholder)* | `ex. : jean.dupont@email.com` |
| Etat de chargement | `Chargement...` | `Recuperation de vos contacts...` |
| Succes | `OK` | `Contact enregistre avec succes` |

#### Principes de micro-copy

1. **Etre specifique** : nommer l'objet concerne (`"Contact supprime"`, pas `"Element supprime"`).
2. **Etre actionnable** : dire a l'utilisateur quoi faire ensuite quand c'est pertinent.
3. **Etre humain** : ecrire comme on parle, en restant professionnel.
4. **Etre concis** : une phrase maximum pour les toasts, deux pour les modales.

---

## 4. Checklist UX pre-livraison

Avant toute mise en production ou revue de PR, verifier les points suivants :

- [ ] **Visibilite de l'etat** -- L'utilisateur sait toujours ou il en est (chargement, sauvegarde, erreur, succes).
- [ ] **Navigation** -- L'utilisateur peut revenir a l'etape precedente sans perdre ses donnees.
- [ ] **Formulaires** -- Labels visibles, validation inline au blur, messages d'erreur explicites et actionnables.
- [ ] **Feedback** -- Chaque action utilisateur recoit un retour visuel dans les 100ms.
- [ ] **Empty states** -- Chaque liste, tableau ou zone de contenu a un etat vide avec message et action.
- [ ] **Erreurs** -- Les messages d'erreur sont comprehensibles par un non-technicien et proposent une solution.
- [ ] **Micro-copy** -- Les boutons decrivent l'action (`"Enregistrer le contact"`), pas un verbe generique (`"Soumettre"`).
- [ ] **Accessibilite clavier** -- Toutes les actions sont realisables au clavier (Tab, Entree, Echap).
- [ ] **Coherence** -- Le parcours suit les memes patterns que les parcours existants de l'application.
- [ ] **Performance percue** -- Les ecrans longs a charger affichent un skeleton ou un indicateur de progression.
