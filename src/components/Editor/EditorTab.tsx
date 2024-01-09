import React from "react";
import styles from "./EditorTab.module.css";
import cx from "classnames";
import { IconButton } from "@storybook/components";

interface EditorTabProps {
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

const EditorTab: React.FC<EditorTabProps> = ({
  title,
  selected,
  onClick = () => {},
}) => {
  return (
    <IconButton
      placeholder={title}
      onClick={() => !selected && onClick()}
      className={cx(styles.tab, { [styles.selected]: selected })}
    >
      {title}
    </IconButton>
  );
};

export default React.memo(EditorTab);
