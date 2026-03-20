import React, { useState } from 'react';
import { Collapse, Button, Box, Typography, Paper, Stack, IconButton, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Collapse',
  component: Collapse,
  argTypes: {
    in:      { control: 'boolean' },
    timeout: { control: 'select', options: ['auto', 200, 400, 600] },
  },
  args: {
    in: true,
    timeout: 'auto',
  },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    return (
      <>
        <DocPage
          title="Collapse"
          description="Le Collapse révèle ou masque du contenu avec une animation de transition verticale. Il est le mécanisme de base de la divulgation progressive — montrer plus sans quitter la page. Contrairement à l'Accordion qui gère lui-même l'état d'ouverture, le Collapse est un primitif bas niveau qui donne un contrôle total."
          dos={[
            'Indiquer clairement l\'état ouvert/fermé avec une icône (ExpandMore/ExpandLess).',
            'Le déclencheur (header cliquable) doit être la zone de titre, pas un bouton isolé.',
            'Animer avec timeout="auto" pour un timing naturel basé sur la hauteur du contenu.',
            'Conserver l\'état d\'ouverture lors d\'une navigation (si le contenu est important).',
          ]}
          donts={[
            'Ne pas omettre l\'animation — elle aide à comprendre que le contenu est lié.',
            'Ne pas utiliser Collapse pour masquer des erreurs ou des validations.',
            'Ne pas créer des Collapses imbriqués à plus de 2 niveaux.',
          ]}
          a11y={[
            'Le bouton déclencheur doit avoir aria-expanded="true/false" selon l\'état.',
            'aria-controls doit pointer vers l\'id du contenu expandable.',
            'Le contenu masqué doit être inert — MUI gère le display:none automatiquement.',
            'L\'animation doit respecter prefers-reduced-motion — timeout={0} si détecté.',
          ]}
          related={['Tabs', 'Alert', 'Tooltip']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="Expandable section">
            <Paper variant="outlined" sx={{ width: 400 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, cursor: 'pointer' }}
                onClick={() => setOpen1((v) => !v)}
              >
                <Typography variant="subtitle2">Advanced settings</Typography>
                <IconButton size="small" edge="end">
                  {open1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={open1}>
                <Divider />
                <Box sx={{ px: 2, py: 2 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="body2" color="text.secondary">Custom domain</Typography>
                    <Typography variant="body2" color="text.secondary">Two-factor authentication</Typography>
                    <Typography variant="body2" color="text.secondary">API access tokens</Typography>
                  </Stack>
                </Box>
              </Collapse>
            </Paper>
          </S>
          <S label="Inline details">
            <Stack spacing={2} sx={{ width: 400 }}>
              <Button
                variant="outlined"
                startIcon={<InfoOutlinedIcon />}
                onClick={() => setOpen2((v) => !v)}
                size="small"
              >
                {open2 ? 'Hide details' : 'Show details'}
              </Button>
              <Collapse in={open2}>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, bgcolor: 'primary.light', borderColor: 'primary.main', borderRadius: 2 }}
                >
                  <Typography variant="body2" sx={{ color: 'primary.dark' }}>
                    This action will permanently delete all selected items. This cannot be undone. Make sure you have a backup before proceeding.
                  </Typography>
                </Paper>
              </Collapse>
            </Stack>
          </S>
        </Box>
      </>
    );
  },
};

export const Playground = {
  render: (args) => {
    const [open, setOpen] = useState(args.in ?? true);
    return (
      <Box sx={{ width: 360 }}>
        <Button
          variant="outlined"
          onClick={() => setOpen((v) => !v)}
          endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{ mb: 1 }}
        >
          {open ? 'Collapse' : 'Expand'}
        </Button>
        <Collapse in={open} timeout={args.timeout}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              This content is revealed or hidden with an animated transition.
            </Typography>
          </Paper>
        </Collapse>
      </Box>
    );
  },
};
