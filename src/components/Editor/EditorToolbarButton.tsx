import React, { SVGAttributes, memo } from "react";
import { IconButton, Icons, IconsProps } from "@storybook/components";
import "./EditorToolbarButton.css";

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
    className={`icon-button${smallPadding ? " small-padding" : ""}`}
    style={{
      margin: 0,
      padding: `8px ${smallPadding ? "8px" : "16px"}`,
      gap: 4,
    }}
  >
    <Icons icon={icon} color={color} />
    {text && <span>{text}</span>}
  </IconButton>
);

export default memo(EditorToolbarButton);
