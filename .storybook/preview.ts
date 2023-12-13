import type { Preview } from "@storybook/react";
import * as VibeComponents from "monday-ui-react-core";
import * as VibeIcons from "monday-ui-react-core/icons";

const preview: Preview = {
  parameters: {
    playground: {
      storyId: "playground",
      components: { ...VibeComponents, VibeIcons },
    },
  },
};

export default preview;
