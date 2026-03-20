import React from 'react';
import { Avatar, AvatarGroup, Stack, Box, Typography, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import PersonIcon from '@mui/icons-material/Person';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    variant: { control: 'select', options: ['circular', 'rounded', 'square'] },
  },
  args: { variant: 'circular', children: 'JD', sx: { bgcolor: 'primary.main' } },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Avatar"
        description="Représentation visuelle d'une personne ou entité. Trois fallbacks : image, initiales, icône."
        dos={[
          'Toujours fournir un alt ou aria-label.',
          'Initiales : 2 lettres max, couleur persistante par utilisateur.',
          'AvatarGroup : max=4 avec compteur overflow (+N).',
        ]}
        donts={[
          'Ne pas mélanger shapes différentes dans le même contexte.',
          'Ne pas utiliser de photos basse résolution.',
        ]}
        a11y={[
          'Image : alt="Prénom Nom" obligatoire.',
          'Initiales : aria-label="Prénom Nom" requis.',
          'AvatarGroup : aria-label décrivant le groupe.',
        ]}
        related={['Chip']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="Types">
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack alignItems="center" spacing={0.5}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
              <Typography variant="caption" color="text.disabled">Initials</Typography>
            </Stack>
            <Stack alignItems="center" spacing={0.5}>
              <Avatar alt="User" src="https://i.pravatar.cc/40?img=1" />
              <Typography variant="caption" color="text.disabled">Image</Typography>
            </Stack>
            <Stack alignItems="center" spacing={0.5}>
              <Avatar sx={{ bgcolor: 'primary.light' }}><PersonIcon /></Avatar>
              <Typography variant="caption" color="text.disabled">Icon</Typography>
            </Stack>
          </Stack>
        </S>

        <S label="Sizes — SM / MD / LG">
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack alignItems="center" spacing={0.5}>
              <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: 'primary.main' }}>SM</Avatar>
              <Typography variant="caption" color="text.disabled">28px</Typography>
            </Stack>
            <Stack alignItems="center" spacing={0.5}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>MD</Avatar>
              <Typography variant="caption" color="text.disabled">36px</Typography>
            </Stack>
            <Stack alignItems="center" spacing={0.5}>
              <Avatar sx={{ width: 48, height: 48, fontSize: 18, bgcolor: 'primary.main' }}>LG</Avatar>
              <Typography variant="caption" color="text.disabled">48px</Typography>
            </Stack>
          </Stack>
        </S>

        <S label="Status">
          <Stack direction="row" spacing={3} alignItems="center">
            {[
              { color: 'success.main', label: 'Online' },
              { color: 'warning.main', label: 'Away' },
              { color: 'error.main', label: 'Busy' },
              { color: 'text.disabled', label: 'Offline' },
            ].map(({ color, label }) => (
              <Stack key={label} alignItems="center" spacing={0.5}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
                  <Box sx={{
                    position: 'absolute', bottom: 1, right: 1,
                    width: 10, height: 10, borderRadius: '50%',
                    bgcolor: color, border: '2px solid', borderColor: 'background.default',
                  }} />
                </Box>
                <Typography variant="caption" color="text.disabled">{label}</Typography>
              </Stack>
            ))}
          </Stack>
        </S>

        <S label="Group">
          <Box sx={{ display: 'flex' }}>
          <AvatarGroup max={4}>
            <Avatar alt="U1" src="https://i.pravatar.cc/40?img=1" />
            <Avatar alt="U2" src="https://i.pravatar.cc/40?img=2" />
            <Avatar alt="U3" src="https://i.pravatar.cc/40?img=3" />
            <Avatar alt="U4" src="https://i.pravatar.cc/40?img=4" />
            <Avatar alt="U5" src="https://i.pravatar.cc/40?img=5" />
          </AvatarGroup>
          </Box>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <Avatar {...args} />,
};
