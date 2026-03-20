import React from 'react';
import { Tooltip, Button, IconButton, Stack, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    arrow:     { control: 'boolean' },
    title:     { control: 'text' },
  },
  args: { title: 'Helpful information', placement: 'top', arrow: true },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Tooltip"
        description="Le Tooltip révèle une information contextuelle supplémentaire au survol ou au focus d'un élément. Il est conçu pour des informations non critiques — de l'aide, pas du contenu obligatoire. Tout ce qui est essentiel à la compréhension doit être visible sans interaction."
        dos={['Être concis : 2 à 10 mots maximum pour un Tooltip efficace.', 'Utiliser placement="top" par défaut — le plus naturel visuellement.', 'Toujours activer arrow pour ancrer visuellement le Tooltip à son déclencheur.', 'Sur les IconButtons : le Tooltip est obligatoire pour expliciter l\'action.']}
        donts={['Ne pas dupliquer le label visible dans un Tooltip — inutile et redondant.', 'Ne pas utiliser un Tooltip pour masquer une lacune dans l\'UX — clarifier l\'interface.', 'Ne pas mettre d\'éléments interactifs (liens, boutons) dans un Tooltip.', 'Ne pas afficher plusieurs Tooltips simultanément.']}
        a11y={['Le Tooltip MUI gère automatiquement aria-describedby sur l\'élément déclencheur.', 'Le contenu du Tooltip est lu par les lecteurs d\'écran au focus — pas seulement au hover.', 'Si le Tooltip contient l\'information essentielle d\'un IconButton, utiliser aussi aria-label.']}
        related={['IconButton', 'TextLink', 'Collapse']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Positions">
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 120px)', gap: 2, placeItems: 'center', p: 4 }}>
            <Box />
            <Tooltip title="Top" placement="top" arrow><Button variant="outlined" size="small" fullWidth>Top</Button></Tooltip>
            <Box />
            <Tooltip title="Left" placement="left" arrow><Button variant="outlined" size="small" fullWidth>Left</Button></Tooltip>
            <Box />
            <Tooltip title="Right" placement="right" arrow><Button variant="outlined" size="small" fullWidth>Right</Button></Tooltip>
            <Box />
            <Tooltip title="Bottom" placement="bottom" arrow><Button variant="outlined" size="small" fullWidth>Bottom</Button></Tooltip>
            <Box />
          </Box>
        </S>
        <S label="On icon buttons">
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip title="Delete this item permanently" arrow>
              <IconButton color="error"><DeleteIcon /></IconButton>
            </Tooltip>
            <Tooltip title="More information about this field" arrow>
              <IconButton size="small"><InfoOutlinedIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Need help? Visit our docs" arrow>
              <IconButton size="small"><HelpOutlineIcon fontSize="small" /></IconButton>
            </Tooltip>
          </Stack>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Hover me</Button>
    </Tooltip>
  ),
};
