import React, { useState } from 'react';
import { Button, Stack, CircularProgress, Box, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant:  { control: 'select', options: ['contained', 'outlined', 'text'] },
    color:    { control: 'select', options: ['primary', 'secondary', 'error', 'success'] },
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
  },
  args: { children: 'Button', variant: 'contained', color: 'primary', size: 'medium', disabled: false },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [saving, setSaving] = useState(false);
    const [exporting, setExporting] = useState(false);
    const simulate = (setter) => { setter(true); setTimeout(() => setter(false), 2500); };
    return (
      <>
        <DocPage
          title="Button"
          description="Les boutons déclenchent des actions. Ils communiquent clairement ce qui va se passer lorsque l'utilisateur interagit avec eux. Chaque bouton doit représenter une action unique et concrète — jamais une destination de navigation."
          dos={['Utiliser un verbe d\'action clair et concis : "Enregistrer", "Supprimer", "Publier".', 'Hiérarchiser : 1 contained (primary) → 1 outlined (secondary) → text (tertiaire).', 'Garder les labels courts — 1 à 3 mots maximum.', 'Grouper les boutons d\'une même action dans un espace cohérent.']}
          donts={['Ne pas utiliser "Cliquez ici" ou "OK" sans contexte.', 'Ne pas désactiver un bouton sans expliquer pourquoi à l\'utilisateur.', 'Ne pas multiplier les contained buttons dans le même écran.', 'Ne pas mélanger les tailles dans un groupe de boutons adjacents.']}
          a11y={['Chaque bouton doit avoir un label visible ou un aria-label explicite pour les boutons icon-only.', 'Le focus clavier doit être visible et distinct — ne jamais supprimer outline sur focus.', 'Les boutons désactivés (disabled) restent perceptibles mais ne doivent pas recevoir le focus.', 'Utiliser role="button" uniquement si l\'élément n\'est pas nativement un <button>.']}
          related={['IconButton', 'TextLink', 'SegmentedControl']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="Variants">
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </Stack>
          </S>
          <S label="Sizes">
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained" size="small">Small</Button>
              <Button variant="contained" size="medium">Medium</Button>
              <Button variant="contained" size="large">Large</Button>
            </Stack>
          </S>
          <S label="Semantic colors">
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="contained" color="primary">Primary</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="error">Destructive</Button>
              <Button variant="contained" color="success">Success</Button>
            </Stack>
          </S>
          <S label="With icons">
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Button variant="contained" startIcon={<AddIcon />}>Create</Button>
              <Button variant="outlined" startIcon={<SendIcon />}>Send</Button>
              <Button variant="outlined" endIcon={<DownloadIcon />}>Download</Button>
              <Button variant="text" startIcon={<SendIcon />}>Send</Button>
            </Stack>
          </S>
          <S label="States">
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="contained">Default</Button>
                <Button variant="contained" disabled>Disabled</Button>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="outlined">Default</Button>
                <Button variant="outlined" disabled>Disabled</Button>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="text">Default</Button>
                <Button variant="text" disabled>Disabled</Button>
              </Stack>
            </Stack>
          </S>
          <S label="Loading state">
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained" disabled={saving} onClick={() => simulate(setSaving)} startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}>
                {saving ? 'Saving…' : 'Save changes'}
              </Button>
              <Button variant="outlined" disabled={exporting} onClick={() => simulate(setExporting)} startIcon={exporting ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon />}>
                {exporting ? 'Exporting…' : 'Export'}
              </Button>
            </Stack>
          </S>
        </Box>
      </>
    );
  },
};

export const Playground = {
  render: (args) => <Button {...args}>{args.children}</Button>,
};
