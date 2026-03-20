import React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Stack, Box, Divider,
} from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

const items = [
  { summary: 'What is Dilypse?', details: 'Dilypse is a design system built on top of MUI Material UI, providing a consistent and accessible set of components for building modern interfaces.' },
  { summary: 'How do I install it?', details: 'Install via npm: npm install @dilypse/components. Then import and use components directly in your React application.' },
  { summary: 'Is it open source?', details: 'Yes! Dilypse is fully open source and MIT licensed. Contributions are welcome on GitHub.' },
];

export default {
  title: 'Molecules/Accordion',
  component: Accordion,
  argTypes: {
    variant: { control: 'select', options: ['elevation', 'outlined'] },
    disableGutters: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'elevation',
    disableGutters: false,
    disabled: false,
  },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Accordion"
        description="L'Accordion révèle ou masque du contenu structuré dans des panneaux empilés. Chaque panneau a un en-tête cliquable et un contenu qui s'ouvre/ferme. C'est un pattern de divulgation progressive adapté aux FAQ, paramètres catégorisés et contenus longs dont l'utilisateur n'a besoin que partiellement."
        dos={[
          'Toujours montrer l\'état ouvert/fermé avec l\'icône ExpandMore.',
          'Garder les titres de panneau courts et descriptifs (3-5 mots).',
          'Utiliser variant="outlined" pour les interfaces Dilypse — cohérent avec les tokens de border.',
          'Permettre l\'ouverture de plusieurs panneaux simultanément si le contenu est indépendant.',
        ]}
        donts={[
          'Ne pas imbriquer des Accordions — la navigation devient confuse.',
          'Ne pas masquer de contenu critique ou d\'actions primaires dans un panneau fermé.',
          'Ne pas utiliser Accordion pour des listes d\'items simples — utiliser List.',
        ]}
        a11y={[
          'Le header de chaque panneau est un <button> avec aria-expanded="true/false".',
          'aria-controls pointe vers l\'id du panneau de contenu correspondant.',
          'Navigation clavier : Tab pour se déplacer entre les panneaux, Entrée/Espace pour ouvrir.',
          'MUI gère automatiquement les attributs ARIA — ne pas les surcharger.',
        ]}
        related={['Collapse', 'List', 'Tabs']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Elevation (default)">
          <Stack sx={{ width: 480 }}>
            {items.map((item, i) => (
              <Accordion key={i}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={500}>{item.summary}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{item.details}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </S>
        <S label="Outlined">
          <Stack sx={{ width: 480 }}>
            {items.map((item, i) => (
              <Accordion key={i} variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={500}>{item.summary}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{item.details}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <Stack sx={{ width: 480 }}>
      {items.map((item, i) => (
        <Accordion key={i} {...args}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>{item.summary}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{item.details}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  ),
};
