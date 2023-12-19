import React, { memo } from "react";
import styles from "./EditorToolbarDivider.module.css";

const EditorToolbarDivider: React.FC = () => {
  return <div className={styles.divider} />;
};

export default memo(EditorToolbarDivider);
