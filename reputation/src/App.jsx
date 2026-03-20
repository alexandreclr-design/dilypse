import { Box, Button } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, PlusSignIcon } from '@hugeicons/core-free-icons';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReviewCard from './components/ReviewCard';
import { reviews } from './data/reviews';

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

        <Box sx={{
          flex: 1, bgcolor: '#FAFAFA', overflow: 'auto',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#E0E0E0', borderRadius: 3 },
        }}>
          <Box sx={{ maxWidth: 720, mx: 'auto', py: 3, px: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                reviewerName={review.reviewerName}
                rating={review.rating}
                date={review.date}
                text={review.text}
                businessName={review.businessName}
                businessAddress={review.businessAddress}
                replied={review.replied}
                replyText={review.replyText}
                replyDate={review.replyDate}
                onReplyWithAI={() => console.log('Reply with AI:', review.id)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
