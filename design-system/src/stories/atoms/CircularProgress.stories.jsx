import React from 'react';
import { CircularProgress, LinearProgress, Stack, Box, Typography, Button, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Progress',
  component: CircularProgress,
  argTypes: {
    variant: { control: 'select', options: ['indeterminate', 'determinate'] },
    value:   { control: { type: 'range', min: 0, max: 100 }, if: { arg: 'variant', eq: 'determinate' } },
  },
  args: { variant: 'indeterminate', value: 60 },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Progress"
        description="Indicateurs de progression : Circular pour les chargements inline, Linear pour les barres de progression."
        dos={[
          'Indeterminate quand la durée est inconnue.',
          'Determinate avec pourcentage pour uploads.',
        ]}
        donts={[
          'Ne pas spinner indéfiniment sans timeout.',
          'Ne pas bloquer toute l\'interface.',
        ]}
        a11y={[
          'role="progressbar" avec aria-valuenow pour determinate.',
          'aria-label pour décrire ce qui charge.',
        ]}
        related={['Skeleton', 'Button']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="Circular">
          <Stack direction="row" spacing={3} alignItems="center">
            <CircularProgress size={24} />
            <CircularProgress size={36} />
            <Button variant="contained" disabled startIcon={<CircularProgress size={16} color="inherit" />}>
              Saving…
            </Button>
          </Stack>
        </S>

        <S label="Linear">
          <Stack spacing={2.5} sx={{ width: 360 }}>
            <LinearProgress sx={{ borderRadius: 1 }} />
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Uploading…</Typography>
                <Typography variant="caption" color="text.secondary">65%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={65} sx={{ borderRadius: 1 }} />
            </Box>
          </Stack>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <CircularProgress {...args} />,
};
