import React from "react";
import { Code } from "@/types";
import { withLive } from "react-live";
import ErrorState from "@/components/PlaygroundPreview/ErrorState";

interface PlaygroundPreviewProps {
  live?: {
    // live injects more, currently unneeded, props
    error?: string;
    element?: React.ComponentType;
  };
  css?: Code["css"];
}

const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = ({
  live = {},
  css,
}) => {
  const { error, element: Element } = live;
  return (
    <>
      {css && <style>{css}</style>}
      {error ? <ErrorState error={error} /> : Element && <Element />}
    </>
  );
};
export default withLive(PlaygroundPreview);
