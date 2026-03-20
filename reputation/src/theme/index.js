import { createTheme } from '@mui/material/styles';
import { colors, text, border, radius, typographyTokens } from './tokens';

export default createTheme({
  palette: {
    primary: { main: colors.blue[600] },
    secondary: { main: colors.neutral[900] },
    error: { main: colors.red[600] },
    warning: { main: colors.yellow[600] },
    success: { main: colors.green[600] },
    text: { primary: text.primary, secondary: text.secondary, disabled: text.disabled },
    divider: border.primary,
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
  },
  typography: {
    fontFamily: typographyTokens.family,
    fontSize: 14,
  },
  shape: { borderRadius: radius.md },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: radius.md, fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
  },
});
