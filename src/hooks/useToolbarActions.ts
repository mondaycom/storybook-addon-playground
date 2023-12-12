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

const useToolbarActions = (
  code: Code,
  updateCode: (newCode: string) => void,
  resetCode: () => void,
  currentTab: Tab
): UseToolbarActionsReturnType => {
  const { onCopy, isCopied, shouldAllowCopy } = useCopyToClipboard(code);

  const onFormatCode = useCallback(async () => {
    let formatted: string;
    try {
      if (currentTab === "jsx") {
        formatted = formatJsx(code.jsx);
      } else {
        formatted = formatCss(code.css);
      }
    } catch (error) {
      console.error(error);
    }
    updateCode(formatted);
  }, [code, currentTab, updateCode]);

  const onReset = useCallback(() => {
    resetCode();
  }, [resetCode]);

  return { onCopy, isCopied, shouldAllowCopy, onFormatCode, onReset };
};

export default useToolbarActions;
