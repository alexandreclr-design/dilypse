import { Box, Typography, IconButton, Button, TextField } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SparklesIcon, MoreVerticalIcon, SentIcon,
  CheckmarkCircle01Icon, Clock01Icon,
} from '@hugeicons/core-free-icons';
import StarRating from './StarRating';

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

export default function ReviewDetail({ review }) {
  if (!review) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 14, color: '#BFBFBF' }}>
          Sélectionnez un avis
        </Typography>
      </Box>
    );
  }

  const { reviewerName, rating, date, text, businessName, businessAddress, replied, replyText, replyDate } = review;

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Scrollable content */}
      <Box sx={{
        flex: 1, overflow: 'auto',
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: '#E0E0E0', borderRadius: 2 },
      }}>
        {/* ─── Top section: reviewer identity ─── */}
        <Box sx={{ px: 4, pt: 4, pb: 3 }}>
          {/* Name + status */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#171717', lineHeight: 1.2 }}>
              {reviewerName}
            </Typography>
            {replied ? (
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                bgcolor: '#ECFDF3', px: 1.25, py: 0.5, borderRadius: '6px', flexShrink: 0,
              }}>
                <HugeiconsIcon icon={CheckmarkCircle01Icon} size={13} color="#039855" />
                <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#039855' }}>Répondu</Typography>
              </Box>
            ) : (
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                bgcolor: '#FEF3F2', px: 1.25, py: 0.5, borderRadius: '6px', flexShrink: 0,
              }}>
                <HugeiconsIcon icon={Clock01Icon} size={13} color="#D92D20" />
                <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#D92D20' }}>Non répondu</Typography>
              </Box>
            )}
          </Box>

          {/* Stars + date + source — single meta line */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <StarRating rating={rating} size={16} />
            <Box sx={{ width: 1, height: 14, bgcolor: '#EEEEEE' }} />
            <Typography sx={{ fontSize: 12.5, color: '#A0A0A0' }}>{date}</Typography>
            <Box sx={{ width: 1, height: 14, bgcolor: '#EEEEEE' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <GoogleIcon />
              <Typography sx={{ fontSize: 12.5, color: '#A0A0A0' }}>
                {businessName}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ─── Divider ─── */}
        <Box sx={{ mx: 4, borderTop: '1px solid #F0F0F0' }} />

        {/* ─── Review body ─── */}
        <Box sx={{ px: 4, py: 3 }}>
          {text ? (
            <Typography sx={{ fontSize: 14.5, color: '#4A4A4A', lineHeight: 1.8 }}>
              {text}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: 13.5, color: '#BFBFBF', fontStyle: 'italic' }}>
              Aucun commentaire — note uniquement
            </Typography>
          )}
        </Box>

        {/* ─── Reply (if exists) ─── */}
        {replied && replyText && (
          <>
            <Box sx={{ mx: 4, borderTop: '1px solid #F0F0F0' }} />
            <Box sx={{ px: 4, py: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <HugeiconsIcon icon={SentIcon} size={14} color="#858585" />
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#4A4A4A' }}>
                    Votre réponse
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  {replyDate && (
                    <Typography sx={{ fontSize: 11, color: '#BFBFBF' }}>{replyDate}</Typography>
                  )}
                  <IconButton size="small" sx={{ p: 0.25, '&:hover': { bgcolor: '#F5F5F5' } }}>
                    <HugeiconsIcon icon={MoreVerticalIcon} size={16} color="#BFBFBF" />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{
                p: 2.5, bgcolor: '#FAFAFA', borderRadius: '10px',
              }}>
                <Typography sx={{ fontSize: 13.5, color: '#6B6B6B', lineHeight: 1.7 }}>
                  {replyText}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {/* ─── Business details (contextual, at the bottom) ─── */}
        <Box sx={{ mx: 4, borderTop: '1px solid #F0F0F0' }} />
        <Box sx={{ px: 4, py: 2.5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 500, color: '#BFBFBF', textTransform: 'uppercase', letterSpacing: '0.04em', mb: 0.75 }}>
            Établissement
          </Typography>
          <Typography sx={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.4 }}>
            {businessName} — {businessAddress}
          </Typography>
        </Box>
      </Box>

      {/* ─── Reply composer (sticky bottom) ─── */}
      {!replied && (
        <Box sx={{
          px: 4, py: 2.5, borderTop: '1px solid #F0F0F0', bgcolor: '#FFFFFF',
        }}>
          <TextField
            multiline
            minRows={2}
            maxRows={4}
            placeholder="Écrivez votre réponse..."
            fullWidth
            sx={{
              mb: 1.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px', fontSize: 13.5, bgcolor: '#FAFAFA',
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
                px: 2.5, py: 1, textTransform: 'none',
                '&:hover': { bgcolor: '#2A2A2A' },
              }}
            >
              Générer avec l'IA
            </Button>
            <Button
              variant="outlined"
              startIcon={<HugeiconsIcon icon={SentIcon} size={14} />}
              sx={{
                borderColor: '#EEEEEE', color: '#6B6B6B',
                fontSize: 13, fontWeight: 500, textTransform: 'none',
                borderRadius: '8px', px: 2, py: 0.75,
                '&:hover': { borderColor: '#D1D1D1', bgcolor: '#FAFAFA' },
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
