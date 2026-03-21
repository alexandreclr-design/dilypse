// ─── Establishments (50) ───

const cities = [
  'Montréal', 'Brossard', 'Laval', 'Longueuil', 'Québec', 'Gatineau', 'Sherbrooke',
  'Trois-Rivières', 'Chicoutimi', 'Drummondville', 'Saint-Jérôme', 'Granby',
  'Saint-Hyacinthe', 'Rimouski', 'Victoriaville', 'Shawinigan', 'Repentigny',
  'Terrebonne', 'Blainville', 'Mirabel', 'Mascouche', 'Boisbriand', 'Joliette',
  'Saint-Jean-sur-Richelieu', 'Chambly', 'Varennes', 'Beloeil', 'Candiac',
  'Boucherville', 'Saint-Bruno', 'La Prairie', 'Sainte-Julie', 'Vaudreuil-Dorion',
  'L\'Assomption', 'Sorel-Tracy', 'Salaberry-de-Valleyfield', 'Magog', 'Thetford Mines',
  'Rivière-du-Loup', 'Matane', 'Alma', 'Rouyn-Noranda', 'Val-d\'Or', 'Amos',
  'Sept-Îles', 'Baie-Comeau', 'Cowansville', 'Plessisville', 'Montmagny', 'Paris',
];

const streets = [
  '2000 Rue De L\'Éclipse #800', '1455 Rue Peel', '3333 Chemin de Chambly', '500 Place d\'Armes',
  '780 Boulevard Lebourgneuf', '100 Rue Principale', '200 Rue King Ouest', '1500 Rue des Forges',
  '345 Rue Racine Est', '400 Boulevard Saint-Joseph', '225 Rue de Martigny', '50 Rue Évangéline',
  '1325 Rue des Cascades', '33 Rue de l\'Évêché', '85 Rue Notre-Dame', '100 Avenue de Grand-Mère',
  '450 Boulevard Brien', '1200 Boulevard des Seigneurs', '500 Rue de la Gare', '13450 Rue de l\'Avenir',
  '321 Montée Masson', '190 Chemin de la Grande-Côte', '500 Rue Saint-Charles', '340 Rue Champlain',
  '1200 Rue Bourgogne', '2050 Route Marie-Victorin', '855 Rue Laurier', '50 Rue de Strasbourg',
  '1001 Boulevard de Montarville', '1355 Rue Roberval', '100 Rue Édouard-VII', '1525 Chemin du Fer-à-Cheval',
  '1200 Boulevard de la Cité', '500 Rue Dorval', '260 Rue du Roi', '85 Rue Salaberry', '900 Rue Principale',
  '233 Rue Notre-Dame', '85 Boulevard de l\'Hôtel-de-Ville', '750 Avenue du Phare', '200 Rue des Pins',
  '151 Avenue du Lac', '1200 Avenue Principale', '100 Rue Harricana', '800 Boulevard Laure',
  '625 Boulevard La Salle', '100 Rue du Sud', '1700 Avenue Saint-Jean', '200 Rue Saint-Louis', '100 Rue de Longchamp',
];

export const establishmentData = cities.map((city, i) => ({
  name: `Dilypse ${city}`,
  address: `${streets[i]}, ${city}`,
}));

export const establishments = establishmentData.map(e => e.name);

// ─── Reviews (200+) ───

const firstNames = [
  'Maxime', 'Sophie', 'Jean-François', 'Marie-Ève', 'Alexandre', 'Camille', 'Pierre',
  'Isabelle', 'Marc-Antoine', 'Nathalie', 'Thomas', 'Émilie', 'François', 'Julie',
  'Mathieu', 'Catherine', 'Sébastien', 'Véronique', 'David', 'Mélanie', 'Patrick',
  'Stéphanie', 'Nicolas', 'Caroline', 'Benoît', 'Geneviève', 'Louis', 'Audrey',
  'Olivier', 'Karine', 'Laurent', 'Myriam', 'Leo', 'Chantal', 'Samuel', 'Diane',
];

