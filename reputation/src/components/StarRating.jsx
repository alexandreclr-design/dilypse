import { Box } from '@mui/material';

function Star({ filled, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#F79009' : '#E0E0E0'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function StarRating({ rating, size = 14 }) {
  return (
    <Box sx={{ display: 'flex', gap: '1px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rating} size={size} />
      ))}
    </Box>
  );
}
