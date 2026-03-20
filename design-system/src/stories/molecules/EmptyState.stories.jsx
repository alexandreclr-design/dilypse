import React from 'react';
import { Box, Typography, Button, Stack, Divider } from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import InboxIcon from '@mui/icons-material/Inbox';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';

function EmptyState({ icon: Icon, title, description, action, secondaryAction }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 8, px: 3, gap: 2 }}>
      {Icon && (
        <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <Icon sx={{ fontSize: 28, color: 'text.disabled' }} />
        </Box>
      )}
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>{title}</Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>{description}</Typography>
        )}
      </Box>
      {(action || secondaryAction) && (
        <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
          {action}
          {secondaryAction}
        </Stack>
      )}
    </Box>
  );
}

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/EmptyState',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
};

export const Overview = {
  name: 'Overview',
  render: () => (
    <>
      <DocPage
        title="Empty State"
        description="L'Empty State est le contenu affiché lorsqu'une section ou une liste ne contient aucune donnée. Loin d'être un vide à remplir, c'est une opportunité de guider l'utilisateur vers la prochaine action pertinente. Un bon Empty State transforme la frustration en direction."
        dos={[
          'Contextualiser : expliquer pourquoi c\'est vide, pas juste que c\'est vide.',
          'Proposer une action principale claire pour remplir le vide.',
          'Adapter l\'illustration ou l\'icône au contexte précis de la section.',
          'Pour les filtres : offrir un bouton "Réinitialiser les filtres" en action principale.',
        ]}
        donts={[
          'Ne pas afficher d\'Empty State pendant le chargement — utiliser un Skeleton.',
          'Ne pas utiliser une image complexe quand une icône suffit.',
          'Ne pas mettre plus de 2 actions — hiérarchiser primary vs secondary.',
          'Ne pas répéter le titre dans la description.',
        ]}
        a11y={[
          'Le conteneur doit avoir role="status" pour notifier les lecteurs d\'écran du changement d\'état.',
          'L\'icône est décorative — utiliser aria-hidden="true".',
          'Le titre doit être un heading (h2-h3) pour la navigation par sections.',
          'L\'action principale doit être le premier élément focusable dans le bloc.',
        ]}
        related={['Skeleton', 'Alert', 'Button']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="First use">
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: 480 }}>
            <EmptyState
              icon={InboxIcon}
              title="No items yet"
              description="Create your first item to get started. It only takes a few seconds."
              action={<Button variant="contained" startIcon={<AddIcon />}>Create item</Button>}
            />
          </Box>
        </S>
        <S label="No search results">
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: 480 }}>
            <EmptyState
              icon={SearchOffIcon}
              title="No results for «invoice»"
              description="Try a different keyword or check for typos."
              action={<Button variant="outlined">Clear search</Button>}
            />
          </Box>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  parameters: { controls: { disable: false }, options: { showPanel: true } },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: 'No items yet',
    description: 'Create your first item to get started.',
  },
  render: (args) => (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: 480 }}>
      <EmptyState
        icon={InboxIcon}
        title={args.title}
        description={args.description}
        action={<Button variant="contained" startIcon={<AddIcon />}>Create item</Button>}
      />
    </Box>
  ),
};
