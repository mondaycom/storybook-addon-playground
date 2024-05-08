import { PlaygroundState } from "@/types";

export const DEFAULT_ADDON_STATE: PlaygroundState = {
  hasInitialCodeLoaded: false,
  code: { jsx: "", css: "" },
  selectedTab: "jsx",
  editorState: {
    jsx: null,
    css: null,
  },
};
