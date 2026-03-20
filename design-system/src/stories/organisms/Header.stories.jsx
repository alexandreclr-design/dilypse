import { Box, Typography, Button } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SparklesIcon, Building01Icon, Megaphone01Icon, PlusSignIcon,
} from '@hugeicons/core-free-icons';

function Header({ icon, title, cta }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        borderBottom: '1px solid #EEEEEE',
        bgcolor: '#FFFFFF',
        minHeight: 56,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon && <HugeiconsIcon icon={icon} size={20} color="#858585" />}
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#171717' }}>
          {title}
        </Typography>
      </Box>

      {cta && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {cta}
        </Box>
      )}
    </Box>
  );
}

export default {
  title: 'Organisms/Header',
  parameters: {
    controls: { disable: true },
    options: { showPanel: false },
  },
};

export const Overview = {
  name: 'Overview',
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Sans CTA */}
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#858585', mb: 1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Sans CTA
        </Typography>
        <Box sx={{ border: '1px solid #EEEEEE', borderRadius: '8px', overflow: 'hidden' }}>
          <Header icon={Building01Icon} title="Établissements" />
        </Box>
      </Box>

      {/* Avec CTA outlined */}
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#858585', mb: 1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Avec CTA outlined
        </Typography>
        <Box sx={{ border: '1px solid #EEEEEE', borderRadius: '8px', overflow: 'hidden' }}>
          <Header
            icon={SparklesIcon}
            title="Réputation"
            cta={
              <Button
                variant="outlined"
                size="small"
                startIcon={<HugeiconsIcon icon={PlusSignIcon} size={16} />}
                sx={{
                  borderColor: '#EEEEEE',
                  color: '#171717',
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': { borderColor: '#D1D1D1', bgcolor: '#FAFAFA' },
                }}
              >
                Demandes d'avis
              </Button>
            }
          />
        </Box>
      </Box>

      {/* Avec CTA primary */}
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#858585', mb: 1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Avec CTA primary
        </Typography>
        <Box sx={{ border: '1px solid #EEEEEE', borderRadius: '8px', overflow: 'hidden' }}>
          <Header
            icon={Megaphone01Icon}
            title="Campagnes"
            cta={
              <Button
                variant="contained"
                size="small"
                startIcon={<HugeiconsIcon icon={PlusSignIcon} size={16} />}
                sx={{
                  bgcolor: '#1570EF',
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#175CD3', boxShadow: 'none' },
                }}
              >
                Nouvelle campagne
              </Button>
            }
          />
        </Box>
      </Box>

      {/* Sans icône */}
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#858585', mb: 1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Sans icône
        </Typography>
        <Box sx={{ border: '1px solid #EEEEEE', borderRadius: '8px', overflow: 'hidden' }}>
          <Header title="Paramètres" />
        </Box>
      </Box>
    </Box>
  ),
};
