import React from 'react';
import { TextField, Stack, InputAdornment, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/TextField',
  component: TextField,
  argTypes: {
    size:     { control: 'select', options: ['small', 'medium'] },
    error:    { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: { label: 'Label', placeholder: 'Placeholder', variant: 'outlined', size: 'medium', error: false, disabled: false, required: false },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Text Field"
        description="Composant de saisie libre. Seul le variant outlined est utilisé dans Dilypse. Taille medium par défaut, small pour les formulaires denses."
        dos={[
          'Toujours un label visible — ne jamais se fier au placeholder seul.',
          'helperText pour guider le format attendu.',
          'Afficher l\'état error avec un message explicatif.',
        ]}
        donts={[
          'Ne pas utiliser le placeholder comme substitut au label.',
          'Ne pas désactiver un champ sans explication.',
        ]}
        a11y={[
          'Label associé via htmlFor/id.',
          'Messages d\'erreur lus via aria-describedby.',
          'aria-required="true" sur les champs obligatoires.',
        ]}
        related={['Select', 'Checkbox', 'Radio']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="States">
          <Stack spacing={2.5} sx={{ width: 340 }}>
            <TextField label="Default" placeholder="Placeholder" />
            <TextField label="With value" defaultValue="Hello world" />
            <TextField label="Required" required placeholder="Required field" />
            <TextField label="Error" error helperText="This field is required" />
            <TextField label="Disabled" disabled defaultValue="Disabled value" />
            <TextField label="Read only" slotProps={{ input: { readOnly: true } }} defaultValue="Read only" />
          </Stack>
        </S>

        <S label="Sizes">
          <Stack spacing={2.5} sx={{ width: 340 }}>
            <TextField label="Small" size="small" defaultValue="Small input" />
            <TextField label="Medium (default)" defaultValue="Medium input" />
          </Stack>
        </S>

        <S label="With adornments">
          <Stack spacing={2.5} sx={{ width: 340 }}>
            <TextField label="Search" placeholder="Search…" InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} />
            <TextField label="Email" type="email" placeholder="name@company.com" InputProps={{ endAdornment: <InputAdornment position="end"><EmailIcon fontSize="small" /></InputAdornment> }} />
            <TextField label="Password" type="password" defaultValue="password123" InputProps={{ endAdornment: <InputAdornment position="end"><VisibilityOffIcon fontSize="small" /></InputAdornment> }} />
          </Stack>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <TextField {...args} />,
};
