import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "./local-preset.js",
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
        backgrounds: false,
        highlight: false,
        measure: false,
        outline: false,
        toolbars: false,
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
