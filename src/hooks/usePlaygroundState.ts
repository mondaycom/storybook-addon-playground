import { PlaygroundState, Tab } from "@/types";
import { useAddonState } from "@storybook/manager-api";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";
import { useCallback } from "react";

interface PlaygroundActions {
  updateCode: (newCode: string) => void;
  updateFontSize: (amount: number) => void;
  updateTab: (newTab: Tab) => void;
}

const usePlaygroundState = (): PlaygroundState & PlaygroundActions => {
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );

  const updateCode = useCallback(
    (newCode: string) => {
      setState((state) => ({
        ...state,
        code: { ...state.code, [state.selectedTab]: newCode },
      }));
    },
    [setState]
  );

  const updateFontSize = useCallback(
    (amount: number) => {
      setState((state) => ({
        ...state,
        fontSize: Math.max(12, Math.min(18, state.fontSize + amount)),
      }));
    },
    [setState]
  );

  const updateTab = useCallback(
    (newTab: Tab) => {
      setState((state) => ({
        ...state,
        selectedTab: newTab,
      }));
    },
    [setState]
  );

  return {
    fontSize: state.fontSize,
    code: state.code,
    selectedTab: state.selectedTab,
    updateCode,
    updateFontSize,
    updateTab,
  };
};

export default usePlaygroundState;
