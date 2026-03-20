import React from 'react';
import { Switch, FormControlLabel, FormGroup, Stack, Typography, Box, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Switch',
  component: Switch,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: { color: 'primary', disabled: false, defaultChecked: true },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Switch"
        description="État binaire on/off qui prend effet immédiatement, sans confirmation. Idéal pour les paramètres et préférences."
        dos={[
          'Label à gauche dans les settings.',
          'Nommer le paramètre à l\'état actif.',
          'Feedback visuel immédiat au changement.',
        ]}
        donts={[
          'Ne pas utiliser si une sauvegarde est requise → Checkbox.',
          'Ne pas placer dans un formulaire avec Submit.',
        ]}
        a11y={[
          'role="switch" avec aria-checked géré par MUI.',
          'Clavier : Tab pour focus, Espace pour basculer.',
        ]}
        related={['Checkbox', 'Radio']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="States">
          <Stack direction="row" spacing={4} alignItems="center">
            {[
              { label: 'On', props: { defaultChecked: true } },
              { label: 'Off', props: {} },
              { label: 'Disabled on', props: { disabled: true, defaultChecked: true } },
              { label: 'Disabled off', props: { disabled: true } },
            ].map(({ label, props }) => (
              <Stack key={label} alignItems="center" spacing={0.5}>
                <Switch {...props} />
                <Typography variant="caption" color="text.disabled">{label}</Typography>
              </Stack>
            ))}
          </Stack>
        </S>

        <S label="Settings pattern">
          <Box sx={{
            width: 380, border: '1px solid', borderColor: 'divider',
            borderRadius: 3, overflow: 'hidden',
          }}>
            <FormGroup>
              {[
                { label: 'Email notifications', desc: 'Receive updates about your account', checked: true },
                { label: 'Dark mode', desc: 'Switch to dark theme', checked: false },
                { label: 'Auto-save', desc: 'Automatically save your changes', checked: true },
                { label: 'Beta features', desc: 'Access experimental functionality', checked: false, disabled: true },
              ].map(({ label, desc, checked, disabled }, i, arr) => (
                <Box
                  key={label}
                  sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    px: 2.5, py: 1.5,
                    borderBottom: i < arr.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    opacity: disabled ? 0.5 : 1,
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={500}>{label}</Typography>
                    <Typography variant="caption" color="text.tertiary">{desc}</Typography>
                  </Box>
                  <Switch defaultChecked={checked} disabled={disabled} />
                </Box>
              ))}
            </FormGroup>
          </Box>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <FormControlLabel control={<Switch {...args} />} label="Switch label" />,
};
