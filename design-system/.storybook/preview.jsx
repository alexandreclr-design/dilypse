import '@fontsource-variable/inter';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from '../src/theme/index.js';

const withMuiTheme = (Story, context) => {
  const noWrapper = context.parameters?.noWrapper === true;

  if (noWrapper) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#FAFAFA',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          p: 4,
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            bgcolor: '#FFFFFF',
            borderRadius: 2,
            border: '1px solid #E4E4E7',
            p: 4,
          }}
        >
          <Story />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [withMuiTheme],
  parameters: {
    actions: { disable: true },
    controls: { disable: false },
    backgrounds: { disable: true },
    layout: 'fullscreen',
    docs: {
      codePanel: false,
      source: {
        type: 'code',
        language: 'jsx',
      },
    },
    toolbar: {
      'storybook/outline': { hidden: true },
      'storybook/measure': { hidden: true },
      'storybook/viewport': { hidden: true },
      'storybook/backgrounds': { hidden: true },
    },
    options: {
      storySort: {
        order: ['Foundations', 'Atoms', 'Molecules', 'Organisms'],
      },
    },
  },
};

export default preview;
