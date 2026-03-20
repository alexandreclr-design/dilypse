import { Box, Typography } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';

export default function Header({ icon, title, cta }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      px: 3, py: 2, borderBottom: '1px solid #EEEEEE', bgcolor: '#FFFFFF', minHeight: 56,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon && <HugeiconsIcon icon={icon} size={20} color="#858585" />}
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#171717' }}>{title}</Typography>
      </Box>
      {cta && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>{cta}</Box>
      )}
    </Box>
  );
}
