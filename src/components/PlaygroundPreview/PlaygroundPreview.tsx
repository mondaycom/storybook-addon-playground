import React from "react";
import { Code } from "@/types";
import { LivePreview, withLive } from "react-live";
import ErrorState from "@/components/PlaygroundPreview/ErrorState";

interface PlaygroundPreviewProps {
  live?: {
    // live injects more, currently unneeded, props
    error?: string;
  };
  css?: Code["css"];
}

const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = ({ live, css }) => (
  <>
    {css && <style>{css}</style>}
    {live.error ? <ErrorState error={live.error} /> : <LivePreview />}
  </>
);
export default withLive(PlaygroundPreview);
