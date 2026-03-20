import React from 'react';
import { Skeleton, Stack, Card, CardContent, Box } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

export default {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  argTypes: {
    variant:   { control: 'select', options: ['text', 'circular', 'rectangular', 'rounded'] },
    animation: { control: 'select', options: ['pulse', 'wave'] },
  },
  args: {
    variant: 'text',
    animation: 'pulse',
  },
};

export const Documentation = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <DocPage
      title="Skeleton"
      description="Le Skeleton est un placeholder animé qui représente la forme du contenu en cours de chargement. Il réduit la perception du temps d'attente en donnant à l'utilisateur un aperçu de la structure à venir — bien plus efficace qu'un spinner seul, car il ancre les attentes visuelles."
      dos={[
        'Faire correspondre la forme du Skeleton à la forme exacte du contenu final.',
        'Utiliser le variant "rounded" pour les cartes, "circular" pour les avatars, "text" pour le texte.',
        'Composer plusieurs Skeletons pour recréer fidèlement le layout attendu.',
        'Utiliser animation="pulse" par défaut — "wave" pour des contextes plus premium.',
      ]}
      donts={[
        'Ne pas animer des Skeletons sur des éléments qui ne changeront jamais.',
        'Ne pas mélanger Skeleton et contenu réel dans la même zone sans transition.',
        'Ne pas utiliser des Skeletons génériques rectangulaires pour tout — adapter la forme.',
      ]}
      a11y={[
        'Le conteneur de Skeleton doit porter aria-busy="true" pendant le chargement.',
        'Retirer aria-busy et révéler le contenu dès que le chargement est terminé.',
        'Préférer aria-label="Chargement en cours" sur le conteneur pour les lecteurs d\'écran.',
        'Éviter aria-hidden sur les Skeletons — ils font partie de l\'expérience.',
      ]}
      related={['Alert', 'Collapse']}
    />
  ),
};

export const Playground = {
  render: (args) => <Skeleton {...args} width={200} height={40} />,
};

export const Shapes = {
  render: () => (
    <Stack spacing={2} sx={{ width: 320 }}>
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width="100%" height={120} />
      <Skeleton variant="rounded" width="100%" height={80} />
    </Stack>
  ),
};

export const CardLoading = {
  render: () => (
    <Card sx={{ width: 340 }}>
      <Skeleton variant="rectangular" height={180} />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="55%" sx={{ fontSize: '0.875rem' }} />
            <Skeleton variant="text" width="35%" sx={{ fontSize: '0.75rem' }} />
          </Box>
        </Box>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </CardContent>
    </Card>
  ),
};

export const ListLoading = {
  render: () => (
    <Stack spacing={2} sx={{ width: 340 }}>
      {[1, 2, 3].map((i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Skeleton variant="circular" width={44} height={44} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" sx={{ fontSize: '0.875rem' }} />
            <Skeleton variant="text" width="40%" sx={{ fontSize: '0.75rem' }} />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
};
