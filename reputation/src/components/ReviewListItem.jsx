import { Box, Typography } from '@mui/material';
import StarRating from './StarRating';
import { text, foreground, background, border, spacing, typographyTokens } from '../theme/tokens';

const sp = spacing;
const { size, weight } = typographyTokens;

export function DateGroupHeader({ label }) {
  return (
    <Box sx={{ px: sp[6] + 'px', py: sp[3] + 'px', borderBottom: `1px solid ${border.primary}` }}>
      <Typography variant="overline" sx={{ color: text.disabled }}>{label}</Typography>
    </Box>
  );
}

export default function ReviewListItem({ review, selected, onClick }) {
  const { reviewerName, rating, date, text: reviewText, businessName, replied } = review;
  const city = businessName.replace('Dilypse ', '');

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex', gap: sp[5] + 'px',
        px: sp[6] + 'px', py: sp[5] + 'px',
        cursor: 'pointer',
        transition: 'background 120ms ease',
        bgcolor: selected ? background.primary : (replied ? background.secondary : background.primary),
        '&:hover': { bgcolor: replied ? background.secondaryHover : background.primary },
        borderBottom: `1px solid ${border.primary}`,
        borderRight: selected ? `2px solid ${border.brand}` : '2px solid transparent',
      }}
    >
      {/* Google icon */}
      <Box sx={{
        width: sp[9], height: sp[9], flexShrink: 0,
        bgcolor: background.secondary, borderRadius: sp[4] + 'px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        mt: '1px',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Row 1: Establishment + dot + date */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: sp[1] + 'px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: sp[3] + 'px', minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{
              fontWeight: replied ? weight.regular : weight.semibold,
              color: text.primary,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {city}
            </Typography>
            {!replied && (
              <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: foreground.errorPrimary, flexShrink: 0 }} />
            )}
          </Box>
          <Typography variant="caption" sx={{ color: text.disabled, flexShrink: 0, ml: sp[3] + 'px' }}>
            {date}
          </Typography>
        </Box>

        {/* Row 2: Preview */}
        {reviewText && (
          <Typography variant="caption" sx={{
            color: replied ? text.tertiary : text.secondary,
            lineHeight: 1.45, mb: sp[2] + 'px', display: 'block',
            overflow: 'hidden', textOverflow: 'ellipsis',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
          }}>
            {reviewText}
          </Typography>
        )}

        {/* Row 3: Stars */}
        <StarRating rating={rating} size={10} />
      </Box>
    </Box>
  );
}
