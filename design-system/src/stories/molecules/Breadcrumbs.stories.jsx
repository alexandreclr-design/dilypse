import React from 'react';
import { Breadcrumbs, Link, Typography, Box, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    separator: { control: 'text' },
    maxItems:  { control: 'number' },
  },
  args: {
    separator: '/',
    maxItems: 8,
  },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Breadcrumbs"
        description="Les Breadcrumbs (fil d'Ariane) indiquent la position de l'utilisateur dans la hiérarchie de navigation. Ils permettent de remonter facilement dans l'arborescence sans passer par le menu principal. Composant de navigation secondaire, ils ne remplacent jamais la navigation principale."
        dos={[
          'Utiliser le séparateur NavigateNext (›) pour les interfaces modernes, "/" pour le style URL.',
          'La dernière entrée (page courante) doit être du texte, pas un lien.',
          'Utiliser maxItems pour les hiérarchies très profondes avec expansion au clic.',
          'Ajouter une icône Home à la première entrée pour ancrer visuellement le fil.',
        ]}
        donts={[
          'Ne pas dupliquer le titre de la page dans le fil d\'Ariane — la dernière entrée suffit.',
          'Ne pas utiliser des labels tronqués incompréhensibles hors contexte.',
          'Ne pas placer le fil d\'Ariane après le titre H1 — il appartient au-dessus.',
          'Ne pas mettre la page courante comme lien cliquable.',
        ]}
        a11y={[
          'Envelopper les Breadcrumbs dans <nav aria-label="Fil d\'Ariane"> pour les AT.',
          'La page courante doit porter aria-current="page".',
          'Les séparateurs sont décoratifs — aria-hidden="true" automatiquement géré par MUI.',
          'Le composant MUI Breadcrumbs gère nativement la navigation au clavier.',
        ]}
        related={['TextLink', 'Tabs']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Default">
          <Breadcrumbs>
            <Link underline="hover" color="inherit" href="#">Home</Link>
            <Link underline="hover" color="inherit" href="#">Design System</Link>
            <Typography color="text.primary">Components</Typography>
          </Breadcrumbs>
        </S>
        <S label="With icon separator">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <HomeIcon sx={{ fontSize: 16 }} /> Home
            </Link>
            <Link underline="hover" color="inherit" href="#">Design System</Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </S>
        <S label="Collapsed (maxItems)">
          <Breadcrumbs maxItems={2} separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" color="inherit" href="#">Home</Link>
            <Link underline="hover" color="inherit" href="#">Settings</Link>
            <Link underline="hover" color="inherit" href="#">Team</Link>
            <Link underline="hover" color="inherit" href="#">Members</Link>
            <Typography color="text.primary">Edit</Typography>
          </Breadcrumbs>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Link underline="hover" color="inherit" href="#">Home</Link>
      <Link underline="hover" color="inherit" href="#">Components</Link>
      <Typography color="text.primary">Breadcrumbs</Typography>
    </Breadcrumbs>
  ),
};
