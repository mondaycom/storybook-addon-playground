import React, { SVGAttributes, memo } from "react";
import { IconButton, Icons, IconsProps } from "@storybook/components";
import cx from "classnames";
import styles from "./EditorToolbarButton.module.css";

interface EditorToolbarButtonProps {
  tooltip?: string;
  text?: string;
  icon: IconsProps["icon"];
  color?: SVGAttributes<SVGElement>["color"];
  disabled?: boolean;
  smallPadding?: boolean;
  onClick?: () => void;
}

const EditorToolbarButton: React.FC<EditorToolbarButtonProps> = ({
  tooltip,
  text,
  icon,
  color,
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
    <Icons icon={icon} color={color} />
    {text && <span>{text}</span>}
  </IconButton>
);

export default memo(EditorToolbarButton);
