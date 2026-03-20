import { Box, Typography } from '@mui/material';
import StarRating from './StarRating';

export default function ReviewListItem({ review, selected, onClick }) {
  const { reviewerName, rating, date, text, businessName, replied } = review;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        px: 2.5,
        py: 1.75,
        cursor: 'pointer',
        transition: 'all 150ms ease',
        bgcolor: selected ? '#F8F8F8' : 'transparent',
        borderLeft: selected ? '2px solid #171717' : '2px solid transparent',
        '&:hover': { bgcolor: selected ? '#F8F8F8' : '#FAFAFA' },
        '&:not(:last-child)': { borderBottom: '1px solid #F5F5F5' },
      }}
    >
      {/* Row 1: name + dot + date */}
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
        <Typography sx={{ fontSize: 11, color: '#BFBFBF', flexShrink: 0, ml: 1 }}>
          {date}
        </Typography>
      </Box>

      {/* Row 2: stars + business */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <StarRating rating={rating} size={12} />
        <Typography sx={{ fontSize: 11, color: '#BFBFBF' }}>
          {businessName}
        </Typography>
      </Box>

      {/* Row 3: preview */}
      {text && (
        <Typography sx={{
          fontSize: 12.5, color: '#858585', lineHeight: 1.5, mt: '2px',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {text}
        </Typography>
      )}
    </Box>
  );
}
