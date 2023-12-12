import { useAddonState, useArgs } from "@storybook/manager-api";
import { useCallback, useMemo } from "react";
import {Code, PlaygroundArgs, PlaygroundState} from "@/types";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";

const usePlaygroundArgs = (): PlaygroundArgs => {
  // addon state is used to maintain consistency of the editor state between stories
  const [state, setState] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);
  // args is used for rendering the editor state in the preview
  const [args, updateArgs] = useArgs();

  const code = useMemo<Code>(() => args?.code || { jsx: "", css: "" }, [args?.code]);

  const updateCode = useCallback(
    (newCode: string) => {
      const updatedCode = { ...code, [state.selectedTab]: newCode };
      updateArgs({ code: updatedCode });
      setState((state) => ({ ...state, code: updatedCode }));
    },
    [code, setState, state.selectedTab, updateArgs]
  );

  const resetCode = useCallback(() => {
    const updatedCode = { ...code, [state.selectedTab]: "" };
    setState((state) => ({ ...state, code: updatedCode }));
    updateArgs({ code: updatedCode });
  }, [code, setState, state.selectedTab, updateArgs]);

  return { code, updateCode, resetCode };
};

export default usePlaygroundArgs;
