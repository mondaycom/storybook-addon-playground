import { useAddonState, useArgs } from "@storybook/manager-api";
import { useCallback, useMemo } from "react";
import { debounce } from "lodash-es";
import { PlaygroundArgs, PlaygroundState } from "@/types";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";

const usePlaygroundArgs = (): PlaygroundArgs => {
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );
  const [_args, updateArgs] = useArgs();
  const { code, selectedTab } = state;

  const debouncedUpdateArgs = useMemo(
    () => debounce(updateArgs, 300),
    [updateArgs]
  );

  const updateCode = useCallback(
    (newCode: string) => {
      const updatedCode = { ...code, [selectedTab]: newCode };
      setState((state) => ({ ...state, code: updatedCode }));
      debouncedUpdateArgs({ code: updatedCode });
    },
    [code, selectedTab, setState, debouncedUpdateArgs]
  );

  const resetCode = useCallback(() => {
    const updatedCode = { ...code, [selectedTab]: "" };
    setState((state) => ({ ...state, code: updatedCode }));
    debouncedUpdateArgs({ code: updatedCode });
  }, [code, selectedTab, setState, debouncedUpdateArgs]);

  return { updateCode, resetCode };
};

export default usePlaygroundArgs;
