import { Box, Typography } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, CheckmarkCircle01Icon, Clock01Icon } from '@hugeicons/core-free-icons';

function Stars({ rating }) {
  return (
    <Box sx={{ display: 'flex', gap: '1px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <HugeiconsIcon key={i} icon={StarIcon} size={11} color={i <= rating ? '#F79009' : '#E0E0E0'} />
      ))}
    </Box>
  );
}

export default function ReviewListItem({ review, selected, onClick }) {
  const { reviewerName, rating, date, text, businessName, replied } = review;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        px: 2,
        py: 1.5,
        cursor: 'pointer',
        transition: 'all 150ms ease',
        bgcolor: selected ? '#F5F5F5' : 'transparent',
        borderLeft: selected ? '2px solid #171717' : '2px solid transparent',
        '&:hover': { bgcolor: selected ? '#F5F5F5' : '#FAFAFA' },
        borderBottom: '1px solid #F5F5F5',
      }}
    >
      {/* Row 1: name + date */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <Typography sx={{
            fontSize: 13.5, fontWeight: selected ? 600 : 500, color: '#171717',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {reviewerName}
          </Typography>
          {!replied && (
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#1570EF', flexShrink: 0 }} />
          )}
        </Box>
        <Typography sx={{ fontSize: 11, color: '#A0A0A0', flexShrink: 0, ml: 1 }}>
          {date}
        </Typography>
      </Box>

      {/* Row 2: stars + business */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Stars rating={rating} />
        <Typography sx={{ fontSize: 11, color: '#A0A0A0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {businessName}
        </Typography>
      </Box>

      {/* Row 3: preview text */}
      {text && (
        <Typography sx={{
          fontSize: 12.5, color: '#6B6B6B', lineHeight: 1.4,
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {text}
        </Typography>
      )}
    </Box>
  );
}
