import { Box, Typography, IconButton, Button, TextField } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  StarIcon, SparklesIcon, MoreVerticalIcon, SentIcon,
  CheckmarkCircle01Icon, Clock01Icon,
} from '@hugeicons/core-free-icons';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <Box sx={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <HugeiconsIcon key={i} icon={StarIcon} size={16} color={i <= rating ? '#F79009' : '#E0E0E0'} />
      ))}
    </Box>
  );
}

export default function ReviewDetail({ review }) {
  if (!review) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 14, color: '#A0A0A0' }}>
          Sélectionnez un avis pour le consulter
        </Typography>
      </Box>
    );
  }

  const { reviewerName, rating, date, text, businessName, businessAddress, replied, replyText, replyDate } = review;

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Scrollable content */}
      <Box sx={{
        flex: 1, overflow: 'auto', px: 3, py: 3,
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: '#E0E0E0', borderRadius: 2 },
      }}>
        {/* Business source */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <GoogleIcon />
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#171717', lineHeight: 1.3 }}>
              {businessName}
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#A0A0A0', lineHeight: 1.3 }}>
              {businessAddress}
            </Typography>
          </Box>
        </Box>

        {/* Reviewer header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#171717', lineHeight: 1.3, mb: 0.75 }}>
              {reviewerName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <StarRating rating={rating} />
              <Typography sx={{ fontSize: 12, color: '#A0A0A0' }}>
                {date}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {replied ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', bgcolor: '#ECFDF3', px: 1.25, py: 0.5, borderRadius: '6px' }}>
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={13} color="#039855" />
                <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#039855' }}>Répondu</Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', bgcolor: '#FEF3F2', px: 1.25, py: 0.5, borderRadius: '6px' }}>
                <HugeiconsIcon icon={Clock01Icon} size={13} color="#D92D20" />
                <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#D92D20' }}>Non répondu</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Review text */}
        {text ? (
          <Typography sx={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.7, mb: 3 }}>
            {text}
          </Typography>
        ) : (
          <Typography sx={{ fontSize: 13, color: '#A0A0A0', fontStyle: 'italic', mb: 3 }}>
            Aucun commentaire — note uniquement
          </Typography>
        )}

        {/* Reply section */}
        {replied && replyText && (
          <Box sx={{
            p: 2.5, bgcolor: '#FAFAFA', borderRadius: '10px', border: '1px solid #F0F0F0',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <HugeiconsIcon icon={SentIcon} size={14} color="#6B6B6B" />
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#4A4A4A' }}>
                  Votre réponse
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {replyDate && (
                  <Typography sx={{ fontSize: 11, color: '#A0A0A0' }}>{replyDate}</Typography>
                )}
                <IconButton size="small" sx={{ p: 0.25 }}>
                  <HugeiconsIcon icon={MoreVerticalIcon} size={16} color="#A0A0A0" />
                </IconButton>
              </Box>
            </Box>
            <Typography sx={{ fontSize: 13.5, color: '#4A4A4A', lineHeight: 1.7 }}>
              {replyText}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Reply bar — sticky bottom */}
      {!replied && (
        <Box sx={{
          px: 3, py: 2, borderTop: '1px solid #F0F0F0', bgcolor: '#FFFFFF',
          display: 'flex', flexDirection: 'column', gap: 1.5,
        }}>
          <TextField
            multiline
            minRows={2}
            maxRows={4}
            placeholder="Écrivez votre réponse..."
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                fontSize: 13.5,
                '& fieldset': { borderColor: '#F0F0F0' },
                '&:hover fieldset': { borderColor: '#E0E0E0' },
                '&.Mui-focused fieldset': { borderColor: '#D1D1D1' },
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              startIcon={<HugeiconsIcon icon={SparklesIcon} size={16} />}
              sx={{
                bgcolor: '#171717', color: '#FFFFFF',
                fontSize: 13, fontWeight: 600, borderRadius: '8px',
                px: 2, py: 0.75, textTransform: 'none',
                '&:hover': { bgcolor: '#2A2A2A' },
              }}
            >
              Générer avec l'IA
            </Button>
            <Button
              startIcon={<HugeiconsIcon icon={SentIcon} size={15} />}
              sx={{
                color: '#6B6B6B', fontSize: 13, fontWeight: 500,
                textTransform: 'none', borderRadius: '8px',
                '&:hover': { bgcolor: '#F5F5F5' },
              }}
            >
              Envoyer
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
