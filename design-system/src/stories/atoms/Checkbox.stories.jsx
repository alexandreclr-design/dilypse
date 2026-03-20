import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography, Box, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    size:     { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
  },
  args: { color: 'primary', size: 'medium', disabled: false, defaultChecked: true },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Checkbox"
        description="Le Checkbox permet de sélectionner une ou plusieurs options de façon indépendante. Contrairement au Radio, chaque case est indépendante des autres — cocher l'une n'en décoche pas une autre. Il est idéal pour les listes de préférences, les options de filtrage ou les permissions."
        dos={['Associer un label descriptif à chaque case — ne jamais laisser un Checkbox seul sans contexte.', 'Utiliser l\'état indeterminate pour un "sélectionner tout" partiel.', 'Grouper les cases liées avec un FormGroup et un titre de section.', 'Aligner verticalement par défaut pour faciliter la lecture rapide.']}
        donts={['Ne pas utiliser des cases à cocher pour déclencher des actions immédiates.', 'Ne pas présenter plus de 2 colonnes de Checkboxes — cela nuit à la lisibilité.', 'Ne pas pré-cocher des options sensibles (abonnement newsletter, partage de données).']}
        a11y={['Chaque Checkbox doit avoir un label accessible via <label> ou aria-label.', 'L\'état indeterminate doit être communiqué via aria-checked="mixed".', 'Navigation clavier : Tab pour focus, Espace pour cocher/décocher.', 'Les groupes de cases doivent être encapsulés dans un <fieldset> avec <legend>.']}
        related={['Radio', 'Switch', 'Select']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="States">
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
            <FormControlLabel control={<Checkbox />} label="Unchecked" />
            <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
            <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
            <FormControlLabel control={<Checkbox disabled checked />} label="Disabled checked" />
          </FormGroup>
        </S>
        <S label="Group">
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary" gutterBottom>Notification preferences</Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Email notifications" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Push notifications" />
              <FormControlLabel control={<Checkbox />} label="SMS notifications" />
              <FormControlLabel control={<Checkbox disabled />} label="Marketing emails (unavailable)" />
            </FormGroup>
          </Stack>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <FormControlLabel control={<Checkbox {...args} />} label="Checkbox label" />,
};
