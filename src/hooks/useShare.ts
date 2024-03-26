import { useCallback, useMemo, useState } from "react";
import { Code, PlaygroundParameters } from "@/types";
import { compressAndEncode } from "@/utils";
import {
  ADDON_ID_FOR_PARAMETERS,
  DEFAULT_ADDON_PARAMETERS,
  SNIPPET_SHARE_QUERY_ID,
} from "@/consts";
import usePlaygroundState from "./usePlaygroundState";
import { useParameter } from "@storybook/manager-api";

interface UseShareReturnType {
  onShare: () => Promise<void>;
  isShareCopied: boolean;
  shouldAllowShare: boolean;
}

const useShare = (code: Code): UseShareReturnType => {
  const { playgroundStoryBaseUrl } = usePlaygroundState();
  const { share: enableShare } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );
  const [isShareCopied, setShareCopied] = useState(false);

  const shouldAllowShare = useMemo(
    () => Boolean(code?.jsx || code?.css) && enableShare,
    [code?.css, code?.jsx, enableShare]
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
