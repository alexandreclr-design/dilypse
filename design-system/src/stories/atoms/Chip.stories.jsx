import React from 'react';
import { Chip, Stack, Avatar, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Chip',
  component: Chip,
  argTypes: {
    variant:  { control: 'select', options: ['filled', 'outlined'] },
    color:    { control: 'select', options: ['default', 'primary', 'error', 'success'] },
    size:     { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Chip', variant: 'filled', color: 'primary', size: 'medium', disabled: false },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Chip"
        description="Élément compact pour tags, filtres, statuts et labels de personnes. 1 à 3 mots max."
        dos={[
          'Couleur sémantique pour les statuts : success, error, warning.',
          'Outlined pour filtres inactifs, filled pour filtres actifs.',
          'Avatar pour les tags de personnes.',
        ]}
        donts={[
          'Pas plus de 5-6 chips visibles simultanément.',
          'Ne pas mélanger deletable et statique sans distinction.',
        ]}
        a11y={[
          'Deletable : aria-label="Supprimer [label]" sur le bouton.',
          'Sélectionnables : aria-pressed="true/false".',
          'Statut par texte, pas uniquement par couleur.',
        ]}
        related={['Avatar', 'Button']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="Variants">
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5}>
              {['default', 'primary', 'error', 'success'].map((color) => (
                <Chip key={color} label={color} variant="filled" color={color} />
              ))}
            </Stack>
            <Stack direction="row" spacing={1.5}>
              {['default', 'primary', 'error', 'success'].map((color) => (
                <Chip key={color} label={color} variant="outlined" color={color} />
              ))}
            </Stack>
          </Stack>
        </S>

        <S label="Sizes">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Chip label="Small" size="small" color="primary" />
            <Chip label="Medium" size="medium" color="primary" />
            <Chip label="Small outlined" size="small" variant="outlined" />
            <Chip label="Medium outlined" size="medium" variant="outlined" />
          </Stack>
        </S>

        <S label="Status dots">
          <Stack direction="row" spacing={1.5}>
            {[
              { label: 'Active', color: 'success' },
              { label: 'Pending', color: 'warning' },
              { label: 'Inactive', color: 'default' },
              { label: 'Error', color: 'error' },
            ].map(({ label, color }) => (
              <Chip
                key={label} size="small" label={label} color={color} variant="outlined"
                icon={<Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color === 'default' ? 'text.disabled' : `${color}.main`, flexShrink: 0 }} />}
                sx={{ '& .MuiChip-icon': { ml: 1, mr: -0.5 } }}
              />
            ))}
          </Stack>
        </S>

        <S label="With avatar">
          <Stack direction="row" spacing={1.5}>
            <Chip avatar={<Avatar>JD</Avatar>} label="John Doe" />
            <Chip avatar={<Avatar alt="User" src="https://i.pravatar.cc/40?img=5" />} label="Alice L." />
          </Stack>
        </S>

        <S label="Deletable">
          <Stack direction="row" spacing={1.5}>
            <Chip label="React" onDelete={() => {}} />
            <Chip label="TypeScript" onDelete={() => {}} variant="outlined" color="primary" />
            <Chip label="Design" onDelete={() => {}} color="success" />
          </Stack>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <Chip {...args} />,
};
