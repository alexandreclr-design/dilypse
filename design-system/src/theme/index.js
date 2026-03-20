import { createTheme } from '@mui/material/styles';
import {
  colors,
  text,
  foreground,
  background,
  border,
  radius,
  spacing,
  typographyTokens,
} from './tokens.js';

const { family, size, lineHeight, weight } = typographyTokens;

// ─── Focus ring — shadcn uses ring-1 (1px) not ring-2 ───────────────────────
const ring = (color) => `0 0 0 1px ${color}`;
const primaryRing = ring(colors.blue[500]);
const errorRing = ring(colors.red[500]);

// ─── Spacing helpers (from tokens) ────────────────────────────────────────────
const sp = spacing; // sp[4]=8, sp[5]=12, sp[6]=16, sp[7]=20, sp[8]=24, sp[9]=32

export const theme = createTheme({

  // ─── Palette ──────────────────────────────────────────────────────────────────

  palette: {
    mode: 'light',
    primary: {
      light:        colors.blue[400],
      main:         colors.blue[600],
      dark:         colors.blue[700],
      contrastText: text.white,
    },
    secondary: {
      light:        colors.neutral[600],
      main:         colors.neutral[800],
      dark:         colors.neutral[900],
      contrastText: text.white,
    },
    error: {
      light:        colors.red[400],
      main:         colors.red[600],
      dark:         colors.red[700],
      contrastText: text.white,
    },
    warning: {
      light:        colors.yellow[400],
      main:         colors.yellow[600],
      dark:         colors.yellow[700],
      contrastText: text.white,
    },
    info: {
      light:        colors.blue[300],
      main:         colors.blue[500],
      dark:         colors.blue[700],
      contrastText: text.white,
    },
    success: {
      light:        colors.green[400],
      main:         colors.green[600],
      dark:         colors.green[700],
      contrastText: text.white,
    },
    background: {
      default: background.primary,
      paper:   background.primary,
    },
    text: {
      primary:   text.primary,
      secondary: text.secondary,
      disabled:  text.disabled,
    },
    divider: border.primary,
  },

  // ─── Typography ───────────────────────────────────────────────────────────────

  typography: {
    fontFamily:        family,
    htmlFontSize:      16,
    fontSize:          size.sm,
    fontWeightLight:   weight.regular,
    fontWeightRegular: weight.regular,
    fontWeightMedium:  weight.medium,
    fontWeightBold:    weight.bold,

    h1: { fontSize: `${size['5xl']}px`, lineHeight: `${lineHeight['4xl']}px`, fontWeight: weight.semibold, letterSpacing: '-0.025em' },
    h2: { fontSize: `${size['4xl']}px`, lineHeight: `${lineHeight['3xl']}px`, fontWeight: weight.semibold, letterSpacing: '-0.025em' },
    h3: { fontSize: `${size['3xl']}px`, lineHeight: `${lineHeight['2xl']}px`, fontWeight: weight.semibold, letterSpacing: '-0.01em' },
    h4: { fontSize: `${size['2xl']}px`, lineHeight: `${lineHeight.xl}px`,     fontWeight: weight.semibold },
    h5: { fontSize: `${size.xl}px`,     lineHeight: `${lineHeight.lg}px`,     fontWeight: weight.semibold },
    h6: { fontSize: `${size.lg}px`,     lineHeight: `${lineHeight.lg}px`,     fontWeight: weight.semibold },

    subtitle1: { fontSize: `${size.md}px`, lineHeight: `${lineHeight.md}px`, fontWeight: weight.medium  },
    subtitle2: { fontSize: `${size.sm}px`, lineHeight: `${lineHeight.sm}px`, fontWeight: weight.medium  },
    body1:     { fontSize: `${size.md}px`, lineHeight: `${lineHeight.md}px`, fontWeight: weight.regular },
    body2:     { fontSize: `${size.sm}px`, lineHeight: `${lineHeight.sm}px`, fontWeight: weight.regular },

    button:   { fontSize: `${size.sm}px`, lineHeight: `${lineHeight.sm}px`, fontWeight: weight.medium, textTransform: 'none', letterSpacing: '0' },
    caption:  { fontSize: `${size.xs}px`, lineHeight: `${lineHeight.xs}px`, fontWeight: weight.regular },
    overline: { fontSize: `${size.xs}px`, lineHeight: `${lineHeight.xs}px`, fontWeight: weight.medium, textTransform: 'uppercase', letterSpacing: '0.06em' },
  },

  // ─── Shape ────────────────────────────────────────────────────────────────────

  shape: { borderRadius: radius.lg },

  // ─── Shadows ──────────────────────────────────────────────────────────────────

  shadows: [
    'none',
    `0 1px ${sp[1]}px rgba(0,0,0,0.04)`,
    `0 1px ${sp[2]}px rgba(0,0,0,0.06), 0 1px ${sp[1]}px rgba(0,0,0,0.04)`,
    `0 ${sp[2]}px ${sp[3]}px rgba(0,0,0,0.05), 0 ${sp[1]}px ${sp[2]}px rgba(0,0,0,0.03)`,
    `0 ${sp[4]}px ${sp[6]}px rgba(0,0,0,0.06), 0 ${sp[2]}px ${sp[4]}px rgba(0,0,0,0.03)`,
    `0 ${sp[6]}px ${sp[9]}px rgba(0,0,0,0.06), 0 ${sp[4]}px ${sp[6]}px rgba(0,0,0,0.03)`,
    ...Array(19).fill(`0 ${sp[6]}px ${sp[9]}px rgba(0,0,0,0.06), 0 ${sp[4]}px ${sp[6]}px rgba(0,0,0,0.03)`),
  ],

  // ─── Components ───────────────────────────────────────────────────────────────

  components: {

    // ── Button — h-36 / h-32 / h-40 (shadcn) ───────────────────────────────

    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius:  radius.lg,
          textTransform: 'none',
          fontWeight:    weight.medium,
          boxShadow:     'none',
          transition:    'background-color 150ms ease, border-color 150ms ease, opacity 150ms ease',
          '&:hover':         { boxShadow: 'none' },
          '&:focus-visible': {
            outline:       `2px solid ${colors.blue[500]}`,
            outlineOffset: '2px',
            boxShadow:     'none',
          },
          '&:active':        { transform: 'scale(0.98)' },
        },
        containedPrimary: {
          backgroundColor: colors.blue[600],
          '&:hover': { backgroundColor: colors.blue[700] },
        },
        containedSecondary: {
          backgroundColor: colors.neutral[900],
          '&:hover': { backgroundColor: colors.neutral[950] },
        },
        containedError: {
          '&:hover':         { backgroundColor: colors.red[700] },
          '&:focus-visible': { outline: `2px solid ${colors.red[500]}`, outlineOffset: '2px' },
        },
        outlinedPrimary: {
          borderColor: border.secondary,
          color:       text.primary,
          '&:hover': { backgroundColor: background.secondaryHover, borderColor: border.tertiary },
        },
        outlinedSecondary: {
          borderColor: border.secondary,
          '&:hover': { backgroundColor: background.secondaryHover },
        },
        textPrimary: {
          '&:hover': { backgroundColor: background.secondaryHover },
        },
        sizeSmall:  { height: sp[9],  padding: `0 ${sp[5]}px`, fontSize: `${size.sm}px` }, // 32px
        sizeMedium: { height: 36,      padding: `0 ${sp[6]}px`, fontSize: `${size.sm}px` }, // 36px
        sizeLarge:  { height: sp[10],  padding: `0 ${sp[7]}px`, fontSize: `${size.sm}px` }, // 40px
      },
    },

    // ── IconButton ──────────────────────────────────────────────────────────

    MuiIconButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          transition:   'background-color 150ms ease',
          '&:hover':         { backgroundColor: background.secondaryHover },
          '&:focus-visible': { outline: `2px solid ${colors.blue[500]}`, outlineOffset: '2px', boxShadow: 'none' },
        },
        sizeSmall:  { width: sp[9],  height: sp[9]  }, // 32px
        sizeMedium: { width: 36,     height: 36     },
        sizeLarge:  { width: sp[10], height: sp[10] },
      },
    },

    // ── Input — same height as button ───────────────────────────────────────

    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color:      text.tertiary,
          fontWeight: weight.regular,
          fontSize:   `${size.sm}px`,
          '&.Mui-focused': { color: text.secondary },
          '&.Mui-error':   { color: foreground.errorPrimary },
        },
        outlined: {
          // Align label with our custom input padding (12px 16px for medium)
          transform:         `translate(${sp[6]}px, ${sp[5]}px) scale(1)`,
          '&.MuiInputLabel-shrink': {
            transform:       `translate(14px, -9px) scale(0.75)`,
          },
        },
        sizeSmall: {
          transform:         `translate(${sp[5]}px, ${sp[4]}px) scale(1)`,
          '&.MuiInputLabel-shrink': {
            transform:       `translate(14px, -9px) scale(0.75)`,
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize:    `${size.xs}px`,
          marginTop:   sp[2],
          marginLeft:  0,
          color:       text.tertiary,
          '&.Mui-error': { color: foreground.errorPrimary },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius:    radius.lg,
          backgroundColor: background.primary,
          fontSize:        `${size.sm}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: border.secondary,
            borderWidth: '1px !important',
          },
          '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
            borderColor: border.tertiary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${colors.blue[400]} !important`,
          },
          '&.Mui-focused': {
            boxShadow: 'none',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: `${colors.red[400]} !important`,
          },
          '&.Mui-error.Mui-focused': { boxShadow: 'none' },
          '&.Mui-disabled': {
            backgroundColor: background.secondary,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: `${border.disabled} !important` },
          },
          '& input::placeholder, & textarea::placeholder': {
            color:   text.placeholder,
            opacity: 1,
          },
        },
        inputSizeSmall: { padding: `${sp[4]}px ${sp[5]}px`, height: 'auto' },
        input:          { padding: `${sp[5]}px ${sp[6]}px` },
      },
    },

    MuiSelect: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        select: {
          padding:  `${sp[5]}px ${sp[6]}px`,
          '&:focus': { backgroundColor: 'transparent' },
          '&.MuiSelect-outlined.MuiInputBase-inputSizeSmall': {
            padding: `${sp[4]}px ${sp[5]}px`,
          },
        },
        icon: { color: text.tertiary, fontSize: 20, right: sp[5] },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow:       `0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`,
          border:          `1px solid ${border.primary}`,
          borderRadius:    radius.lg,
          marginTop:       sp[1],
          backgroundColor: background.primary,
        },
        listbox: {
          padding: sp[2],
          '& .MuiAutocomplete-option': {
            borderRadius:  radius.sm,
            fontSize:      `${size.sm}px`,
            padding:       `${sp[2]}px ${sp[4]}px`,
            minHeight:     sp[9],
            '&[aria-selected="true"]': {
              backgroundColor: colors.blue[50],
              color:           colors.blue[700],
              fontWeight:      weight.medium,
            },
            '&.Mui-focused': {
              backgroundColor: background.secondaryHover,
            },
          },
        },
        inputRoot: {
          '&.MuiOutlinedInput-root': {
            padding: `${sp[3]}px ${sp[5]}px`,
            '& .MuiAutocomplete-input': {
              padding: `${sp[2]}px ${sp[1]}px`,
            },
          },
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow:       `0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`,
          border:          `1px solid ${border.primary}`,
          borderRadius:    radius.lg,
          marginTop:       sp[1],
          backgroundColor: background.primary,
        },
      },
    },

    // ── Checkbox — rounded square ───────────────────────────────────────────

    MuiCheckbox: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          padding:    sp[3],
          color:      border.tertiary,
          '&:hover':            { backgroundColor: 'transparent', color: text.tertiary },
          '&.Mui-focusVisible': { boxShadow: primaryRing, borderRadius: radius.xs },
          '&.Mui-checked':      { color: colors.blue[600] },
        },
      },
    },

    // ── Radio ───────────────────────────────────────────────────────────────

    MuiRadio: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          padding:    sp[3],
          color:      border.tertiary,
          '&:hover':            { backgroundColor: 'transparent', color: text.tertiary },
          '&.Mui-focusVisible': { boxShadow: primaryRing, borderRadius: radius.full },
          '&.Mui-checked':      { color: colors.blue[600] },
        },
      },
    },

    // ── Switch — 44×24 root, 20 thumb ────────────────────────────────────

    MuiSwitch: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          width:   44,
          height:  24,
          padding: 0,
        },
        switchBase: {
          padding: 2,
          '&.Mui-checked': {
            transform:   'translateX(20px)',
            color:       background.primary,
            '& + .MuiSwitch-track': { opacity: 1, backgroundColor: colors.blue[600], border: 'none' },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': { boxShadow: primaryRing },
          '&.Mui-disabled': {
            opacity: 0.6,
            '& + .MuiSwitch-track': { opacity: 0.4 },
          },
        },
        thumb: {
          width:      20,
          height:     20,
          boxShadow:  '0 1px 3px rgba(0,0,0,0.12)',
          backgroundColor: background.primary,
        },
        track: {
          borderRadius: 12,
          opacity:      1,
          backgroundColor: colors.neutral[300],
          border:       `1px solid ${border.secondary}`,
          transition:   'background-color 200ms ease, border-color 200ms ease',
        },
      },
    },

    // ── Card — outlined, no shadow ──────────────────────────────────────────

    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          borderRadius:    radius.lg,
          border:          `1px solid ${border.primary}`,
          backgroundColor: background.primary,
          boxShadow:       'none',
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root:      { padding: `${sp[7]}px ${sp[7]}px ${sp[4]}px` },
        title:     { fontWeight: weight.semibold, fontSize: `${size.md}px` },
        subheader: { fontSize: `${size.sm}px`, color: text.secondary },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: `${sp[4]}px ${sp[7]}px ${sp[7]}px`,
          '&:last-child': { paddingBottom: sp[7] },
        },
      },
    },

    MuiCardActions: {
      styleOverrides: {
        root: { padding: `${sp[4]}px ${sp[7]}px ${sp[7]}px`, gap: sp[4] },
      },
    },

    // ── Paper — menus, popovers ─────────────────────────────────────────────

    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: radius.lg },
        elevation1: {
          boxShadow: `0 ${sp[2]}px ${sp[3]}px rgba(0,0,0,0.05), 0 ${sp[1]}px ${sp[2]}px rgba(0,0,0,0.03)`,
          border:    `1px solid ${border.primary}`,
        },
        elevation2: {
          boxShadow: `0 ${sp[2]}px ${sp[4]}px rgba(0,0,0,0.06), 0 ${sp[1]}px ${sp[2]}px rgba(0,0,0,0.03)`,
          border:    `1px solid ${border.primary}`,
        },
        elevation3: {
          boxShadow: `0 ${sp[4]}px ${sp[6]}px rgba(0,0,0,0.06), 0 ${sp[2]}px ${sp[4]}px rgba(0,0,0,0.03)`,
          border:    `1px solid ${border.primary}`,
        },
      },
    },

    // ── Chip — pill, compact ────────────────────────────────────────────────

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: radius.full,
          fontWeight:   weight.medium,
          fontSize:     `${size.xs}px`,
          height:       sp[8], // 24px
          transition:   'background-color 150ms ease',
        },
        sizeSmall: { height: sp[7], fontSize: `${size.xs}px` }, // 20px
        label:     { padding: `0 ${sp[5]}px` },
        labelSmall: { padding: `0 ${sp[4]}px` },
      },
    },

    // ── Tooltip ─────────────────────────────────────────────────────────────

    MuiTooltip: {
      defaultProps: { arrow: true, placement: 'top' },
      styleOverrides: {
        tooltip: {
          borderRadius:    radius.sm,
          fontSize:        `${size.xs}px`,
          fontWeight:      weight.medium,
          backgroundColor: colors.neutral[900],
          padding:         `${sp[3]}px ${sp[5]}px`,
        },
        arrow: { color: colors.neutral[900] },
      },
    },

    // ── Alert — border accent ───────────────────────────────────────────────

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          padding:      `${sp[4]}px ${sp[5]}px`,
          fontSize:     `${size.sm}px`,
          '&.MuiAlert-standardSuccess': { border: `1px solid ${colors.green[200]}`, backgroundColor: colors.green[25] },
          '&.MuiAlert-standardInfo':    { border: `1px solid ${colors.blue[200]}`,  backgroundColor: colors.blue[25] },
          '&.MuiAlert-standardWarning': { border: `1px solid ${colors.yellow[200]}`, backgroundColor: colors.yellow[25] },
          '&.MuiAlert-standardError':   { border: `1px solid ${colors.red[200]}`,   backgroundColor: colors.red[25] },
          '&.MuiAlert-outlinedSuccess, &.MuiAlert-outlinedInfo, &.MuiAlert-outlinedWarning, &.MuiAlert-outlinedError': {
            backgroundColor: background.primary,
          },
        },
        icon:    { opacity: 0.85, padding: `${sp[1]}px 0 0` },
        message: { padding: `${sp[1]}px 0` },
      },
    },

    // ── Tabs ────────────────────────────────────────────────────────────────

    MuiTabs: {
      styleOverrides: {
        indicator: { height: 2 },
        root:      { minHeight: 36 },
      },
    },

    MuiTab: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight:    weight.medium,
          fontSize:      `${size.sm}px`,
          minHeight:     36,
          padding:       `${sp[4]}px ${sp[6]}px`,
          '&.Mui-selected': { fontWeight: weight.semibold },
        },
      },
    },

    // ── ToggleButton (SegmentedControl) ─────────────────────────────────────

    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: 0,
          '& .MuiToggleButtonGroup-grouped': {
            border: `1px solid ${border.secondary}`,
            '&.Mui-disabled': { border: `1px solid ${border.disabled}` },
          },
        },
      },
    },

    MuiToggleButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight:    weight.medium,
          fontSize:      `${size.sm}px`,
          padding:       `${sp[3]}px ${sp[6]}px`,
          transition:    'background-color 150ms ease, color 150ms ease',
          '&.Mui-selected': {
            backgroundColor: background.primary,
            fontWeight:      weight.semibold,
            boxShadow:       `0 1px ${sp[1]}px rgba(0,0,0,0.06)`,
            '&:hover': { backgroundColor: background.primary },
          },
          '&:hover': { backgroundColor: background.secondaryHover },
        },
        sizeSmall:  { height: sp[9], padding: `0 ${sp[5]}px` },  // 32px
        sizeMedium: { height: 36,    padding: `0 ${sp[6]}px` },
        sizeLarge:  { height: sp[10], padding: `0 ${sp[7]}px` },
      },
    },

    // ── Menu ────────────────────────────────────────────────────────────────

    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow:    `0 ${sp[2]}px ${sp[4]}px rgba(0,0,0,0.06), 0 ${sp[1]}px ${sp[2]}px rgba(0,0,0,0.03)`,
          border:       `1px solid ${border.primary}`,
          borderRadius: radius.lg,
          padding:      sp[2],
        },
      },
    },

    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontSize:        `${size.xs}px`,
          fontWeight:      weight.semibold,
          color:           text.tertiary,
          textTransform:   'uppercase',
          letterSpacing:   '0.04em',
          lineHeight:      '32px',
          padding:         `0 ${sp[4]}px`,
          backgroundColor: 'transparent',
        },
      },
    },

    MuiMenuItem: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: radius.sm,
          fontSize:     `${size.sm}px`,
          padding:      `${sp[2]}px ${sp[4]}px`,
          minHeight:    sp[9],
          transition:   'background-color 100ms ease',
          '&:hover':      { backgroundColor: background.secondaryHover },
          '&.Mui-selected': {
            backgroundColor: colors.blue[50],
            fontWeight:      weight.medium,
            color:           colors.blue[700],
            '&:hover': { backgroundColor: colors.blue[100] },
          },
          '&:focus-visible': { backgroundColor: background.secondaryHover, outline: 'none' },
        },
      },
    },

    // ── Accordion ───────────────────────────────────────────────────────────

    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0 },
      styleOverrides: {
        root: {
          border:       `1px solid ${border.primary}`,
          boxShadow:    'none',
          borderRadius: `${radius.lg}px !important`,
          '&:before':   { display: 'none' },
          '& + &':      { marginTop: sp[4] },
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontWeight:  weight.medium,
          fontSize:    `${size.sm}px`,
          minHeight:   sp[11], // 48px
          padding:     `0 ${sp[6]}px`,
          transition:  'background-color 150ms ease',
          '&:hover':   { backgroundColor: background.secondaryHover },
          '&.Mui-expanded': { minHeight: sp[11] },
        },
        content: {
          margin: `${sp[5]}px 0`,
          '&.Mui-expanded': { margin: `${sp[5]}px 0` },
        },
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding:   `0 ${sp[6]}px ${sp[6]}px`,
          fontSize:  `${size.sm}px`,
          color:     text.secondary,
          borderTop: `1px solid ${border.primary}`,
        },
      },
    },

    // ── Dialog ──────────────────────────────────────────────────────────────

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: radius.lg,
          border:       `1px solid ${border.primary}`,
          boxShadow:    `0 ${sp[6]}px ${sp[9]}px rgba(0,0,0,0.08), 0 ${sp[4]}px ${sp[6]}px rgba(0,0,0,0.04)`,
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: weight.semibold,
          fontSize:   `${size.lg}px`,
          padding:    `${sp[7]}px ${sp[8]}px ${sp[5]}px`,
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: { padding: `${sp[4]}px ${sp[8]}px ${sp[6]}px` },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: { padding: `${sp[5]}px ${sp[8]}px ${sp[7]}px`, gap: sp[4] },
      },
    },

    // ── Table ───────────────────────────────────────────────────────────────

    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight:      weight.medium,
            fontSize:        `${size.xs}px`,
            textTransform:   'uppercase',
            letterSpacing:   '0.04em',
            color:           text.tertiary,
            backgroundColor: background.secondary,
            borderBottom:    `1px solid ${border.primary}`,
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 100ms ease',
          '&:hover': { backgroundColor: background.secondaryHover },
          '&.MuiTableRow-head:hover': { backgroundColor: 'transparent' },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: border.primary,
          fontSize:    `${size.sm}px`,
          padding:     `${sp[5]}px ${sp[6]}px`,
        },
      },
    },

    // ── Divider ─────────────────────────────────────────────────────────────

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: border.primary },
      },
    },

    // ── Switch ──────────────────────────────────────────────────────────────

    // (defined above in the Checkbox/Radio section)

    // ── Drawer ──────────────────────────────────────────────────────────────

    MuiDrawer: {
      styleOverrides: {
        paper: {
          border:    `1px solid ${border.primary}`,
          boxShadow: 'none',
        },
      },
    },

    // ── Pagination ──────────────────────────────────────────────────────────

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          fontSize:     `${size.sm}px`,
          fontWeight:   weight.medium,
          minWidth:     sp[9],  // 32px
          height:       sp[9],
          '&.Mui-selected': {
            backgroundColor: colors.blue[600],
            color:           text.white,
            '&:hover': { backgroundColor: colors.blue[700] },
          },
          '&:hover': { backgroundColor: background.secondaryHover },
        },
      },
    },

    // ── List ────────────────────────────────────────────────────────────────

    MuiList: {
      styleOverrides: {
        root: { padding: sp[2] },
      },
    },

    MuiListItemButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          padding:      `${sp[3]}px ${sp[5]}px`,
          transition:   'background-color 100ms ease',
          '&:hover': { backgroundColor: background.secondaryHover },
          '&.Mui-selected': {
            backgroundColor: colors.blue[25],
            '&:hover': { backgroundColor: colors.blue[50] },
          },
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary:   { fontSize: `${size.sm}px`, fontWeight: weight.medium },
        secondary: { fontSize: `${size.xs}px`, color: text.tertiary },
      },
    },

    // ── Avatar ──────────────────────────────────────────────────────────────

    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize:   `${size.sm}px`,
          fontWeight: weight.semibold,
          width:      36,     // MD default
          height:     36,
          border:     `2px solid ${background.primary}`,
        },
        rounded: { borderRadius: radius.md },
      },
    },

    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          '& .MuiAvatar-root': {
            border:   `2px solid ${background.primary}`,
            width:    36,
            height:   36,
            fontSize: `${size.xs}px`,
          },
        },
      },
    },

    // ── Skeleton ────────────────────────────────────────────────────────────

    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius:    radius.lg,
          backgroundColor: background.tertiary,
        },
        rounded: { borderRadius: radius.lg },
      },
    },

    // ── Snackbar ────────────────────────────────────────────────────────────

    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          fontSize:     `${size.sm}px`,
          fontWeight:   weight.medium,
          padding:      `${sp[3]}px ${sp[6]}px`,
          boxShadow:    `0 ${sp[2]}px ${sp[4]}px rgba(0,0,0,0.06), 0 ${sp[1]}px ${sp[2]}px rgba(0,0,0,0.03)`,
        },
      },
    },

    // ── Stepper ─────────────────────────────────────────────────────────────

    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize:     `${size.sm}px`,
          fontWeight:   weight.medium,
          '&.Mui-active':    { fontWeight: weight.semibold },
          '&.Mui-completed': { fontWeight: weight.medium, color: text.secondary },
        },
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          color:          border.secondary,
          '&.Mui-active':    { color: colors.blue[600] },
          '&.Mui-completed': { color: colors.green[600] },
        },
      },
    },

    // ── Link ────────────────────────────────────────────────────────────────

    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color:      foreground.brandPrimary,
          fontWeight: weight.medium,
          '&:focus-visible': { outline: `2px solid ${colors.blue[500]}`, outlineOffset: '2px', boxShadow: 'none', borderRadius: radius.xs },
        },
      },
    },

    // ── Breadcrumbs ─────────────────────────────────────────────────────────

    MuiBreadcrumbs: {
      styleOverrides: {
        separator: { color: text.disabled },
        li:        { fontSize: `${size.sm}px` },
      },
    },

    // ── CssBaseline ─────────────────────────────────────────────────────────

    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': { boxSizing: 'border-box' },
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
  },
});
