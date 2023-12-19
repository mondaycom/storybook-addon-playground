import React from "react";
import { Icons } from "@storybook/components";
import styles from "./PanelTitle.module.css";

const PanelTitle: React.FC = () => (
  <span className={styles.title}>
    Playground
    <Icons icon="beaker" />
  </span>
);
export default PanelTitle;
