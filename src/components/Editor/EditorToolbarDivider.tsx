import React, { memo } from "react";
import "./EditorToolbarDivider.css";

const EditorToolbarDivider: React.FC = () => {
  return (
    <div
      className="divider"
      style={{
        width: 1,
        height: "100%",
        background: "rgba(255, 255, 255, 0.1)",
        marginInline: 8,
      }}
    />
  );
};

export default memo(EditorToolbarDivider);
