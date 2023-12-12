import React from "react";

interface EditorTabProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

const EditorTab: React.FC<EditorTabProps> = ({ title, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        cursor: "pointer",
        borderRight: selected ? "3px solid #029cfd" : "none",
      }}
    >
      {title}
    </div>
  );
};

export default EditorTab;
