import { useCallback, useMemo, useState } from "react";
import usePlaygroundState from "./usePlaygroundState";

const useCopyToClipboard = () => {
  const { code, selectedTab } = usePlaygroundState();
  const [isCopied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    if (code) {
      navigator.clipboard.writeText(code[selectedTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code, selectedTab]);

  const shouldAllowCopy = useMemo(
    () => code[selectedTab]?.length > 0,
    [code, selectedTab]
  );

  return { onCopy, isCopied, shouldAllowCopy };
};

export default useCopyToClipboard;
