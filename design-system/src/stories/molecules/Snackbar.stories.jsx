import React, { useState } from 'react';
import { Snackbar, Alert, Button, Stack, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  argTypes: {},
  args: {},
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [snack, setSnack] = useState({ open: false, severity: 'info', message: '' });
    const show = (severity, message) => setSnack({ open: true, severity, message });
    const close = () => setSnack((s) => ({ ...s, open: false }));
    return (
      <>
        <DocPage
          title="Snackbar"
          description="Notification éphémère et non bloquante. Apparaît 2–5 secondes puis disparaît. Flotte au-dessus de l'interface."
          dos={[
            'Position bas-centre (bottom/center).',
            'Message 1–2 lignes max.',
            'Action "Annuler" pour les opérations réversibles.',
            'autoHideDuration : 3000–5000ms.',
          ]}
          donts={[
            'Pas de multiples Snackbars simultanés.',
            'Pas pour les erreurs bloquantes → Alert.',
          ]}
          a11y={[
            'role="alert" pour erreurs, role="status" pour succès/info.',
            'Action focusable au clavier dès l\'apparition.',
          ]}
          related={['Alert', 'Dialog']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>

          <S label="Simple">
            <Button variant="contained" onClick={() => setOpen1(true)}>Save changes</Button>
            <Snackbar
              open={open1}
              autoHideDuration={3000}
              onClose={() => setOpen1(false)}
              message="Changes saved successfully"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
          </S>

          <S label="With severity">
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button color="success" variant="outlined" onClick={() => show('success', 'File exported successfully!')}>Success</Button>
              <Button color="info"    variant="outlined" onClick={() => show('info',    'A new update is available.')}>Info</Button>
              <Button color="warning" variant="outlined" onClick={() => show('warning', 'Storage is almost full.')}>Warning</Button>
              <Button color="error"   variant="outlined" onClick={() => show('error',   'Upload failed. Try again.')}>Error</Button>
            </Stack>
            <Snackbar
              open={snack.open}
              autoHideDuration={3000}
              onClose={close}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={close}
                severity={snack.severity}
                variant="filled"
                sx={{ width: '100%', alignItems: 'center' }}
              >
                {snack.message}
              </Alert>
            </Snackbar>
          </S>

        </Box>
      </>
    );
  },
};

export const Playground = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>Open Snackbar</Button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Changes saved successfully"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </>
    );
  },
};
