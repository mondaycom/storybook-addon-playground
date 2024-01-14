import React from "react";
import PlaygroundPreview from "../components/PlaygroundPreview/PlaygroundPreview";
import { StoryFn } from "@storybook/react";
import { PlaygroundParameters } from "@/types";
import { usePlaygroundPreviewCode } from "@/hooks";
import { LiveProvider } from "react-live";

const withPlayground: StoryFn = (_Story, { parameters }) => {
  const code = usePlaygroundPreviewCode();
  const playgroundParameters: PlaygroundParameters = parameters.playground;

  return (
    <LiveProvider
      code={code.jsx}
      scope={playgroundParameters.components}
      enableTypeScript
    >
      <PlaygroundPreview css={code.css} />
    </LiveProvider>
  );
};

export default withPlayground;
