import React from 'react';
import { Pagination, Stack, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Pagination',
  component: Pagination,
  argTypes: {
    count: { control: 'number' },
    color: { control: 'select', options: ['standard', 'primary', 'secondary'] },
    variant: { control: 'select', options: ['text', 'outlined'] },
    shape: { control: 'select', options: ['circular', 'rounded'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    showFirstButton: { control: 'boolean' },
    showLastButton: { control: 'boolean' },
  },
  args: {
    count: 10,
    color: 'primary',
    variant: 'text',
    shape: 'circular',
    size: 'medium',
    disabled: false,
    showFirstButton: false,
    showLastButton: false,
  },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Pagination"
        description="La Pagination divise un long ensemble de données en pages navigables. Elle indique la page courante et permet d'accéder aux pages précédentes, suivantes ou à une page spécifique. Elle est préférable au scroll infini pour les contenus où la position est importante (résultats de recherche, tableaux de données)."
        dos={[
          'Afficher le nombre total de pages et d\'items pour contextualiser.',
          'Mémoriser la page courante dans l\'URL (query param ?page=N) pour la navigation.',
          'Synchroniser la pagination avec les filtres actifs — reset à la page 1 lors d\'un filtre.',
          'Utiliser variant="outlined" avec shape="rounded" pour un style Dilypse cohérent.',
        ]}
        donts={[
          'Ne pas afficher plus de 7-8 numéros de pages simultanément — utiliser les ellipses.',
          'Ne pas placer la pagination loin du tableau qu\'elle contrôle.',
          'Ne pas désactiver la navigation précédent/suivant — utiliser disabled sur les boutons.',
        ]}
        a11y={[
          'Le composant Pagination expose role="navigation" avec aria-label="pagination".',
          'La page courante a aria-current="true".',
          'Navigation clavier : Tab pour déplacer le focus, Entrée pour sélectionner une page.',
          'Les boutons précédent/suivant ont des aria-label descriptifs gérés automatiquement.',
        ]}
        related={['Table', 'List']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Variants">
          <Stack spacing={2}>
            <Pagination count={10} variant="text" color="primary" />
            <Pagination count={10} variant="outlined" color="primary" />
            <Pagination count={10} variant="outlined" shape="rounded" color="primary" />
          </Stack>
        </S>
        <S label="With first / last buttons">
          <Pagination count={10} color="primary" showFirstButton showLastButton />
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <Pagination {...args} />,
};
