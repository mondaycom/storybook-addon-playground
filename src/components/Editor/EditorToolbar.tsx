import React, { useCallback } from "react";
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
  EDITOR_STATE_FIELDS,
  PANEL_ID,
} from "@/consts";
import { PlaygroundParameters, PlaygroundState, Tab } from "@/types";
import styles from "./EditorToolbar.module.css";
import EditorTabs from "@/components/Editor/EditorTabs";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { Copy, Edit, Reset, Share } from "@/icons";

interface EditorToolbarProps {
  editorRef: React.RefObject<ReactCodeMirrorRef>;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editorRef }) => {
  const { updateCode, resetCode } = usePlaygroundArgs();
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );
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

  const onTabChange = useCallback(
    (newTab: Tab) => {
      setState((prev) => {
        const updates = {
          ...prev,
          selectedTab: newTab,
        };
        const editorStateJson =
          editorRef.current?.view?.state?.toJSON?.(EDITOR_STATE_FIELDS);
        if (editorStateJson) {
          updates.editorState = {
            ...prev.editorState,
            [prev.selectedTab]: editorStateJson,
          };
        }
        return updates;
      });
    },
    [editorRef, setState]
  );

  return (
    <div className={styles.toolbar}>
      <EditorTabs selectedTab={selectedTab} onTabChange={onTabChange} />
      <section>
        <EditorToolbarButton
          tooltip={shouldAllowCopy ? "" : "Editor is empty"}
          text={isCopied ? "Copied!" : "Copy"}
          renderIcon={Copy}
          disabled={isCopied || !shouldAllowCopy}
          onClick={onCopy}
        />
        {enableShare && (
          <EditorToolbarButton
            tooltip={shouldAllowShare ? "" : "Editor is empty"}
            text={isShareCopied ? "Copied!" : "Share"}
            renderIcon={Share}
            disabled={isShareCopied || !shouldAllowShare}
            onClick={onShare}
          />
        )}
        <EditorToolbarButton
          text="Format"
          renderIcon={Edit}
          onClick={onFormatCode}
        />
        <EditorToolbarButton
          text="Reset"
          renderIcon={Reset}
          onClick={onReset}
        />
      </section>
    </div>
  );
};

export default EditorToolbar;
