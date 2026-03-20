import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Dilypse Design System',
    brandUrl: '/',

    // Brand
    colorPrimary: '#1570EF',
    colorSecondary: '#1570EF',

    // App shell
    appBg: '#FAFAFA',
    appContentBg: '#FAFAFA',
    appBorderColor: '#EEEEEE',
    appBorderRadius: 8,

    // Typography
    fontBase: '"Inter Variable", "Inter", system-ui, sans-serif',
    fontCode: 'monospace',

    // Text
    textColor: '#171717',
    textInverseColor: '#FFFFFF',

    // Toolbar / nav
    barTextColor: '#4A4A4A',
    barHoverColor: '#1570EF',
    barSelectedColor: '#1570EF',
    barBg: '#FFFFFF',

    // Forms
    inputBg: '#FFFFFF',
    inputBorder: '#E0E0E0',
    inputTextColor: '#171717',
    inputBorderRadius: 8,
  }),

  sidebar: {
    showRoots: true,
  },

  toolbar: {
    title: { hidden: false },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
});
