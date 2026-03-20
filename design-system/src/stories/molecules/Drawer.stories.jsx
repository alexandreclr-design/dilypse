import React, { useState } from 'react';
import {
  Drawer, Button, Box, Typography, Stack, Divider, IconButton,
  List, ListItemButton, ListItemIcon, ListItemText, Avatar, Chip,
} from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Drawer',
  component: Drawer,
  argTypes: {
    anchor: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
  },
  args: { anchor: 'right' },
};

const navItems = [
  { icon: <HomeIcon />,         label: 'Dashboard',  active: true },
  { icon: <PeopleIcon />,       label: 'Team' },
  { icon: <FolderIcon />,       label: 'Projects',   badge: '12' },
  { icon: <BarChartIcon />,     label: 'Analytics' },
  { icon: <CalendarTodayIcon />,label: 'Calendar' },
  { icon: <MailOutlineIcon />,  label: 'Messages',   badge: '3' },
  { icon: <SettingsIcon />,     label: 'Settings' },
];

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [nav, setNav] = useState(false);
    const [detail, setDetail] = useState(false);
    return (
      <>
        <DocPage
          title="Drawer"
          description="Le Drawer est un panneau latéral qui glisse depuis un bord de l'écran. Il offre un espace secondaire pour la navigation, les détails d'un élément ou un formulaire rapide — sans quitter le contexte de la page."
          dos={[
            'Toujours afficher un bouton de fermeture visible (X ou bouton).',
            'Utiliser le côté droit pour les détails/actions, le côté gauche pour la navigation.',
            'Largeur cohérente : 320px pour la nav, 400-480px pour les détails.',
            'Permettre la fermeture via clic sur le backdrop et touche Escape.',
          ]}
          donts={[
            'Ne pas ouvrir un Drawer depuis un autre Drawer.',
            'Ne pas utiliser un Drawer plein écran — c\'est une page, pas un Drawer.',
            'Ne pas bloquer le scroll de la page sans raison.',
          ]}
          a11y={[
            'Le Drawer a role="presentation" par défaut — ajouter aria-label pour le contexte.',
            'Le focus est piégé dans le Drawer quand il est modal (variant="temporary").',
            'Escape ferme le Drawer — comportement natif MUI.',
            'Le bouton qui ouvre le Drawer doit recevoir le focus au retour.',
            'La navigation dans le Drawer doit être navigable au clavier (Tab + Enter).',
          ]}
          related={['Dialog', 'List', 'Tabs', 'Menu']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="Navigation drawer">
            <Button variant="outlined" onClick={() => setNav(true)}>Open navigation</Button>
            <Drawer anchor="left" open={nav} onClose={() => setNav(false)}>
              <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: 14 }}>D</Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>Dilypse</Typography>
                    <Typography variant="caption" color="text.tertiary">Design System</Typography>
                  </Box>
                </Box>
                <Divider />
                <List sx={{ flex: 1, py: 1 }}>
                  {navItems.map(({ icon, label, active, badge }) => (
                    <ListItemButton key={label} selected={active} sx={{ mx: 1, mb: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36, color: active ? 'primary.main' : 'text.secondary' }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={label} />
                      {badge && <Chip label={badge} size="small" variant="outlined" />}
                    </ListItemButton>
                  ))}
                </List>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 12 }}>AL</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={500}>Alice Leblanc</Typography>
                      <Typography variant="caption" color="text.tertiary">alice@dilypse.io</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Drawer>
          </S>

          <S label="Detail panel">
            <Button variant="outlined" onClick={() => setDetail(true)}>View details</Button>
            <Drawer anchor="right" open={detail} onClose={() => setDetail(false)}>
              <Box sx={{ width: 420 }}>
                <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Project details</Typography>
                  <IconButton aria-label="close" onClick={() => setDetail(false)} size="small">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Divider />
                <Box sx={{ p: 2.5 }}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="caption" color="text.tertiary" display="block" gutterBottom>Name</Typography>
                      <Typography variant="body2" fontWeight={500}>Dilypse Design System</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.tertiary" display="block" gutterBottom>Status</Typography>
                      <Chip label="Active" color="success" size="small" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.tertiary" display="block" gutterBottom>Team</Typography>
                      <Stack direction="row" spacing={1}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 11 }}>AL</Avatar>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: 'error.main' }}>MR</Avatar>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: 'success.main' }}>SC</Avatar>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.tertiary" display="block" gutterBottom>Description</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Component library built on MUI with shadcn-inspired theme. Provides clean, accessible UI primitives for production applications.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.tertiary" display="block" gutterBottom>Created</Typography>
                      <Typography variant="body2">March 12, 2026</Typography>
                    </Box>
                  </Stack>
                </Box>
                <Divider />
                <Box sx={{ p: 2.5 }}>
                  <Stack direction="row" spacing={1.5}>
                    <Button variant="contained" fullWidth>Edit project</Button>
                    <Button variant="outlined" color="error" fullWidth>Archive</Button>
                  </Stack>
                </Box>
              </Box>
            </Drawer>
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
        <Button variant="contained" onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer anchor={args.anchor} open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: args.anchor === 'top' || args.anchor === 'bottom' ? 'auto' : 360, p: 3 }}>
            <Typography variant="h6" gutterBottom>Drawer content</Typography>
            <Typography variant="body2" color="text.secondary">
              Use the controls panel to change the anchor position.
            </Typography>
          </Box>
        </Drawer>
      </>
    );
  },
};
