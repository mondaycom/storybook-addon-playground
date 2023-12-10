import { useCallback, useMemo, useState } from "react";
import { Code, PlaygroundState } from "@/types";
import { useAddonState } from "@storybook/manager-api";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";

const useCopyToClipboard = (code: Code) => {
  const [state] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);
  const [isCopied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    if (code) {
      navigator.clipboard.writeText(code[state.selectedTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code, state.selectedTab]);

  const shouldAllowCopy = useMemo(
    () => code[state.selectedTab]?.length > 0,
    [code, state.selectedTab]
  );

  return { onCopy, isCopied, shouldAllowCopy };
};

export default useCopyToClipboard;
