import React from "react";
import {
  useCopyToClipboard,
  useShare,
  useToolbarActions,
  usePlaygroundArgs,
} from "@/hooks";
import EditorToolbarButton from "./EditorToolbarButton";
import { useAddonState, useParameter } from "@storybook/manager-api";
import {
  ADDON_ID_FOR_PARAMETERS,
  DEFAULT_ADDON_PARAMETERS,
  DEFAULT_ADDON_STATE,
  PANEL_ID,
} from "@/consts";
import { PlaygroundParameters, PlaygroundState } from "@/types";
import styles from "./EditorToolbar.module.css";

const EditorToolbar: React.FC = () => {
  const { updateCode, resetCode } = usePlaygroundArgs();
  const [state] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);
  const { share: enableShare } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );
  const { code, selectedTab } = state;

  const { onCopy, isCopied, shouldAllowCopy } = useCopyToClipboard(code);
  const { onShare, isShareCopied, shouldAllowShare } = useShare(code);

  const { onFormatCode, onReset } = useToolbarActions(
    code,
    updateCode,
    resetCode,
    selectedTab
  );

  return (
    <div className={styles.toolbar}>
      <EditorToolbarButton
        tooltip={shouldAllowCopy ? "" : "Editor is empty"}
        text={isCopied ? "Copied!" : "Copy"}
        icon={isCopied ? "check" : "copy"}
        color={isCopied ? "green" : undefined}
        disabled={isCopied || !shouldAllowCopy}
        onClick={onCopy}
      />
      {enableShare && (
        <EditorToolbarButton
          tooltip={shouldAllowShare ? "" : "Editor is empty"}
          text={isShareCopied ? "Copied!" : "Share"}
          icon={isShareCopied ? "check" : "share"}
          color={isShareCopied ? "green" : undefined}
          disabled={isShareCopied || !shouldAllowShare}
          onClick={onShare}
        />
      )}
      <EditorToolbarButton
        text="Format"
        icon="paintbrush"
        onClick={onFormatCode}
      />
      <EditorToolbarButton text="Reset" icon="trash" onClick={onReset} />
    </div>
  );
};

export default EditorToolbar;
