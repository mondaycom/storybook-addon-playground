import React from "react";
import { Tab } from "@/types";
import EditorTab from "./EditorTab";
import styles from "./EditorTabs.module.css";

interface EditorTabsProps {
  selectedTab: Tab;
  onTabChange?: (newTab: Tab) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  selectedTab,
  onTabChange,
}) => (
  <section className={styles.tabs}>
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
  </section>
);

export default EditorTabs;
