import { useState, useMemo } from 'react';
import { Box, Typography, TextField, Button, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { SparklesIcon, SentIcon, ArrowRight01Icon, MultiplicationSignIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import StarRating from './StarRating';
import { text, foreground, background, border, spacing, radius, typographyTokens } from '../theme/tokens';

const sp = spacing;
const { weight } = typographyTokens;
const MotionBox = motion.create(Box);

const REPLIES = {
  5: 'Merci beaucoup pour votre avis 5 étoiles ! Votre satisfaction est notre priorité.',
  4: 'Merci pour votre retour positif ! Nous travaillons continuellement à nous améliorer.',
  3: 'Merci pour votre avis. Nous prenons en compte vos remarques pour améliorer nos services.',
  2: 'Nous sommes désolés que votre expérience n\'ait pas été à la hauteur. Nous allons nous améliorer.',
  1: 'Nous sommes sincèrement désolés. Notre équipe va vous contacter directement.',
};

export default function BatchReplyQueue({ reviews, onSendReply, onClose }) {
  const unreplied = useMemo(() => reviews.filter(r => !r.replied), [reviews]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [replies, setReplies] = useState(() =>
    Object.fromEntries(unreplied.map(r => [r.id, REPLIES[r.rating] || REPLIES[5]]))
  );
  const [sent, setSent] = useState(new Set());
  const [skipped, setSkipped] = useState(new Set());

  const current = unreplied[currentIndex];
  const totalCount = unreplied.length;
  const treatedCount = sent.size + skipped.size;
  const progress = totalCount > 0 ? (treatedCount / totalCount) * 100 : 0;
  const isFinished = treatedCount === totalCount;

  const goNext = () => {
    // Find next untreated
    for (let i = currentIndex + 1; i < unreplied.length; i++) {
      if (!sent.has(unreplied[i].id) && !skipped.has(unreplied[i].id)) {
        setCurrentIndex(i);
        return;
      }
    }
    // Wrap around
    for (let i = 0; i < currentIndex; i++) {
      if (!sent.has(unreplied[i].id) && !skipped.has(unreplied[i].id)) {
        setCurrentIndex(i);
        return;
      }
    }
  };

  const handleApprove = () => {
    if (!current) return;
    const replyText = replies[current.id];
    if (replyText?.trim()) {
      onSendReply(current.id, replyText);
      setSent(prev => new Set([...prev, current.id]));
    }
    goNext();
  };

  const handleSkip = () => {
    if (!current) return;
    setSkipped(prev => new Set([...prev, current.id]));
    goNext();
  };

  if (isFinished) {
    return (
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: background.secondary, gap: sp[6] + 'px' }}>
        <MotionBox
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: sp[5] + 'px' }}
        >
          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={32} color={foreground.successPrimary} />
          <Typography variant="subtitle1" sx={{ fontWeight: weight.semibold, color: text.primary }}>
            {sent.size} réponse{sent.size > 1 ? 's' : ''} envoyée{sent.size > 1 ? 's' : ''}
          </Typography>
          {skipped.size > 0 && (
            <Typography variant="caption" sx={{ color: text.tertiary }}>
              {skipped.size} avis ignoré{skipped.size > 1 ? 's' : ''}
            </Typography>
          )}
          <Button variant="outlined" size="small" onClick={onClose} sx={{ mt: sp[4] + 'px' }}>
            Retour aux avis
          </Button>
        </MotionBox>
      </Box>
    );
  }

  if (!current) return null;

  const city = current.businessName.replace('Dilypse ', '');

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: background.secondary }}>
      {/* Progress bar */}
      <Box sx={{ px: sp[7] + 'px', pt: sp[6] + 'px', pb: sp[4] + 'px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: sp[3] + 'px' }}>
          <Typography variant="subtitle2" sx={{ color: text.primary }}>
            Répondre aux avis
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: sp[4] + 'px' }}>
            <Typography variant="caption" sx={{ color: text.tertiary }}>
              {treatedCount + 1} / {totalCount}
            </Typography>
            <Button
              variant="text" size="small" onClick={onClose}
              startIcon={<HugeiconsIcon icon={MultiplicationSignIcon} size={12} />}
              sx={{ minWidth: 'auto', color: text.tertiary }}
            >
              Quitter
            </Button>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 3, borderRadius: 2,
            bgcolor: border.primary,
            '& .MuiLinearProgress-bar': { borderRadius: 2 },
          }}
        />
      </Box>

      {/* Current review */}
      <Box sx={{
        flex: 1, overflow: 'auto',
        scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' },
      }}>
        <AnimatePresence mode="wait">
          <MotionBox
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Box sx={{ maxWidth: 580, mx: 'auto', px: sp[6] + 'px', pb: sp[7] + 'px', display: 'flex', flexDirection: 'column', gap: sp[4] + 'px' }}>
              {/* Review card */}
              <Box sx={{
                bgcolor: background.primary,
                border: `1px solid ${border.primary}`,
                borderRadius: radius.lg + 'px',
              }}>
                <Box sx={{
                  px: sp[6] + 'px', py: sp[4] + 'px',
                  borderBottom: `1px solid ${border.primary}`,
                  display: 'flex', alignItems: 'center', gap: sp[3] + 'px',
                }}>
                  <Typography variant="caption" sx={{ color: text.tertiary }}>{city}</Typography>
                  <Typography variant="caption" sx={{ color: text.disabled }}>·</Typography>
                  <Typography variant="caption" sx={{ color: text.disabled }}>{current.date}</Typography>
                </Box>

                <Box sx={{ px: sp[6] + 'px', py: sp[6] + 'px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: sp[5] + 'px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: weight.semibold, color: text.primary }}>
                      {current.reviewerName}
                    </Typography>
                    <StarRating rating={current.rating} size={14} />
                  </Box>
                  {current.text ? (
                    <Typography variant="body2" sx={{ color: text.primary, lineHeight: 1.7 }}>
                      {current.text}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ color: text.disabled, fontStyle: 'italic' }}>
                      Aucun commentaire
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Reply editor */}
              <Box sx={{
                bgcolor: background.primary,
                border: `1px solid ${border.primary}`,
                borderRadius: radius.lg + 'px',
                overflow: 'hidden',
              }}>
                <TextField
                  multiline minRows={3} maxRows={6}
                  fullWidth
                  value={replies[current.id] || ''}
                  onChange={(e) => setReplies(prev => ({ ...prev, [current.id]: e.target.value }))}
                  sx={{ '& .MuiOutlinedInput-root': { border: 'none', borderRadius: 0, '& fieldset': { border: 'none' }, fontSize: 14, p: sp[6] + 'px' } }}
                />
                <Box sx={{
                  px: sp[6] + 'px', py: sp[4] + 'px',
                  borderTop: `1px solid ${border.primary}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Button
                    variant="text" size="small" onClick={handleSkip}
                    sx={{ color: text.tertiary }}
                  >
                    Ignorer
                  </Button>
                  <Button
                    variant="contained" size="small" onClick={handleApprove}
                    disabled={!replies[current.id]?.trim()}
                    startIcon={<HugeiconsIcon icon={ArrowRight01Icon} size={14} />}
                  >
                    Approuver et suivant
                  </Button>
                </Box>
              </Box>
            </Box>
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
