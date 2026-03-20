import React from 'react';
import { Link, Stack, Typography, Divider, Box } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Atoms/TextLink',
  component: Link,
  argTypes: {
    underline: { control: 'select', options: ['always', 'hover', 'none'] },
    color:     { control: 'select', options: ['primary', 'inherit', 'error'] },
  },
  args: {
    underline: 'hover',
    color: 'primary',
    children: 'Text link',
    href: '#',
  },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Text Link"
        description="Lien inline pour la navigation dans le texte courant. Distinction fondamentale : un lien navigue, un bouton agit."
        dos={[
          'underline="hover" par défaut — propre et lisible.',
          'Texte descriptif : "Voir la documentation" > "Cliquez ici".',
          'Indiquer les liens externes avec une icône OpenInNew.',
        ]}
        donts={[
          'Ne pas utiliser "ici" comme texte ancre.',
          'Ne pas simuler un lien avec <span onClick>.',
        ]}
        a11y={[
          'Le texte doit être descriptif hors contexte (les AT listent les liens).',
          'Lien externe : aria-label décrivant l\'ouverture en nouvel onglet.',
          'Contraste minimum 4.5:1 (WCAG AA).',
        ]}
        related={['Button', 'Breadcrumbs']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="In context">
          <Stack spacing={2.5} sx={{ maxWidth: 480 }}>
            <Typography variant="body1">
              To learn more about our design system, visit the{' '}
              <Link href="#" underline="hover">documentation site</Link>
              {' '}or read the{' '}
              <Link href="#" underline="hover">getting started guide</Link>.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By creating an account, you agree to our{' '}
              <Link href="#" underline="hover" color="inherit">Terms of Service</Link>
              {' '}and{' '}
              <Link href="#" underline="hover" color="inherit">Privacy Policy</Link>.
            </Typography>
          </Stack>
        </S>

        <S label="External link">
          <Link href="#" underline="hover" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            Open documentation <OpenInNewIcon sx={{ fontSize: 14 }} />
          </Link>
        </S>

        <S label="Destructive">
          <Link href="#" color="error" underline="hover">Delete my account</Link>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => <Link {...args}>{args.children || 'Link text'}</Link>,
};
