import React from "react";
import styles from "./PanelTitle.module.css";
import { Beaker } from "@/icons";

const PanelTitle: React.FC = () => (
  <span className={styles.title}>
    <Beaker />
    Playground
  </span>
);
export default PanelTitle;
