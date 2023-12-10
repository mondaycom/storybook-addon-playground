import React from "react";
import "./PlaygroundRendererErrorState.css";

interface PlaygroundRendererErrorStateProps {
  error: string;
}

const PlaygroundRendererErrorState: React.FC<PlaygroundRendererErrorStateProps> = ({ error }) => {
  return <div className={"error-state"}>{error}</div>;
};

export default PlaygroundRendererErrorState;
