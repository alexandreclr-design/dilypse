import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Button, TextField, Stack, Box, Typography, Divider, IconButton, Avatar,
} from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Dialog',
  component: Dialog,
  argTypes: {
    maxWidth:   { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    fullWidth:  { control: 'boolean' },
  },
  args: { maxWidth: 'sm', fullWidth: true },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [confirm, setConfirm] = useState(false);
    const [form, setForm] = useState(false);
    const [alert, setAlert] = useState(false);

    return (
      <>
        <DocPage
          title="Dialog"
          description="Le Dialog interrompt l'utilisateur pour une décision ou une saisie qui ne peut pas être ignorée. Il bloque l'interaction avec le reste de la page jusqu'à ce qu'il soit fermé. À utiliser avec parcimonie — chaque dialog est une interruption du flux."
          dos={[
            'Un titre clair et un CTA explicite : "Supprimer le projet" → "Supprimer".',
            'Toujours offrir une option d\'annulation visible.',
            'Fermer avec Escape et clic sur le backdrop (sauf actions critiques).',
            'Garder le contenu court — max 2-3 phrases dans le body.',
          ]}
          donts={[
            'Ne pas utiliser "OK" / "Annuler" sans contexte — le CTA doit refléter l\'action.',
            'Ne pas désactiver la fermeture par Escape sans raison impérative.',
            'Ne pas mettre un dialog pour une simple confirmation non-destructive.',
          ]}
          a11y={[
            'Le Dialog a role="dialog" et aria-modal="true" nativement via MUI.',
            'Le focus est automatiquement piégé dans le dialog (focus trap).',
            'Le titre doit être lié via aria-labelledby (DialogTitle le fait automatiquement).',
            'Le bouton qui ouvre le dialog doit recevoir le focus au retour.',
            'Escape ferme le dialog — ne pas désactiver ce comportement sauf cas critique.',
          ]}
          related={['Drawer', 'Alert', 'Snackbar', 'Button']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="Confirmation dialog">
            <Button variant="outlined" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => setConfirm(true)}>
              Delete project
            </Button>
            <Dialog open={confirm} onClose={() => setConfirm(false)} maxWidth="xs" fullWidth>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'error.light', width: 36, height: 36 }}>
                  <DeleteOutlineIcon sx={{ color: 'error.main', fontSize: 20 }} />
                </Avatar>
                Delete project
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This action cannot be undone. All data associated with this project will be permanently deleted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setConfirm(false)}>Cancel</Button>
                <Button variant="contained" color="error" onClick={() => setConfirm(false)}>Delete</Button>
              </DialogActions>
            </Dialog>
          </S>

          <S label="Form dialog">
            <Button variant="contained" onClick={() => setForm(true)}>Create workspace</Button>
            <Dialog open={form} onClose={() => setForm(false)} maxWidth="sm" fullWidth>
              <DialogTitle>
                Create a new workspace
                <IconButton aria-label="close" onClick={() => setForm(false)} sx={{ position: 'absolute', right: 12, top: 12, color: 'text.tertiary' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ mb: 3 }}>
                  Workspaces help your team organize projects and share resources.
                </DialogContentText>
                <Stack spacing={2.5}>
                  <TextField label="Workspace name" placeholder="e.g. Marketing" fullWidth autoFocus />
                  <TextField label="Description" placeholder="What is this workspace for?" fullWidth multiline rows={3} />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setForm(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => setForm(false)}>Create</Button>
              </DialogActions>
            </Dialog>
          </S>

          <S label="Alert dialog">
            <Button variant="outlined" onClick={() => setAlert(true)}>Check session</Button>
            <Dialog open={alert} onClose={() => setAlert(false)} maxWidth="xs" fullWidth>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'warning.light', width: 36, height: 36 }}>
                  <WarningAmberIcon sx={{ color: 'warning.dark', fontSize: 20 }} />
                </Avatar>
                Session expiring
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Your session will expire in 5 minutes. Would you like to extend it?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setAlert(false)}>Log out</Button>
                <Button variant="contained" onClick={() => setAlert(false)}>Extend session</Button>
              </DialogActions>
            </Dialog>
          </S>
        </Box>
      </>
    );
  },
};

export const Playground = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth={args.maxWidth} fullWidth={args.fullWidth}>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is a playground dialog. Use the controls panel to adjust maxWidth and fullWidth.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpen(false)}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
};
