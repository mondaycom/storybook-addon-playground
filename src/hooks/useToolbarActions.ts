import { useCallback } from "react";
import { formatCss, formatJsx } from "@/utils";
import { Code, Tab } from "@/types";

interface UseToolbarActionsReturnType {
  onReset: () => void;
  onFormatCode: () => void;
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

  return { onFormatCode, onReset };
};

export default useToolbarActions;
