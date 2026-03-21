import { Box, Typography } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { border, foreground, text, spacing } from '../theme/tokens';

const sp = spacing;

export default function Header({ icon, title, cta }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      px: sp[8] + 'px', py: sp[6] + 'px',
      borderBottom: `1px solid ${border.primary}`,
      minHeight: 56,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: sp[4] + 'px' }}>
        {icon && <HugeiconsIcon icon={icon} size={20} color={foreground.tertiary} />}
        <Typography variant="subtitle1" sx={{ color: text.primary, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      {cta && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: sp[5] + 'px' }}>
          {cta}
        </Box>
      )}
    </Box>
  );
}
