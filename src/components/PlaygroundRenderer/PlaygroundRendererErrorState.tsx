import React from "react";
import styles from "./PlaygroundRendererErrorState.module.css";

interface PlaygroundRendererErrorStateProps {
  error: string;
}

const PlaygroundRendererErrorState: React.FC<PlaygroundRendererErrorStateProps> = ({ error }) => {
  return <div className={styles.errorState}>{error}</div>;
};

export default PlaygroundRendererErrorState;
