import { PlaygroundState } from "@/types";

export const DEFAULT_ADDON_STATE: PlaygroundState = {
  hasInitialCodeLoaded: false,
  code: { jsx: "", css: "" },
  fontSize: 13,
  selectedTab: "jsx",
  editorState: {
    jsx: null,
    css: null,
  },
};
