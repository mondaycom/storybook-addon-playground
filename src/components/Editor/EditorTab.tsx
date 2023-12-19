import React from "react";
import styles from "./EditorTab.module.css";
import cx from "classnames";

interface EditorTabProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

const EditorTab: React.FC<EditorTabProps> = ({ title, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cx(styles.tab, { [styles.selected]: selected })}
    >
      {title}
    </div>
  );
};

export default React.memo(EditorTab);
