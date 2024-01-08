import { useEffect, useMemo } from "react";
import { useAddonState, useParameter } from "@storybook/manager-api";
import {
  ADDON_ID_FOR_PARAMETERS,
  DEFAULT_ADDON_PARAMETERS,
  DEFAULT_ADDON_STATE,
  PANEL_ID,
} from "@/consts";
import { Code, PlaygroundParameters, PlaygroundState } from "@/types";

const useInitialCode = () => {
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );
  const { hasInitialCodeLoaded } = state;
  const { introCode } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );

  const initialCodeToSet = useMemo(
    () => (hasValidCode(introCode) ? introCode : DEFAULT_ADDON_STATE.code),
    [introCode]
  );

  useEffect(() => {
    if (hasInitialCodeLoaded || !introCode) {
      return;
    }
    setState((state) => ({
      ...state,
      code: initialCodeToSet,
      hasInitialCodeLoaded: true,
    }));
  }, [initialCodeToSet, introCode, setState, hasInitialCodeLoaded]);
};

function hasValidCode(code: Code) {
  return code && Object.values(code).some(Boolean);
}

export default useInitialCode;
