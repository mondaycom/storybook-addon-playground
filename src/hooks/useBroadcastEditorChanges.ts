import { useEffect } from "react";
import {
  DEFAULT_ADDON_STATE,
  PANEL_ID,
  PLAYGROUND_EDITOR_CHANGED,
  PLAYGROUND_STORY_PREPARED,
} from "@/consts";
import { useAddonState, useStorybookApi } from "@storybook/manager-api";
import usePlaygroundState from "./usePlaygroundState";
import { PlaygroundState } from "@/types";

const useBroadcastEditorChanges = () => {
  const { emit, on } = useStorybookApi();
  const { isPlaygroundStorySelected } = usePlaygroundState();
  const [state] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);
  const { code } = state;

  useEffect(() => {
    if (isPlaygroundStorySelected) {
      emit(PLAYGROUND_EDITOR_CHANGED, code);
      return;
    }
    on(PLAYGROUND_STORY_PREPARED, () => {
      emit(PLAYGROUND_EDITOR_CHANGED, code);
    });
  }, [isPlaygroundStorySelected, emit, code, on]);
};

export default useBroadcastEditorChanges;
