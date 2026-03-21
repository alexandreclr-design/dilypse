// Design tokens — source of truth (dilypse-token.json)

export const colors = {
  neutral: {
    0: '#FFFFFF',
    25: '#FAFAFA',
    50: '#F5F5F5',
    100: '#EEEEEE',
    200: '#E0E0E0',
    300: '#D1D1D1',
    400: '#BFBFBF',
    500: '#A0A0A0',
    600: '#858585',
    700: '#6B6B6B',
    800: '#4A4A4A',
    900: '#2A2A2A',
    950: '#171717',
    975: '#0A0A0A',
  },
  blue: {
    25: '#F5FAFF',
    50: '#EFF8FF',
    100: '#D1E9FF',
    200: '#B2DDFF',
    300: '#84CAFF',
    400: '#53B1FD',
    500: '#2E90FA',
    600: '#1570EF',
    700: '#175CD3',
    800: '#1849A9',
    900: '#194185',
  },
  red: {
    25: '#FFFBFA',
    50: '#FEF3F2',
    100: '#FEE4E2',
    200: '#FECDCA',
    300: '#FDA29B',
    400: '#F97066',
    500: '#F04438',
    600: '#D92D20',
    700: '#B42318',
    800: '#912018',
    900: '#7A271A',
  },
  orange: {
    25: '#FFFAF5',
    50: '#FFF6ED',
    100: '#FFEAD5',
    200: '#FDDCAB',
    300: '#FEB273',
    400: '#FD853A',
    500: '#FB6514',
    600: '#EC4A0A',
    700: '#C4320A',
    800: '#9C2A10',
    900: '#7E2410',
  },
  yellow: {
    25: '#FFFCF5',
    50: '#FFFAEB',
    100: '#FEF0C7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#7A2E0E',
  },
  green: {
    25: '#F6FEF9',
    50: '#ECFDF3',
    100: '#D1FADF',
    200: '#A6F4C5',
    300: '#6CE9A6',
    400: '#32D583',
    500: '#12B76A',
    600: '#039855',
    700: '#027A48',
    800: '#05603A',
    900: '#054F31',
  },
  pink: {
    25: '#FDF2FA',
    50: '#FCE7F6',
    100: '#FCCEEE',
    200: '#FAA7E0',
    300: '#F670C7',
    400: '#EE46BC',
    500: '#DD2590',
    600: '#C11574',
    700: '#9E165F',
    800: '#851651',
    900: '#701643',
  },
  purple: {
    25: '#FCFAFF',
    50: '#F9F5FF',
    100: '#F4EBFF',
    200: '#E9D7FE',
    300: '#D6BBFB',
    400: '#B692F6',
    500: '#9E77ED',
    600: '#7F56D9',
    700: '#6941C6',
    800: '#53389E',
    900: '#42307D',
  },
};

// Semantic text tokens
export const text = {
  primary: '#171717',
  secondary: '#4A4A4A',
  tertiary: '#858585',
  white: '#FFFFFF',
  disabled: '#BFBFBF',
  placeholder: '#A0A0A0',
  brandPrimary: '#175CD3',
  brandSecondary: '#1570EF',
  error: '#D92D20',
  warning: '#DC6803',
  success: '#039855',
};

// Semantic foreground tokens (icons, labels)
export const foreground = {
  primary: '#171717',
  secondary: '#4A4A4A',
  tertiary: '#858585',
  white: '#FFFFFF',
  disabled: '#BFBFBF',
  brandPrimary: '#1570EF',
  brandSecondary: '#2E90FA',
  errorPrimary: '#D92D20',
  errorSecondary: '#F97066',
  warningPrimary: '#DC6803',
  warningSecondary: '#FDB022',
  successPrimary: '#039855',
  successSecondary: '#32D583',
};

// Semantic background tokens
export const background = {
  primary: '#FFFFFF',
  primaryHover: '#FAFAFA',
  primarySolid: '#0A0A0A',
  secondary: '#FAFAFA',
  secondaryHover: '#F5F5F5',
  tertiary: '#EEEEEE',
  disabled: '#FAFAFA',
  overlay: '#000000',
  // Brand
  brandLight: '#EFF8FF',       // blue[50]  — light tint for chips, badges, active states
  brandLightHover: '#D1E9FF',  // blue[100] — hover on light brand backgrounds
  brandSolid: '#1570EF',
  brandSolidHover: '#175CD3',
  // Semantic status backgrounds
  errorLight: '#FEF3F2',       // red[50]   — light tint for error badges
  errorSolid: '#D92D20',
  warningLight: '#FFFAEB',     // yellow[50]
  warningSolid: '#DC6803',
  successLight: '#ECFDF3',     // green[50] — light tint for success badges
  successSolid: '#039855',
};

// Semantic border tokens
export const border = {
  primary: '#EEEEEE',
  secondary: '#E0E0E0',
  tertiary: '#D1D1D1',
  disabled: '#D1D1D1',
  brand: '#2E90FA',
  brandLight: '#B2DDFF',       // blue[200] — subtle brand border for chips, badges
  error: '#F04438',
  errorLight: '#FECDCA',       // red[200]
  success: '#12B76A',
  successLight: '#A6F4C5',     // green[200]
};

export const radius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 999,
};

export const spacing = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 12,
  6: 16,
  7: 20,
  8: 24,
  9: 32,
  10: 40,
  11: 48,
  12: 56,
  13: 64,
  14: 72,
  15: 80,
  16: 88,
  17: 96,
  18: 104,
  19: 112,
  20: 120,
  21: 128,
  22: 144,
  23: 160,
};

export const typographyTokens = {
  family: '"Inter Variable", "Inter", system-ui, sans-serif',
  size: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 32, '4xl': 40, '5xl': 48 },
  lineHeight: { xs: 16, sm: 20, md: 24, lg: 28, xl: 32, '2xl': 40, '3xl': 48, '4xl': 56 },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
};
