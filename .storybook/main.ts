import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["./**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "../dist/manager.js",
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
        controls: false,
        highlight: false,
        measure: false,
        outline: false,
        toolbars: false,
        viewport: false,
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
