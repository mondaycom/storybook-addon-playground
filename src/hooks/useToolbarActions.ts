import { useCallback } from "react";
import { formatCss, formatJsx } from "@/utils";
import { Code, Tab } from "@/types";
import useCopyToClipboard from "./useCopyToClipboard";

interface UseToolbarActionsReturnType {
  onReset: () => void;
  onFormatCode: () => void;
  onCopy: () => void;
  isCopied: boolean;
  shouldAllowCopy: boolean;
}

const formatFunctions = {
  jsx: formatJsx,
  css: formatCss,
};

const useToolbarActions = (
  code: Code,
  updateCode: (newCode: string) => void,
  resetCode: () => void,
  currentTab: Tab
): UseToolbarActionsReturnType => {
  const { onCopy, isCopied, shouldAllowCopy } = useCopyToClipboard(code);

  const onFormatCode = useCallback(async () => {
    try {
      const formatter = formatFunctions[currentTab];
      const formatted = formatter?.(code[currentTab]);
      if (formatted === code[currentTab]) {
        return;
      }
      updateCode(formatted);
    } catch (error) {
      console.error(error.message);
    }
  }, [code, currentTab, updateCode]);

  const onReset = useCallback(() => {
    resetCode();
  }, [resetCode]);

  return { onCopy, isCopied, shouldAllowCopy, onFormatCode, onReset };
};

export default useToolbarActions;
