import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Stack, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/SegmentedControl',
  component: ToggleButtonGroup,
  argTypes: {
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
  },
  args: { exclusive: true, size: 'medium', disabled: false },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [period, setPeriod] = useState('month');
    const [view, setView] = useState('list');
    const [align, setAlign] = useState('left');

    return (
      <>
        <DocPage
          title="Segmented Control"
          description="Alternative compacte aux Tabs pour basculer entre des vues ou options mutuellement exclusives. Contrôle directement l'état de l'interface."
          dos={[
            'Toujours une option présélectionnée.',
            'Labels courts (1-2 mots) ou icônes seules.',
            'Placer proche du contenu contrôlé.',
          ]}
          donts={[
            'Ne pas mélanger icônes et texte dans le même groupe.',
            'Ne pas dépasser 4-5 options.',
          ]}
          a11y={[
            'role="group" avec aria-label sur le groupe.',
            'aria-pressed="true" sur l\'option sélectionnée.',
            'Clavier : Tab + flèches.',
          ]}
          related={['Tabs', 'Radio', 'Button']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>

          <S label="Text labels">
            <ToggleButtonGroup
              exclusive
              value={period}
              onChange={(_, v) => { if (v !== null) setPeriod(v); }}
              size="small"
              aria-label="Billing period"
            >
              <ToggleButton value="month">Monthly</ToggleButton>
              <ToggleButton value="year">Yearly</ToggleButton>
            </ToggleButtonGroup>
          </S>

          <S label="With icons">
            <Stack spacing={2.5}>
              <ToggleButtonGroup
                exclusive
                value={view}
                onChange={(_, v) => { if (v !== null) setView(v); }}
                size="small"
                aria-label="View mode"
              >
                <ToggleButton value="list" aria-label="List"><ViewListIcon fontSize="small" /></ToggleButton>
                <ToggleButton value="grid" aria-label="Grid"><ViewModuleIcon fontSize="small" /></ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                exclusive
                value={align}
                onChange={(_, v) => { if (v !== null) setAlign(v); }}
                size="small"
                aria-label="Text alignment"
              >
                <ToggleButton value="left" aria-label="Left"><FormatAlignLeftIcon fontSize="small" /></ToggleButton>
                <ToggleButton value="center" aria-label="Center"><FormatAlignCenterIcon fontSize="small" /></ToggleButton>
                <ToggleButton value="right" aria-label="Right"><FormatAlignRightIcon fontSize="small" /></ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </S>

          <S label="Sizes">
            <Stack spacing={2}>
              {['small', 'medium', 'large'].map((sz) => (
                <Stack key={sz} direction="row" spacing={2} alignItems="center">
                  <Typography variant="caption" color="text.disabled" sx={{ width: 56 }}>{sz}</Typography>
                  <ToggleButtonGroup exclusive value="a" size={sz}>
                    <ToggleButton value="a">Option A</ToggleButton>
                    <ToggleButton value="b">Option B</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              ))}
            </Stack>
          </S>

          <S label="States">
            <Stack spacing={2}>
              <ToggleButtonGroup exclusive value="a" size="small">
                <ToggleButton value="a">Selected</ToggleButton>
                <ToggleButton value="b">Default</ToggleButton>
                <ToggleButton value="c" disabled>Disabled</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </S>

        </Box>
      </>
    );
  },
};

export const Playground = {
  render: (args) => {
    const [value, setValue] = useState('list');
    return (
      <ToggleButtonGroup
        {...args}
        value={value}
        onChange={(_, v) => { if (v !== null) setValue(v); }}
      >
        <ToggleButton value="list">List</ToggleButton>
        <ToggleButton value="grid">Grid</ToggleButton>
        <ToggleButton value="board">Board</ToggleButton>
      </ToggleButtonGroup>
    );
  },
};
