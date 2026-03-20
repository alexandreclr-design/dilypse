import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, PlusSignIcon } from '@hugeicons/core-free-icons';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReviewListItem from './components/ReviewListItem';
import ReviewDetail from './components/ReviewDetail';
import { reviews } from './data/reviews';

export default function App() {
  const [selectedId, setSelectedId] = useState(reviews[0]?.id ?? null);
  const selectedReview = reviews.find((r) => r.id === selectedId) || null;

  const unrepliedCount = reviews.filter((r) => !r.replied).length;

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

        {/* Split view */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left panel — Review list */}
          <Box sx={{
            width: 380, flexShrink: 0, borderRight: '1px solid #F0F0F0',
            display: 'flex', flexDirection: 'column', bgcolor: '#FFFFFF',
          }}>
            {/* List header */}
            <Box sx={{
              px: 2, py: 1.5, borderBottom: '1px solid #F0F0F0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#171717' }}>
                  Tous les avis
                </Typography>
                <Typography sx={{ fontSize: 12, color: '#A0A0A0' }}>
                  {reviews.length}
                </Typography>
              </Box>
              {unrepliedCount > 0 && (
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 0.5,
                  bgcolor: '#FEF3F2', px: 1, py: 0.25, borderRadius: '6px',
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#D92D20' }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#D92D20' }}>
                    {unrepliedCount} sans réponse
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Scrollable list */}
            <Box sx={{
              flex: 1, overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 4 },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#E0E0E0', borderRadius: 2 },
            }}>
              {reviews.map((review) => (
                <ReviewListItem
                  key={review.id}
                  review={review}
                  selected={review.id === selectedId}
                  onClick={() => setSelectedId(review.id)}
                />
              ))}
            </Box>
          </Box>

          {/* Right panel — Review detail */}
          <Box sx={{ flex: 1, bgcolor: '#FFFFFF', display: 'flex', overflow: 'hidden' }}>
            <ReviewDetail review={selectedReview} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
