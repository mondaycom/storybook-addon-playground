import type { Preview } from "@storybook/react";
import * as VibeComponents from "@vibe/core";
import * as VibeNext from "@vibe/core/next";
import * as VibeIcons from "@vibe/icons";
import reactDocgenOutput from "./react-docgen-output-example.json";
import { generateAutocompletion } from "../src";

const preview: Preview = {
  parameters: {
    playground: {
      storyId: "playground",
      components: { ...VibeComponents, ...VibeNext, VibeIcons },
      autocompletions: generateAutocompletion(reactDocgenOutput),
      editorTheme: "light",
      introCode: {
        jsx: `<Heading>Online Playground</Heading>`,
        css: ""
      },
      share: true,
    },
  },
};

export default preview;
