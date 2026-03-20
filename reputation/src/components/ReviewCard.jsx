import { Box, Typography, Avatar, IconButton, Button, Chip } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  StarIcon, SparklesIcon, MoreVerticalIcon, CheckmarkCircle01Icon,
  Clock01Icon, SentIcon,
} from '@hugeicons/core-free-icons';

function StarRating({ rating }) {
  return (
    <Box sx={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={14}
          color={i <= rating ? '#F79009' : '#E0E0E0'}
        />
      ))}
    </Box>
  );
}

function StatusBadge({ replied }) {
  if (replied) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} color="#039855" />
        <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#039855' }}>
          Répondu
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <HugeiconsIcon icon={Clock01Icon} size={14} color="#A0A0A0" />
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#A0A0A0' }}>
        Non répondu
      </Typography>
    </Box>
  );
}

function GoogleIcon() {
  return (
    <Box sx={{
      width: 20, height: 20, borderRadius: '4px', display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    </Box>
  );
}

export default function ReviewCard({
  reviewerName,
  rating,
  date,
  text,
  businessName,
  businessAddress,
  replied = false,
  replyText,
  replyDate,
  onReplyWithAI,
}) {
  return (
    <Box sx={{
      bgcolor: '#FFFFFF',
      border: '1px solid #F0F0F0',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'border-color 180ms ease',
      '&:hover': { borderColor: '#E0E0E0' },
    }}>
      {/* Header row */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 2.5, pt: 2, pb: 0,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <GoogleIcon />
          <Typography sx={{ fontSize: 12, color: '#6B6B6B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {businessName}
            <Box component="span" sx={{ color: '#A0A0A0', mx: 0.5 }}>·</Box>
            {businessAddress}
          </Typography>
        </Box>
        <StatusBadge replied={replied} />
      </Box>

      {/* Review content */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 2 }}>
        {/* Reviewer + date + stars */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#171717', lineHeight: 1.3, mb: 0.5 }}>
              {reviewerName}
            </Typography>
            <StarRating rating={rating} />
          </Box>
          <Typography sx={{ fontSize: 12, color: '#A0A0A0', flexShrink: 0, ml: 2 }}>
            {date}
          </Typography>
        </Box>

        {/* Review text */}
        {text && (
          <Typography sx={{
            fontSize: 13.5, color: '#4A4A4A', lineHeight: 1.6, mt: 1.5,
          }}>
            {text}
          </Typography>
        )}
      </Box>

      {/* Reply section or CTA */}
      {replied && replyText ? (
        <Box sx={{
          mx: 2.5, mb: 2, p: 2,
          bgcolor: '#FAFAFA', borderRadius: '8px',
          border: '1px solid #F0F0F0',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <HugeiconsIcon icon={SentIcon} size={14} color="#6B6B6B" />
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#4A4A4A' }}>
                Votre réponse
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {replyDate && (
                <Typography sx={{ fontSize: 11, color: '#A0A0A0' }}>
                  {replyDate}
                </Typography>
              )}
              <IconButton size="small" sx={{ p: 0.25 }}>
                <HugeiconsIcon icon={MoreVerticalIcon} size={16} color="#A0A0A0" />
              </IconButton>
            </Box>
          </Box>
          <Typography sx={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6 }}>
            {replyText}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ px: 2.5, pb: 2 }}>
          <Button
            onClick={onReplyWithAI}
            startIcon={<HugeiconsIcon icon={SparklesIcon} size={16} />}
            sx={{
              bgcolor: '#171717',
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 600,
              borderRadius: '8px',
              px: 2,
              py: 0.75,
              textTransform: 'none',
              '&:hover': { bgcolor: '#2A2A2A' },
            }}
          >
            Répondre avec l'IA
          </Button>
        </Box>
      )}
    </Box>
  );
}
