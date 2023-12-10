import React from "react";
import JsxParser from "react-jsx-parser";
import PlaygroundRendererErrorState from "./PlaygroundRendererErrorState";
import { Code, PlaygroundComponents } from "@/types";

interface PlaygroundRendererProps {
  code: Code;
  components: PlaygroundComponents;
}

const PlaygroundRenderer: React.FC<PlaygroundRendererProps> = ({
  code,
  components,
}) => {
  return (
    <>
      <style>{code.css}</style>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore known issue https://github.com/TroyAlford/react-jsx-parser/issues/234 */}
      <JsxParser
        components={components}
        allowUnknownElements
        renderUnrecognized={() => null}
        renderError={(errorProps) => (
          <PlaygroundRendererErrorState error={errorProps.error} />
        )}
        renderInWrapper={false}
        jsx={code.jsx}
      />
    </>
  );
};

export default PlaygroundRenderer;
