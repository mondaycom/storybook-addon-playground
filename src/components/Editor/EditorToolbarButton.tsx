import React, { memo } from "react";
import { IconButton } from "@storybook/components";
import cx from "classnames";
import styles from "./EditorToolbarButton.module.css";

interface EditorToolbarButtonProps {
  tooltip?: string;
  text?: string;
  renderIcon: React.ReactElement;
  disabled?: boolean;
  smallPadding?: boolean;
  onClick?: () => void;
}

const EditorToolbarButton: React.FC<EditorToolbarButtonProps> = ({
  tooltip,
  text,
  renderIcon,
  disabled,
  smallPadding,
  onClick,
}) => (
  <IconButton
    placeholder={text}
    title={tooltip}
    onClick={onClick}
    disabled={disabled}
    className={cx(styles.toolbarButton, {
      [styles.smallPadding]: smallPadding,
    })}
  >
    {renderIcon}
    {text && <span>{text}</span>}
  </IconButton>
);

export default memo(EditorToolbarButton);
