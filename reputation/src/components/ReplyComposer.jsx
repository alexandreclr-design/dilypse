import { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { SparklesIcon, SentIcon } from '@hugeicons/core-free-icons';
import { text, background, border, spacing, radius } from '../theme/tokens';

const sp = spacing;
const MotionBox = motion.create(Box);

const REPLIES = {
  5: 'Merci beaucoup pour votre avis 5 étoiles ! Votre satisfaction est notre priorité et nous sommes ravis que votre expérience ait été à la hauteur de vos attentes.',
  4: 'Merci pour votre retour positif ! Nous sommes contents que votre expérience ait été agréable. Nous travaillons continuellement à nous améliorer.',
  3: 'Merci pour votre avis. Nous prenons en compte vos remarques et travaillons activement à améliorer nos services.',
  2: 'Nous sommes désolés que votre expérience n\'ait pas été à la hauteur. Votre retour est précieux et nous allons nous améliorer.',
  1: 'Nous sommes sincèrement désolés pour cette expérience négative. Notre équipe va vous contacter directement.',
};

export default function ReplyComposer({ review, onSend }) {
  const [reply, setReply] = useState('');
  const [generating, setGenerating] = useState(false);
  const ref = useRef(null);

  useEffect(() => { setReply(''); setGenerating(false); }, [review.id]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setReply(REPLIES[review.rating] || REPLIES[5]);
      setGenerating(false);
      setTimeout(() => ref.current?.focus(), 50);
    }, 800);
  };

  const handleSend = () => { if (reply.trim()) onSend?.(reply); };

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'g') { e.preventDefault(); if (!generating) handleGenerate(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); handleSend(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <Box sx={{
      bgcolor: background.primary,
      border: `1px solid ${border.primary}`,
      borderRadius: radius.lg + 'px',
      overflow: 'hidden',
    }}>
      <TextField
        inputRef={ref}
        multiline minRows={3} maxRows={8}
        placeholder="Écrivez votre réponse ou générez-la avec l'IA..."
        fullWidth
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        sx={{ '& .MuiOutlinedInput-root': { border: 'none', borderRadius: 0, '& fieldset': { border: 'none' }, fontSize: 14, p: sp[7] + 'px' } }}
      />
      <Box sx={{
        px: sp[6] + 'px', py: sp[4] + 'px', borderTop: `1px solid ${border.primary}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: sp[3] + 'px' }}>
          <Button variant="contained" color="secondary" size="small"
            startIcon={<HugeiconsIcon icon={SparklesIcon} size={14} />}
            onClick={handleGenerate} disabled={generating}
          >
            {generating ? 'Génération...' : 'Générer avec l\'IA'}
          </Button>
          <Typography variant="caption" sx={{ color: text.disabled }}>⌘G</Typography>
        </Box>
        <AnimatePresence>
          {reply.trim() && (
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15 }}
              sx={{ display: 'flex', alignItems: 'center', gap: sp[3] + 'px' }}
            >
              <Typography variant="caption" sx={{ color: text.disabled }}>⌘↵</Typography>
              <Button variant="contained" size="small"
                startIcon={<HugeiconsIcon icon={SentIcon} size={14} />} onClick={handleSend}
              >
                Envoyer
              </Button>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
