import React from "react";
import { Tab } from "@/types";
import EditorTab from "./EditorTab";

interface EditorTabsProps {
  selectedTab: Tab;
  onTabChange?: (newTab: Tab) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  selectedTab,
  onTabChange,
}) => (
  <div
    style={{
      borderRight: "1px solid rgba(255, 255, 255, 0.1)",
      width: 50,
    }}
  >
    <EditorTab
      title="JSX"
      selected={selectedTab === "jsx"}
      onClick={() => onTabChange("jsx")}
    />
    <EditorTab
      title="CSS"
      selected={selectedTab === "css"}
      onClick={() => onTabChange("css")}
    />
  </div>
);

export default EditorTabs;
