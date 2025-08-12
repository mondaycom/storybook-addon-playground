import React from "react";

interface IconButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const IconButton: React.FC<React.PropsWithChildren<IconButtonProps>> = ({
  onClick,
  disabled,
  className,
  children,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
);
