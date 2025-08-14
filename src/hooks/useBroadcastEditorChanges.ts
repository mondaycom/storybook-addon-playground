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
  const { emit, on, off } = useStorybookApi();
  const { isPlaygroundStorySelected, playgroundStoryId } = usePlaygroundState();
  const [state] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);
  const { code, hasInitialCodeLoaded } = state;

  useEffect(() => {
    const handleEditorChange = () => {
      emit(PLAYGROUND_EDITOR_CHANGED, code);
    };

    if (!hasInitialCodeLoaded) {
      return;
    }

    if (isPlaygroundStorySelected) {
      const handleStoryRendered = (renderedStoryId: string) => {
        if (renderedStoryId === playgroundStoryId) {
          handleEditorChange();
        }
      };

      on("storyRendered", handleStoryRendered);
      return () => off("storyRendered", handleStoryRendered);
    }

    on(PLAYGROUND_STORY_PREPARED, handleEditorChange);

    return () => {
      off(PLAYGROUND_STORY_PREPARED, handleEditorChange);
    };
  }, [
    emit,
    code,
    hasInitialCodeLoaded,
    isPlaygroundStorySelected,
    playgroundStoryId,
    on,
    off,
  ]);
};

export default useBroadcastEditorChanges;
