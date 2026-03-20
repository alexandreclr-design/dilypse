import React, { useState } from 'react';
import { Menu, MenuItem, Button, IconButton, ListItemIcon, ListItemText, Divider, Typography, Box, Stack } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Menu',
  component: Menu,
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [anchor1, setAnchor1] = useState(null);
    const [anchor2, setAnchor2] = useState(null);
    return (
      <>
        <DocPage
          title="Menu"
          description="Le Menu affiche une liste d'actions contextuelles dans un panneau flottant déclenché par un bouton ou un clic droit. Il est non-bloquant (pas de modal) et se ferme automatiquement après une sélection ou un clic en dehors. Idéal pour les actions secondaires liées à un objet spécifique."
          dos={[
            'Grouper les actions liées avec des Dividers (Actions / Actions dangereuses).',
            'Mettre les actions destructives en dernier, avec couleur error.',
            'Ajouter des icônes pour accélérer la reconnaissance visuelle des actions.',
            'Afficher les raccourcis clavier à droite pour les actions fréquentes.',
          ]}
          donts={[
            'Ne pas mélanger actions de navigation et actions d\'objet dans le même Menu.',
            'Ne pas placer plus de 2 niveaux de sous-menus — utiliser un Dialog à la place.',
            'Ne pas utiliser Menu pour des sélections multiples — utiliser Checkbox List.',
          ]}
          a11y={[
            'Le bouton déclencheur doit avoir aria-haspopup="true" et aria-expanded.',
            'Le Menu a role="menu", chaque item role="menuitem".',
            'Navigation clavier : flèches haut/bas pour naviguer, Entrée pour sélectionner, Échap pour fermer.',
            'Le focus revient sur le bouton déclencheur à la fermeture du Menu.',
          ]}
          related={['Select', 'Tooltip', 'IconButton']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="Basic">
            <Button variant="outlined" onClick={(e) => setAnchor1(e.currentTarget)}>Open Menu</Button>
            <Menu anchorEl={anchor1} open={Boolean(anchor1)} onClose={() => setAnchor1(null)}>
              <MenuItem onClick={() => setAnchor1(null)}>Profile</MenuItem>
              <MenuItem onClick={() => setAnchor1(null)}>My account</MenuItem>
              <Divider />
              <MenuItem onClick={() => setAnchor1(null)}>Logout</MenuItem>
            </Menu>
          </S>
          <S label="With icons and shortcuts">
            <IconButton aria-label="More options" onClick={(e) => setAnchor2(e.currentTarget)}><MoreVertIcon /></IconButton>
            <Menu anchorEl={anchor2} open={Boolean(anchor2)} onClose={() => setAnchor2(null)}>
              <MenuItem onClick={() => setAnchor2(null)}>
                <ListItemIcon><ContentCutIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>⌘X</Typography>
              </MenuItem>
              <MenuItem onClick={() => setAnchor2(null)}>
                <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>⌘C</Typography>
              </MenuItem>
              <MenuItem onClick={() => setAnchor2(null)}>
                <ListItemIcon><ContentPasteIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>⌘V</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => setAnchor2(null)}>
                <ListItemIcon><CloudDownloadIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Download</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => setAnchor2(null)} sx={{ color: 'error.main' }}>
                <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </S>
        </Box>
      </>
    );
  },
};

export const Playground = {
  render: () => {
    const [anchor, setAnchor] = useState(null);
    return (
      <>
        <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>Open Menu</Button>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <MenuItem onClick={() => setAnchor(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setAnchor(null)}>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchor(null)}>Logout</MenuItem>
        </Menu>
      </>
    );
  },
};
