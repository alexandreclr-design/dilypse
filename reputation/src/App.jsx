import { Box, Typography, Button } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, PlusSignIcon } from '@hugeicons/core-free-icons';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeItem="reputation" />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header
          icon={StarIcon}
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
                '&:hover': { borderColor: '#D1D1D1', bgcolor: '#FAFAFA' },
              }}
            >
              Demandes d'avis
            </Button>
          }
        />

        <Box sx={{ flex: 1, bgcolor: '#FAFAFA', p: 3, overflow: 'auto' }}>
          <Box sx={{
            border: '2px dashed #EEEEEE', borderRadius: '12px',
            height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Typography sx={{ fontSize: 14, color: '#BFBFBF' }}>
              Contenu de la page Réputation
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
