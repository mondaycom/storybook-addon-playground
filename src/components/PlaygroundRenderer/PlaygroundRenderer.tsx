import React from "react";
import { Code } from "@/types";
import { LivePreview, withLive } from "react-live";
import PlaygroundRendererErrorState from "@/components/PlaygroundRenderer/PlaygroundRendererErrorState";

interface PlaygroundRendererProps {
  live?: {
    // live injects more, currently unneeded, props
    error?: string;
  };
  css?: Code["css"];
}

const PlaygroundRenderer: React.FC<PlaygroundRendererProps> = ({
  live,
  css,
}) => (
  <>
    {css && <style>{css}</style>}
    {live.error ? (
      <PlaygroundRendererErrorState error={live.error} />
    ) : (
      <LivePreview />
    )}
  </>
);
export default withLive(PlaygroundRenderer);
