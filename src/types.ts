import React from "react";

export interface PlaygroundParameters {
  storyId: string;
  components: Components;
  autocompletions?: AutocompletionsMetadata;
  editorTheme?: EditorTheme;
  introCode?: Code;
  disableShare?: boolean;
}

type Components = Record<string, React.ComponentType | React.ExoticComponent>;

type AutoCompletionItem = Record<
  string,
  {
    type: string | string[];
    required: boolean;
    defaultValue: unknown;
    description?: string;
  }
>;

export type AutocompletionsMetadata = Record<string, AutoCompletionItem[]>;

export interface PlaygroundArgs {
  updateCode: (newCode: string) => void;
  resetCode: () => void;
}

export interface PlaygroundState {
  hasInitialCodeLoaded?: boolean;
  fontSize: number;
  code?: Code;
  selectedTab: Tab;
}

export type Code = { jsx: string; css: string };

export type Tab = "jsx" | "css";

export type EditorTheme = "light" | "dark";
