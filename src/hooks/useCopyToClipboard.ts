import { useCallback, useMemo, useState } from "react";
import { Code, PlaygroundState } from "@/types";
import { useAddonState } from "@storybook/manager-api";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";

const useCopyToClipboard = (code: Code) => {
  const [state] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);
  const [isCopied, setCopied] = useState(false);

  const currentTabCode = code[state.selectedTab];

  const shouldAllowCopy = useMemo(
    () => currentTabCode?.length > 0,
    [currentTabCode?.length]
  );

  const onCopy = useCallback(() => {
    if (!shouldAllowCopy) {
      return;
    }
    navigator.clipboard.writeText(currentTabCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentTabCode, shouldAllowCopy]);

  return { onCopy, isCopied, shouldAllowCopy };
};

export default useCopyToClipboard;
