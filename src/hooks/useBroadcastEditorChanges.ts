import { useEffect } from "react";
import { PLAYGROUND_EDITOR_CHANGED, PLAYGROUND_STORY_PREPARED } from "@/consts";
import { useStorybookApi } from "@storybook/manager-api";
import usePlaygroundState from "./usePlaygroundState";

const useBroadcastEditorChanges = () => {
  const { emit, on, off } = useStorybookApi();
  const { isPlaygroundStorySelected, code, hasInitialCodeLoaded } =
    usePlaygroundState();

  useEffect(() => {
    const handleEditorChange = () => {
      emit(PLAYGROUND_EDITOR_CHANGED, code);
    };

    if (!hasInitialCodeLoaded) {
      return;
    }

    if (isPlaygroundStorySelected) {
      handleEditorChange();
      return;
    }

    on(PLAYGROUND_STORY_PREPARED, handleEditorChange);
  }, [emit, code, hasInitialCodeLoaded, isPlaygroundStorySelected, on, off]);
};

export default useBroadcastEditorChanges;
