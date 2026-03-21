---
name: Feedback design et méthodes de travail
description: Retours d'Alexandre sur l'approche design et les erreurs à éviter
type: feedback
---

**Self-review obligatoire avant de montrer.** Alexandre veut voir un travail réfléchi, pas un premier jet. Se poser la question "est-ce que ça fonctionne en UX ?" avant de présenter.

**Why:** Plusieurs itérations ont été nécessaires parce que le code était montré trop tôt avec des valeurs inventées, des composants trop gros, ou des patterns UX non réfléchis.

**How to apply:** Avant de montrer, vérifier : tokens utilisés (pas de hex), variants MUI (pas de fontSize inline), respiration (spacing intentionnel), hiérarchie claire, référence Storybook suivie.

---

Ne jamais inventer des tailles de police (13px, 13.5px). S'en tenir au type scale : xs=12, sm=14, md=16.

**Why:** Alexandre a repéré des fontSize: 13.5 qui n'existent pas dans le type scale. Ça crée de l'incohérence.

---

Montrer en local avant de push. Ne pas déployer du travail non validé.

**Why:** Le workflow push → Vercel → check est trop lent. Le local (localhost:5174) permet un feedback immédiat.

---

Toujours se référer au Storybook comme source de vérité. Les Select, MenuItem, Chip, Button etc. sont stylés par le theme — ne pas les re-styler en inline.

**Why:** Les dropdowns dans les filtres avaient des styles MUI par défaut au lieu d'utiliser le theme du design system parce que le projet reputation avait un theme minimal.

---

Les apps de référence UX sont : Linear, Stripe, Notion, Superhuman, Intercom. S'en inspirer pour les patterns, pas inventer.

**Why:** Alexandre compare systématiquement à ces produits pour évaluer la qualité.
