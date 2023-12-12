import React from "react";
import PlaygroundRenderer from "../components/PlaygroundRenderer/PlaygroundRenderer";
import { StoryFn } from "@storybook/react";

const withPlaygroundRenderer: StoryFn = (_Story, { args, parameters }) => {
  const {
    playground: { code: parameterCode, components: parameterComponents },
  } = parameters;
  const code = args.code || parameterCode || { jsx: "", css: "" };
  return <PlaygroundRenderer code={code} components={parameterComponents} />;
};

export default withPlaygroundRenderer;
