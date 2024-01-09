import React from "react";

export interface PlaygroundParameters {
  storyId: string;
  components: PlaygroundComponents;
  editorTheme?: EditorTheme;
  introCode?: Code;
}

export type PlaygroundComponents = Record<
  string,
  React.ComponentType | React.ExoticComponent
>;

export interface PlaygroundState {
  hasInitialCodeLoaded?: boolean;
  fontSize: number;
  code?: Code;
  selectedTab: Tab;
}

export type Code = { jsx: string; css: string };

export type Tab = "jsx" | "css";

export type EditorTheme = "light" | "dark";
