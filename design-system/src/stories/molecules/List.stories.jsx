import React from 'react';
import {
  List, ListItem, ListItemText, ListItemIcon, ListItemAvatar,
  ListItemButton, ListSubheader, Divider,
  Avatar, Box, Typography,
} from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/List',
  component: List,
  argTypes: {
    dense: { control: 'boolean' },
    disablePadding: { control: 'boolean' },
  },
  args: {
    dense: false,
    disablePadding: false,
  },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="List"
        description="La List affiche un ensemble d'éléments verticaux de façon homogène. C'est le composant adapté pour les listes de navigation, les menus d'options, les flux d'activité ou tout contenu structuré en items. Elle supporte icônes, avatars, actions secondaires et sous-titres."
        dos={[
          'Grouper les items liés avec ListSubheader pour créer une hiérarchie claire.',
          'Utiliser dense=true pour les listes secondaires ou les espaces contraints.',
          'Ajouter un Divider entre les groupes de ListItems pour délimiter les sections.',
          'Préférer ListItemButton pour les items navigables — il gère focus et hover.',
        ]}
        donts={[
          'Ne pas mélanger des items cliquables et non-cliquables dans la même liste sans distinction visuelle.',
          'Ne pas surcharger chaque item avec trop d\'informations — 1 titre + 1 sous-titre max.',
          'Ne pas utiliser List pour de la mise en page générale — utiliser Stack ou Grid.',
        ]}
        a11y={[
          'List génère un <ul> natif — les lecteurs d\'écran annoncent le nombre d\'items.',
          'ListItemButton est un <li> contenant un <div role="button"> — accessible au clavier.',
          'Utiliser aria-label sur la List pour décrire son contenu quand le contexte est ambigu.',
          'Les icônes décoratives dans ListItemIcon doivent avoir aria-hidden="true".',
        ]}
        related={['Table', 'Card', 'Menu', 'Accordion']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Navigation list">
          <Box sx={{ width: 320, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <List>
              <ListItemButton>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Inbox" secondary="12 new messages" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><DraftsIcon /></ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemIcon><SendIcon /></ListItemIcon>
                <ListItemText primary="Sent" />
              </ListItemButton>
              <ListItemButton disabled>
                <ListItemIcon><StarIcon /></ListItemIcon>
                <ListItemText primary="Starred (disabled)" />
              </ListItemButton>
            </List>
          </Box>
        </S>
        <S label="With avatars and subheader">
          <Box sx={{ width: 320, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <List>
              <ListSubheader>Folders</ListSubheader>
              {[
                { icon: <ImageIcon />, primary: 'Photos', secondary: '2 items' },
                { icon: <WorkIcon />, primary: 'Work', secondary: '5 items' },
                { icon: <BeachAccessIcon />, primary: 'Vacation', secondary: '1 item' },
              ].map(({ icon, primary, secondary }) => (
                <ListItem key={primary}>
                  <ListItemAvatar><Avatar>{icon}</Avatar></ListItemAvatar>
                  <ListItemText primary={primary} secondary={secondary} />
                </ListItem>
              ))}
            </List>
          </Box>
        </S>
        <S label="Dense">
          <Box sx={{ width: 320, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <List dense>
              {['Item one', 'Item two', 'Item three', 'Item four'].map((text) => (
                <ListItemButton key={text}>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <Box sx={{ width: 320, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <List {...args}>
        <ListItemButton>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Inbox" secondary="12 new messages" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon><DraftsIcon /></ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemIcon><SendIcon /></ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItemButton>
        <ListItemButton disabled>
          <ListItemIcon><StarIcon /></ListItemIcon>
          <ListItemText primary="Starred (disabled)" />
        </ListItemButton>
      </List>
    </Box>
  ),
};
