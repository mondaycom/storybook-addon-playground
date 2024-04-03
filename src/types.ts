import React from "react";
import { Extension } from "@uiw/react-codemirror";
import { EditorStateConfig } from "@codemirror/state";
import { EDITOR_STATE_FIELDS } from "@/consts";

export interface PlaygroundParameters {
  storyId: string;
  components: Components;
  autocompletions?: AutocompletionsMetadata;
  editorTheme?: EditorTheme;
  introCode?: Code;
  share?: boolean;
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
  fontSize?: number;
  code?: Code;
  selectedTab?: Tab;
  editorState?: Record<Tab, EditorStateJson>;
}

type EditorStateFields = typeof EDITOR_STATE_FIELDS;

export interface EditorInitialState {
  fields: EditorStateFields;
  json: EditorStateJson;
}

type EditorStateJson = Partial<EditorStateConfig> & {
  [K in keyof EditorStateFields]: unknown;
};

export type Code = Record<SupportedLanguages, string>;

export type Tab = SupportedLanguages;

type SupportedLanguages = "jsx" | "css";

export type EditorTheme = "light" | "dark" | Extension;
