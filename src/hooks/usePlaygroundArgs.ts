import { useAddonState, useArgs } from "@storybook/manager-api";
import { useCallback, useMemo } from "react";
import { debounce } from "lodash-es";
import { Code, PlaygroundArgs, PlaygroundState } from "@/types";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";

const usePlaygroundArgs = (): PlaygroundArgs => {
  const [state] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);
  const [args, updateArgs] = useArgs();
  const debouncedUpdateArgs = useCallback(debounce(updateArgs, 300), [
    updateArgs,
  ]);

  const code = useMemo<Code>(
    () => args?.code || { jsx: "", css: "" },
    [args?.code]
  );

  const updateCode = useCallback(
    (newCode: string) => {
      const updatedCode = { ...code, [state.selectedTab]: newCode };
      debouncedUpdateArgs({ code: updatedCode });
    },
    [code, debouncedUpdateArgs, state.selectedTab]
  );

  const resetCode = useCallback(() => {
    const updatedCode = { ...code, [state.selectedTab]: "" };
    debouncedUpdateArgs({ code: updatedCode });
  }, [code, debouncedUpdateArgs, state.selectedTab]);

  return { code, updateCode, resetCode };
};

export default usePlaygroundArgs;
