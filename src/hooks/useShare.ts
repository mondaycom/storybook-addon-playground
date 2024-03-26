import { useCallback, useMemo, useState } from "react";
import { Code } from "@/types";
import { compressAndEncode } from "@/utils";
import { SNIPPET_SHARE_QUERY_ID } from "@/consts";
import usePlaygroundState from "./usePlaygroundState";

interface UseShareReturnType {
  onShare: () => Promise<void>;
  isShareCopied: boolean;
  shouldAllowShare: boolean;
}

const useShare = (code: Code): UseShareReturnType => {
  const { playgroundStoryBaseUrl } = usePlaygroundState();
  const [isShareCopied, setShareCopied] = useState(false);

  const shouldAllowShare = useMemo(
    () => Boolean(code?.jsx || code?.css),
    [code?.css, code?.jsx]
  );

  const onShare = useCallback(async () => {
    if (!shouldAllowShare) {
      return;
    }
    const encoded = compressAndEncode(code);
    const url = new URL(await playgroundStoryBaseUrl);
    url.searchParams.append(SNIPPET_SHARE_QUERY_ID, encoded);
    navigator.clipboard.writeText(url.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  }, [code, playgroundStoryBaseUrl, shouldAllowShare]);

  return { onShare, isShareCopied, shouldAllowShare };
};

export default useShare;