const lastNames = [
  'Beaudoin', 'Lavoie', 'Tremblay', 'Gagnon', 'Girard', 'Bergeron', 'Dubois',
  'Lévesque', 'Pelletier', 'Martin', 'Bouchard', 'Côté', 'De Smedt', 'Samuel',
  'Roy', 'Gauthier', 'Morin', 'Lafleur', 'Fortin', 'Gagné', 'Ouellet', 'Paradis',
  'Bélanger', 'Caron', 'Nadeau', 'Charron', 'Simard', 'Poirier', 'Dufour', 'Savard',
];

const positiveTexts = [
  'Excellent service ! L\'équipe est très professionnelle et réactive. Je recommande fortement.',
  'Super expérience du début à la fin. Le produit répond parfaitement à nos besoins.',
  'L\'outil est incroyable pour gérer notre réputation en ligne. Gain de temps énorme.',
  'Merci à toute l\'équipe pour leur accompagnement. Le onboarding était impeccable.',
  'Notre agence utilise Dilypse depuis un an et on ne pourrait plus s\'en passer.',
  'La fonctionnalité de réponse IA est bluffante. Nos clients sont ravis.',
  'Interface moderne et intuitive. Rien à redire.',
  'Le support client est top, réponse en moins d\'une heure à chaque fois.',
  'On a vu une nette amélioration de notre note Google depuis qu\'on utilise Dilypse.',
  'Produit solide, équipe à l\'écoute. Exactement ce qu\'on cherchait.',
  '',
  '',
];

const neutralTexts = [
  'Bon outil dans l\'ensemble. Quelques fonctionnalités manquent encore mais ça évolue.',
  'Correcte mais pas exceptionnel. Le dashboard pourrait être plus rapide.',
  'Le produit est bien, le prix un peu élevé pour les petites entreprises.',
  'L\'outil est utile mais l\'interface pourrait être améliorée sur certains points.',
  'Service correct, rien de spécial. Fait le job.',
];

const negativeTexts = [
  'Déçu par le support client. Temps de réponse trop long.',
  'L\'intégration avec Google My Business pose parfois des problèmes.',
  'Prix trop élevé pour ce que c\'est. Il existe des alternatives moins chères.',
  'Bug récurrents sur le dashboard. Ça crash au moins une fois par semaine.',
  'Le produit a du potentiel mais c\'est encore trop instable pour un usage pro.',
];

const replyTexts = [
  'Merci beaucoup pour votre retour ! Votre satisfaction est notre priorité.',
  'Merci pour ces mots encourageants ! On transmet à l\'équipe.',
  'Nous sommes ravis que notre outil vous fasse gagner du temps !',
  'Merci pour votre confiance. N\'hésitez pas à nous contacter pour toute question.',
  'Merci ! Le meilleur est à venir, on travaille sur de nouvelles fonctionnalités.',
  'Nous prenons note de votre retour et travaillons activement à améliorer ce point.',
  'Merci pour votre avis constructif. Notre équipe support va vous contacter.',
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

function genDate(daysAgo) {
  const d = new Date(2026, 1, 20); // 20 feb 2026
  d.setDate(d.getDate() - daysAgo);
  return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const reviews = [];

for (let i = 0; i < 220; i++) {
  const r = rand();
  const rating = r < 0.08 ? 1 : r < 0.18 ? 2 : r < 0.28 ? 3 : r < 0.42 ? 4 : 5;
  const textPool = rating >= 4 ? positiveTexts : rating === 3 ? neutralTexts : negativeTexts;
  const reviewText = pick(textPool);
  const daysAgo = Math.floor(rand() * 180);
  const replied = rating >= 4 ? rand() > 0.2 : rand() > 0.6;

  reviews.push({
    id: i + 1,
    reviewerName: `${pick(firstNames)} ${pick(lastNames)}`,
    rating,
    date: genDate(daysAgo),
    text: reviewText,
    ...(() => { const est = pick(establishmentData); return { businessName: est.name, businessAddress: est.address }; })(),
    replied,
    replyText: replied ? pick(replyTexts) : null,
    replyDate: replied ? genDate(Math.max(0, daysAgo - Math.floor(rand() * 3))) : null,
  });
}

// Sort by date desc (most recent first)
reviews.sort((a, b) => b.id - a.id);
