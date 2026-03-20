/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: false,
  },
  features: {
    whatsNewNotifications: false,
  },
  managerHead: (head) => `${head}
  <style>
    /* Hide "About your Storybook" and "Get started" from the sidebar */
    button[aria-label="About your Storybook"],
    a[aria-label="About your Storybook"],
    [title="About your Storybook"],
    button[aria-label="Get started"],
    a[aria-label="Get started"],
    [title="Get started with Storybook"],
    [data-item-id="about"],
    [data-item-id="onboarding"],
    [data-item-id="getting-started"],
    [id*="getting-started"],
    [id*="onboarding"],
    a[href*="onboarding"],
    a[href*="getting-started"] { display: none !important; }

    /* Hide bottom toolbar buttons (Get started, What's new, etc.) */
    #storybook-panel-root ~ * { display: none !important; }
    [data-role="toolbar"] a[href*="start"],
    [data-role="toolbar"] button[title*="started"],
    [data-role="toolbar"] button[title*="Started"],
    [data-role="toolbar"] a[title*="started"],
    button[aria-label*="started" i],
    a[aria-label*="started" i],
    button[title*="started" i],
    a[title*="started" i] { display: none !important; }

    /* Remove sidebar scrollbar */
    .os-scrollbar { display: none !important; }
    #storybook-explorer-tree { scrollbar-width: none; overflow-y: auto; }
    #storybook-explorer-tree::-webkit-scrollbar { display: none; width: 0; }
  </style>`,
};

export default config;
