import React from "react";
import { Icons } from "@storybook/components";

const PanelTitle: React.FC = () => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
    Playground
    <Icons icon="beaker" />
  </span>
);
export default PanelTitle;
