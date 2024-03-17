import type { Preview } from "@storybook/react";
import * as VibeComponents from "monday-ui-react-core";
import * as VibeNext from "monday-ui-react-core/next";
import * as VibeIcons from "monday-ui-react-core/icons";
import reactDocgenOutput from "./react-docgen-output-example.json";
import { generateAutocompletion } from "../src";

const preview: Preview = {
  parameters: {
    playground: {
      storyId: "playground",
      components: { ...VibeComponents, VibeIcons, VibeNext },
      autocompletions: generateAutocompletion(reactDocgenOutput),
      editorTheme: "light",
      introCode: {
        jsx: `<VibeNext.Heading>Online Playground</VibeNext.Heading>`,
        css: ""
      }
    },
  },
};

export default preview;
