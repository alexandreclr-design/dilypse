import React from 'react';
import { Alert, AlertTitle, Button, Stack, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Alert',
  component: Alert,
  argTypes: {
    severity: { control: 'select', options: ['error', 'warning', 'info', 'success'] },
    variant:  { control: 'select', options: ['standard', 'outlined'] },
  },
  args: { severity: 'info', variant: 'standard', children: 'This is an informational alert.' },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Alert"
        description="Message important en réponse à une action ou à l'état du système. Visible en permanence dans le flux, contrairement au Snackbar éphémère."
        dos={[
          'Variant "standard" par défaut.',
          'AlertTitle pour les messages complexes.',
          'Closable (onClose) quand non bloquant.',
          'Être spécifique : "Mot de passe incorrect" > "Erreur".',
        ]}
        donts={[
          'Pas de feedback instantané → Snackbar.',
          'Pas d\'empilement de severities sans hiérarchie.',
        ]}
        a11y={[
          'role="alert" sur les erreurs.',
          'role="status" pour les messages non urgents.',
          'Les icônes sont décoratives — le texte porte le sens.',
        ]}
        related={['Snackbar', 'Collapse']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="Severities">
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <Alert severity="info">Your account will be reviewed within 24 hours.</Alert>
            <Alert severity="success">Your changes have been saved successfully.</Alert>
            <Alert severity="warning">Your session expires in 5 minutes.</Alert>
            <Alert severity="error">Something went wrong. Please try again.</Alert>
          </Stack>
        </S>

        <S label="With title">
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <Alert severity="success">
              <AlertTitle sx={{ fontSize: 14, fontWeight: 600 }}>Payment confirmed</AlertTitle>
              Your subscription has been activated.
            </Alert>
            <Alert severity="error">
              <AlertTitle sx={{ fontSize: 14, fontWeight: 600 }}>Upload failed</AlertTitle>
              The file exceeds the 10MB limit.
            </Alert>
          </Stack>
        </S>

        <S label="Closable">
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <Alert severity="info" onClose={() => {}}>Dismiss this notification when done.</Alert>
            <Alert severity="success" onClose={() => {}}>Report exported to downloads.</Alert>
          </Stack>
        </S>

        <S label="With action">
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <Alert severity="warning" action={<Button color="warning" size="small">Upgrade</Button>}>
              Your free trial ends in 3 days.
            </Alert>
            <Alert severity="error" action={<Button color="error" size="small">Retry</Button>}>
              Payment failed. Update your billing info.
            </Alert>
          </Stack>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <Alert {...args}>{args.children}</Alert>,
};
