import {
  useAddonState,
  useParameter,
  useStorybookApi,
  useStorybookState,
} from "@storybook/manager-api";
import { useCallback, useMemo } from "react";
import {
  ADDON_ID_FOR_PARAMETERS,
  DEFAULT_ADDON_PARAMETERS,
  DEFAULT_ADDON_STATE,
  PANEL_ID,
} from "@/consts";
import { formatCss, formatJsx, getStoryId } from "@/utils";
import { Code, PlaygroundParameters, PlaygroundState, Tab } from "@/types";

const usePlaygroundState = () => {
  const { resolveStory, selectStory } = useStorybookApi();
  const { storyId } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );
  const { code, selectedTab, hasInitialCodeLoaded, fontSize } = state;
  const { storyId: currentStoryId, previewInitialized } = useStorybookState();

  const updateInitialCodeLoaded = useCallback(() => {
    setState((state) => ({
      ...state,
      hasInitialCodeLoaded: true,
    }));
  }, [setState]);

  const updateSelectedTab = useCallback(
    (newTab: Tab) => {
      setState((state) => ({
        ...state,
        selectedTab: newTab,
      }));
    },
    [setState]
  );

  const updateFontSize = useCallback(
    (amount: number) => {
      setState((state) => ({
        ...state,
        fontSize: Math.max(12, Math.min(18, fontSize + amount)),
      }));
    },
    [fontSize, setState]
  );

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

  const updateCode = useCallback(
    (newCode: string | Code) => {
      let updatedCode = code;
      if (typeof newCode === "string") {
        updatedCode = { ...code, [selectedTab]: newCode };
      }
      setState((state) => ({ ...state, code: updatedCode }));
    },
    [code, selectedTab, setState]
  );

  const resetCode = useCallback(() => {
    const updatedCode = { ...code, [selectedTab]: "" };
    setState((state) => ({ ...state, code: updatedCode }));
  }, [code, selectedTab, setState]);

  const formatCode = useCallback(() => {
    let formatted: string;
    try {
      if (selectedTab === "jsx") {
        formatted = formatJsx(code.jsx);
      } else {
        formatted = formatCss(code.css);
      }
    } catch (error) {
      console.error(error.message);
    }
    updateCode(formatted);
  }, [code, selectedTab, updateCode]);

  const selectPlaygroundStory = useCallback(() => {
    selectStory(playgroundStoryId);
  }, [selectStory, playgroundStoryId]);

  const isPlaygroundStorySelected = useMemo<boolean>(() => {
    if (!previewInitialized) {
      return false;
    }
    return currentStoryId === playgroundStoryId;
  }, [previewInitialized, currentStoryId, playgroundStoryId]);

  return {
    hasInitialCodeLoaded,
    updateInitialCodeLoaded,
    selectedTab,
    updateSelectedTab,
    fontSize,
    updateFontSize,
    code,
    updateCode,
    resetCode,
    formatCode,
    selectPlaygroundStory,
    isPlaygroundStorySelected,
  };
};

export default usePlaygroundState;
