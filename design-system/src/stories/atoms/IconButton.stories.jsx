import React from 'react';
import { IconButton, Stack, Tooltip, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    color:    { control: 'select', options: ['default', 'primary', 'error'] },
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
  },
  args: { color: 'default', size: 'medium', disabled: false },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Icon Button"
        description="L'IconButton est une variante compacte du Button qui n'affiche qu'une icône. Il s'utilise dans des contextes à forte densité d'information où le label textuel prendrait trop de place — à condition que l'action soit universellement comprise ou accompagnée d'un Tooltip."
        dos={['Toujours associer un Tooltip pour expliciter l\'action au hover et au focus.', 'Utiliser la couleur sémantique pour signaler la dangerosité : color="error" pour supprimer.', 'Maintenir un hit-target suffisant : minimum 40×40px pour la taille medium.', 'Regrouper les actions liées dans un Stack cohérent.']}
        donts={['Ne pas utiliser des icônes custom non standardisées sans test auprès des utilisateurs.', 'Ne pas utiliser 5+ IconButtons côte à côte sans séparation visuelle.', 'Ne pas omettre le Tooltip sur des actions destructives.']}
        a11y={['Obligatoire : aria-label descriptif sur chaque IconButton ("Supprimer le document", pas "Supprimer").', 'Le Tooltip ne remplace pas aria-label — les deux sont nécessaires.', 'Focus visible sur keyboard navigation — ne jamais retirer l\'outline.', 'Bouton désactivé : utiliser disabled et ne pas le retirer du DOM.']}
        related={['Button', 'Tooltip', 'TextLink']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Common actions">
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Edit"><IconButton color="primary"><EditIcon /></IconButton></Tooltip>
            <Tooltip title="Delete"><IconButton color="error"><DeleteIcon /></IconButton></Tooltip>
            <Tooltip title="Share"><IconButton><ShareIcon /></IconButton></Tooltip>
            <Tooltip title="More options"><IconButton><MoreVertIcon /></IconButton></Tooltip>
            <Tooltip title="Close"><IconButton><CloseIcon /></IconButton></Tooltip>
          </Stack>
        </S>
        <S label="Sizes">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small" aria-label="Edit (small)"><EditIcon fontSize="small" /></IconButton>
            <IconButton size="medium" aria-label="Edit (medium)"><EditIcon /></IconButton>
            <IconButton size="large" aria-label="Edit (large)"><EditIcon fontSize="large" /></IconButton>
          </Stack>
        </S>
        <S label="States">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton aria-label="Edit"><EditIcon /></IconButton>
            <IconButton disabled aria-label="Edit (disabled)"><EditIcon /></IconButton>
          </Stack>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <IconButton aria-label="Edit" {...args}>
      <EditIcon />
    </IconButton>
  ),
};
