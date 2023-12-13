import React from "react";

export interface PlaygroundParameters {
  storyId: string;
  components: PlaygroundComponents;
  editorTheme?: EditorColor;
}

export type PlaygroundComponents = Record<
  string,
  React.ComponentType | React.ExoticComponent
>;

export interface PlaygroundArgs {
  code: Code;
  updateCode: (newCode: string) => void;
  resetCode: () => void;
}

export interface PlaygroundState {
  fontSize: number;
  code?: Code;
  selectedTab: Tab;
}

export type Code = { jsx: string; css: string };

export type Tab = "jsx" | "css";

export type EditorColor = "light" | "dark";
