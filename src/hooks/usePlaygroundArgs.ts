import { useAddonState } from "@storybook/manager-api";
import { useCallback } from "react";
import { PlaygroundArgs, PlaygroundState } from "@/types";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";

const usePlaygroundArgs = (): PlaygroundArgs => {
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );
  const { code, selectedTab } = state;

  const updateCode = useCallback(
    (newCode: string) => {
      const updatedCode = { ...code, [selectedTab]: newCode };
      setState((state) => ({ ...state, code: updatedCode }));
    },
    [code, selectedTab, setState]
  );

  const resetCode = useCallback(() => {
    const updatedCode = { ...code, [selectedTab]: "" };
    setState((state) => ({ ...state, code: updatedCode }));
  }, [code, selectedTab, setState]);

  return { updateCode, resetCode };
};

export default usePlaygroundArgs;
