import React from "react";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return <div className={styles.errorState}>{error}</div>;
};

export default ErrorState;
