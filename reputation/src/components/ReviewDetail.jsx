import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { MoreVerticalIcon, SentIcon } from '@hugeicons/core-free-icons';
import StarRating from './StarRating';
import ReplyComposer from './ReplyComposer';
import { text, foreground, background, border, spacing, radius, typographyTokens } from '../theme/tokens';

const sp = spacing;
const { size, weight } = typographyTokens;
const MotionBox = motion.create(Box);

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function ReviewDetail({ review, onSendReply }) {
  if (!review) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: background.secondary }}>
        <Typography variant="body2" sx={{ color: text.disabled }}>Sélectionnez un avis</Typography>
      </Box>
    );
  }

  const { reviewerName, rating, date, text: reviewText, businessName, replied, replyText, replyDate } = review;

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: background.secondary }}>
      <Box sx={{
        flex: 1, overflow: 'auto',
        scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' },
      }}>
        <AnimatePresence mode="wait">
          <MotionBox
            key={review.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <Box sx={{ maxWidth: 580, mx: 'auto', py: sp[7] + 'px', px: sp[6] + 'px', display: 'flex', flexDirection: 'column', gap: sp[4] + 'px' }}>

              {/* Review card — tight padding */}
              <Box sx={{
                bgcolor: background.primary,
                border: `1px solid ${border.primary}`,
                borderRadius: radius.lg + 'px',
              }}>
                {/* Source line */}
                <Box sx={{
                  px: sp[6] + 'px', py: sp[4] + 'px',
                  borderBottom: `1px solid ${border.primary}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: sp[3] + 'px' }}>
                    <GoogleIcon />
                    <Typography variant="caption" sx={{ color: text.tertiary }}>{businessName}</Typography>
                    <Typography variant="caption" sx={{ color: text.disabled }}>·</Typography>
                    <Typography variant="caption" sx={{ color: text.disabled }}>{date}</Typography>
                  </Box>
                </Box>

                {/* Content */}
                <Box sx={{ px: sp[6] + 'px', py: sp[6] + 'px' }}>
                  {/* Name + stars */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: sp[5] + 'px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: weight.semibold, color: text.primary }}>
                      {reviewerName}
                    </Typography>
                    <StarRating rating={rating} size={14} />
                  </Box>

                  {/* Review text */}
                  {reviewText ? (
                    <Typography variant="body2" sx={{ color: text.primary, lineHeight: 1.7 }}>
                      {reviewText}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ color: text.disabled, fontStyle: 'italic' }}>
                      Aucun commentaire — note uniquement
                    </Typography>
                  )}
                </Box>

                {/* Reply */}
                {replied && replyText && (
                  <MotionBox
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.08 }}
                    sx={{
                      px: sp[6] + 'px', py: sp[5] + 'px',
                      borderTop: `1px solid ${border.primary}`,
                      display: 'flex', flexDirection: 'column', gap: sp[3] + 'px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: sp[3] + 'px' }}>
                        <HugeiconsIcon icon={SentIcon} size={12} color={foreground.tertiary} />
                        <Typography variant="caption" sx={{ fontWeight: weight.medium, color: text.tertiary }}>
                          Votre réponse
                        </Typography>
                        {replyDate && (
                          <Typography variant="caption" sx={{ color: text.disabled }}>· {replyDate}</Typography>
                        )}
                      </Box>
                      <IconButton size="small" sx={{ p: sp[1] + 'px' }}>
                        <HugeiconsIcon icon={MoreVerticalIcon} size={14} color={foreground.disabled} />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ color: text.secondary, lineHeight: 1.7 }}>
                      {replyText}
                    </Typography>
                  </MotionBox>
                )}
              </Box>

              {/* Composer */}
              {!replied && (
                <ReplyComposer
                  review={review}
                  onSend={(rt) => onSendReply?.(review.id, rt)}
                />
              )}
            </Box>
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
