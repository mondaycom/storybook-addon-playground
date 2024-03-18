import React, { useCallback } from "react";
import {
  useCopyToClipboard,
  useToolbarActions,
  usePlaygroundArgs,
  usePlaygroundState,
} from "@/hooks";
import EditorToolbarButton from "./EditorToolbarButton";
import EditorToolbarDivider from "./EditorToolbarDivider";
import { useAddonState, useStorybookApi } from "@storybook/manager-api";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";
import { PlaygroundState } from "@/types";
import styles from "./EditorToolbar.module.css";

const EditorToolbar: React.FC = () => {
  const { selectStory } = useStorybookApi();
  const { playgroundStoryId } = usePlaygroundState();

  const { updateCode, resetCode } = usePlaygroundArgs();
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );
  const { code, selectedTab, fontSize } = state;

  const selectPlaygroundStory = useCallback(() => {
    selectStory(playgroundStoryId);
  }, [selectStory, playgroundStoryId]);

  const onFontSizeChange = useCallback(
    (amount: number) => {
      setState((state) => ({
        ...state,
        fontSize: Math.max(12, Math.min(18, fontSize + amount)),
      }));
    },
    [fontSize, setState]
  );

  const { onCopy, isCopied, shouldAllowCopy } = useCopyToClipboard(code);

  const { onFormatCode, onReset } = useToolbarActions(
    code,
    updateCode,
    resetCode,
    selectedTab
  );

  return (
    <div className={styles.toolbar}>
      <EditorToolbarButton
        tooltip="Show playground view"
        icon="beaker"
        onClick={selectPlaygroundStory}
      />
      <EditorToolbarButton
        tooltip={shouldAllowCopy ? "" : "Editor is empty"}
        text={isCopied ? "Copied!" : "Copy"}
        icon={isCopied ? "check" : "copy"}
        color={isCopied ? "green" : undefined}
        disabled={isCopied || !shouldAllowCopy}
        onClick={onCopy}
      />
      <EditorToolbarButton
        text="Format"
        icon="paintbrush"
        onClick={onFormatCode}
      />
      <EditorToolbarButton text="Reset" icon="trash" onClick={onReset} />
      <EditorToolbarDivider />
      <EditorToolbarButton
        icon="add"
        smallPadding
        onClick={() => onFontSizeChange(1)}
      />
      Font
      <EditorToolbarButton
        icon="subtract"
        smallPadding
        onClick={() => onFontSizeChange(-1)}
      />
    </div>
  );
};

export default EditorToolbar;
