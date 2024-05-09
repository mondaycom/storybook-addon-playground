import React from "react";
import styles from "./PanelTitle.module.css";
import { Beaker } from "@/icons";

const PanelTitle: React.FC = () => (
  <span className={styles.title}>
    <Beaker width={18} height={18} />
    Playground
  </span>
);
export default PanelTitle;
