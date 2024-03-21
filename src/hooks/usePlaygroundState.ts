import {
  useParameter,
  useStorybookApi,
  useStorybookState,
} from "@storybook/manager-api";
import { hrefTo } from "@storybook/addon-links";
import { useMemo } from "react";
import { ADDON_ID_FOR_PARAMETERS, DEFAULT_ADDON_PARAMETERS } from "@/consts";
import { getStoryId } from "@/utils";
import { PlaygroundParameters } from "@/types";

const usePlaygroundState = () => {
  const { resolveStory } = useStorybookApi();
  const { storyId } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );
  const { storyId: currentStoryId, previewInitialized } = useStorybookState();

  const playgroundStoryBaseUrl = useMemo(async () => {
    return await hrefTo(storyId, "");
  }, [storyId]);

  const playgroundStoryId = useMemo(() => {
    if (!previewInitialized) {
      return null;
    }

    const resolved = resolveStory(storyId);
    if (!resolved) {
      throw new Error(
        `[Playground Error]: Could not resolve playground story with id ${storyId}. 
        Make sure you passed storyId in your preview.ts file, and that a story file with that name exists.
        See example in docs for more info.`
      );
    }

    return getStoryId(resolved);
  }, [previewInitialized, resolveStory, storyId]);

  const isPlaygroundStorySelected = useMemo<boolean>(() => {
    if (!previewInitialized) {
      return false;
    }
    return currentStoryId === playgroundStoryId;
  }, [previewInitialized, currentStoryId, playgroundStoryId]);

  return {
    playgroundStoryBaseUrl,
    playgroundStoryId,
    isPlaygroundStorySelected,
  };
};

export default usePlaygroundState;
