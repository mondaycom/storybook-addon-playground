import React from "react";
import PlaygroundRenderer from "../components/PlaygroundRenderer/PlaygroundRenderer";
import { StoryFn } from "@storybook/react";
import { PlaygroundParameters } from "@/types";
import { usePlaygroundRendererCode } from "@/hooks";
import { LiveProvider } from "react-live";

const withPlayground: StoryFn = (_Story, { parameters }) => {
  const code = usePlaygroundRendererCode();
  const playgroundParameters: PlaygroundParameters = parameters.playground;

  return (
    <LiveProvider
      code={code.jsx}
      scope={playgroundParameters.components}
      enableTypeScript
    >
      <PlaygroundRenderer css={code.css} />
    </LiveProvider>
  );
};

export default withPlayground;
