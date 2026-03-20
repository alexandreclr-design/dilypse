import React from 'react';
import { Divider, Box, Typography, Stack, Chip } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  args: { orientation: 'horizontal' },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Divider"
        description="Ligne de séparation pour organiser le contenu en sections. Discret par nature — on le perçoit par ses effets, pas par sa présence."
        dos={[
          'Garder le contraste faible — fonctionnel, pas visuel.',
          'Combiner avec du spacing pour une séparation aérée.',
        ]}
        donts={[
          'Ne pas utiliser comme seul moyen de structurer l\'info.',
          'Pas plus de 2-3 par écran.',
        ]}
        a11y={[
          'Rendu comme <hr> — accessible nativement.',
          'role="separator" dans une liste (ul/ol).',
        ]}
        related={['Tabs', 'List']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="Horizontal">
          <Box sx={{ width: 360 }}>
            <Typography variant="body2" color="text.secondary">Section A content</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">Section B content</Typography>
          </Box>
        </S>

        <S label="Vertical">
          <Stack direction="row" spacing={2} alignItems="center" sx={{ height: 40 }}>
            <Chip label="Dashboard" size="small" />
            <Divider orientation="vertical" flexItem />
            <Chip label="Analytics" size="small" variant="outlined" />
            <Divider orientation="vertical" flexItem />
            <Chip label="Settings" size="small" variant="outlined" />
          </Stack>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <Box sx={{ width: 300 }}>
      <Typography variant="body2">Above</Typography>
      <Divider {...args} sx={{ my: 1.5 }} />
      <Typography variant="body2">Below</Typography>
    </Box>
  ),
};
