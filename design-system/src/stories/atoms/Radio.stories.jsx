import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Radio',
  component: Radio,
  argTypes: {
    size:     { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
  },
  args: { color: 'primary', size: 'medium', disabled: false },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Radio"
        description="Le RadioButton permet de sélectionner une seule option parmi un groupe de choix mutuellement exclusifs. Toutes les options sont visibles simultanément, ce qui le rend plus rapide à utiliser qu'un Select pour des listes courtes — l'utilisateur n'a pas besoin d'ouvrir un menu."
        dos={['Toujours pré-sélectionner la valeur par défaut la plus probable pour réduire la friction.', 'Présenter les options dans un ordre logique : fréquence d\'usage, ordre naturel, ou alphabétique.', 'Utiliser RadioGroup row pour 2-3 options courtes afin d\'économiser l\'espace vertical.', 'Nommer le groupe clairement avec un FormLabel.']}
        donts={['Ne pas présenter des RadioButtons sans groupe de réponse — un Radio isolé n\'a pas de sens.', 'Ne pas laisser le groupe sans valeur par défaut dans un formulaire obligatoire.', 'Ne pas mélanger RadioButtons et Checkboxes pour le même type de données.']}
        a11y={['Utiliser RadioGroup avec name commun — les lecteurs d\'écran annoncent le groupe.', 'Le FormLabel du groupe est lu comme legend par les AT — le rendre descriptif.', 'Navigation clavier dans le groupe : flèches pour changer de sélection, Tab pour quitter.', 'Chaque option doit avoir un label visible lié via FormControlLabel.']}
        related={['Checkbox', 'Select', 'SegmentedControl', 'Switch']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Vertical group">
          <FormControl>
            <FormLabel>Plan</FormLabel>
            <RadioGroup defaultValue="pro" name="plan">
              <FormControlLabel value="free" control={<Radio />} label="Free" />
              <FormControlLabel value="pro" control={<Radio />} label="Pro" />
              <FormControlLabel value="business" control={<Radio />} label="Business" />
              <FormControlLabel value="enterprise" control={<Radio disabled />} label="Enterprise (contact us)" />
            </RadioGroup>
          </FormControl>
        </S>
        <S label="Horizontal group">
          <FormControl>
            <FormLabel>Frequency</FormLabel>
            <RadioGroup row defaultValue="monthly" name="frequency">
              <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
              <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
            </RadioGroup>
          </FormControl>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <RadioGroup defaultValue="option1">
      <FormControlLabel value="option1" control={<Radio {...args} />} label="Option 1" />
      <FormControlLabel value="option2" control={<Radio {...args} />} label="Option 2" />
      <FormControlLabel value="option3" control={<Radio {...args} />} label="Option 3" />
    </RadioGroup>
  ),
};
