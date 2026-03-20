import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

function TabPanel({ children, value, index }) {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ p: 3 }}>
      {value === index && <Typography color="text.secondary">{children}</Typography>}
    </Box>
  );
}

export default {
  title: 'Molecules/Tabs',
  component: Tabs,
  argTypes: {
    variant: { control: 'select', options: ['standard', 'fullWidth', 'scrollable'] },
  },
  args: {
    variant: 'standard',
  },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [v1, setV1] = useState(0);
    const [v2, setV2] = useState(0);
    const [v3, setV3] = useState(0);
    return (
      <>
        <DocPage
          title="Tabs"
          description="Les Tabs organisent du contenu connexe sur plusieurs panneaux, un seul panneau visible à la fois. Elles permettent à l'utilisateur de naviguer entre des vues parallèles sans quitter la page courante. Elles créent une hiérarchie de navigation locale, distincte de la navigation globale de l'application."
          dos={[
            'Garder des labels courts (1 à 2 mots) et cohérents dans leur forme (tous noms ou tous verbes).',
            'Toujours avoir un onglet actif par défaut — jamais d\'état vide initial.',
            'Utiliser des icônes avec iconPosition="start" pour améliorer la reconnaissance.',
            'Séparer le header des Tabs du contenu avec un Divider pour la clarté visuelle.',
          ]}
          donts={[
            'Ne pas utiliser les Tabs pour de la navigation qui modifie l\'URL de façon complexe sans gestion du routing.',
            'Ne pas faire défiler le contenu dans les TabPanels — paginer ou charger progressivement.',
            'Ne pas masquer des Tabs selon les droits utilisateur — les rendre disabled si besoin.',
            'Ne pas mélanger des Tabs de types différents (standard + fullWidth) dans la même interface.',
          ]}
          a11y={[
            'La liste des onglets doit avoir role="tablist", chaque onglet role="tab".',
            'Le panneau actif a role="tabpanel" avec aria-labelledby pointant vers son Tab.',
            'Navigation clavier : Tab pour atteindre les onglets, flèches gauche/droite pour naviguer.',
            'L\'onglet actif porte aria-selected="true", les autres aria-selected="false".',
          ]}
          related={['SegmentedControl', 'Breadcrumbs', 'Collapse']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="Standard">
            <Box sx={{ width: 480, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
              <Tabs value={v1} onChange={(_, v) => setV1(v)}>
                <Tab label="Overview" />
                <Tab label="Analytics" />
                <Tab label="Reports" />
              </Tabs>
              <Divider />
              <TabPanel value={v1} index={0}>Overview content goes here.</TabPanel>
              <TabPanel value={v1} index={1}>Analytics content goes here.</TabPanel>
              <TabPanel value={v1} index={2}>Reports content goes here.</TabPanel>
            </Box>
          </S>
          <S label="With icons">
            <Box sx={{ width: 520, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
              <Tabs value={v2} onChange={(_, v) => setV2(v)}>
                <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" />
                <Tab icon={<BarChartIcon />}  iconPosition="start" label="Analytics" />
                <Tab icon={<PeopleIcon />}    iconPosition="start" label="Team" />
                <Tab icon={<SettingsIcon />}  iconPosition="start" label="Settings" />
              </Tabs>
            </Box>
          </S>
          <S label="Full width">
            <Box sx={{ width: 480, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
              <Tabs value={v3} onChange={(_, v) => setV3(v)} variant="fullWidth">
                <Tab label="Details" />
                <Tab label="Activity" />
                <Tab label="Settings" />
              </Tabs>
              <Divider />
              <TabPanel value={v3} index={0}>Details content.</TabPanel>
              <TabPanel value={v3} index={1}>Activity content.</TabPanel>
              <TabPanel value={v3} index={2}>Settings content.</TabPanel>
            </Box>
          </S>
        </Box>
      </>
    );
  },
};

export const Playground = {
  render: (args) => {
    const [value, setValue] = useState(0);
    return (
      <Box sx={{ width: 480, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
        <Tabs {...args} value={value} onChange={(_, v) => setValue(v)}>
          <Tab label="Overview" />
          <Tab label="Analytics" />
          <Tab label="Reports" />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>Overview content goes here.</TabPanel>
        <TabPanel value={value} index={1}>Analytics content goes here.</TabPanel>
        <TabPanel value={value} index={2}>Reports content goes here.</TabPanel>
      </Box>
    );
  },
};
