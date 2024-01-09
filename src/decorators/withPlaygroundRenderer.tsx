import React from "react";
import PlaygroundRenderer from "../components/PlaygroundRenderer/PlaygroundRenderer";
import { StoryFn } from "@storybook/react";
import { PlaygroundParameters } from "@/types";
import { usePlaygroundRendererCode } from "@/hooks";

const withPlaygroundRenderer: StoryFn = (_Story, { parameters }) => {
  const code = usePlaygroundRendererCode();
  const playgroundParameters: PlaygroundParameters = parameters.playground;

  return (
    <PlaygroundRenderer
      code={code}
      components={playgroundParameters.components}
    />
  );
};

export default withPlaygroundRenderer;
