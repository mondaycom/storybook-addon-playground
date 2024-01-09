import { useEffect, useMemo } from "react";
import { useParameter } from "@storybook/manager-api";
import {
  ADDON_ID_FOR_PARAMETERS,
  DEFAULT_ADDON_PARAMETERS,
  DEFAULT_ADDON_STATE,
} from "@/consts";
import { Code, PlaygroundParameters } from "@/types";
import usePlaygroundState from "./usePlaygroundState";

const useInitialCode = () => {
  const { updateCode, hasInitialCodeLoaded, updateInitialCodeLoaded } =
    usePlaygroundState();
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
    updateCode(initialCodeToSet);
    updateInitialCodeLoaded();
  }, [
    hasInitialCodeLoaded,
    introCode,
    updateCode,
    initialCodeToSet,
    updateInitialCodeLoaded,
  ]);
};

function hasValidCode(code: Code) {
  return code && Object.values(code).some(Boolean);
}

export default useInitialCode;
