import React, { useCallback } from "react";
import { useToolbarActions, usePlaygroundArgs } from "@/hooks";
import EditorToolbarButton from "./EditorToolbarButton";
import EditorToolbarDivider from "./EditorToolbarDivider";
import {
  useAddonState,
  useParameter,
  useStorybookApi,
} from "@storybook/manager-api";
import {
  ADDON_ID_FOR_PARAMETERS,
  DEFAULT_ADDON_STATE,
  PANEL_ID,
  DEFAULT_ADDON_PARAMETERS,
} from "@/consts";
import { PlaygroundParameters, PlaygroundState } from "@/types";
import styles from "./EditorToolbar.module.css";

const EditorToolbar: React.FC = () => {
  const { selectStory } = useStorybookApi();
  const { storyId } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );

  const { updateCode, resetCode } = usePlaygroundArgs();
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );
  const { code, selectedTab, fontSize } = state;

  const onFontSizeChange = useCallback(
    (amount: number) => {
      setState((state) => ({
        ...state,
        fontSize: Math.max(12, Math.min(18, fontSize + amount)),
      }));
    },
    [fontSize, setState]
  );

  const { onCopy, isCopied, shouldAllowCopy, onFormatCode, onReset } =
    useToolbarActions(code, updateCode, resetCode, selectedTab);

  return (
    <div className={styles.toolbar}>
      <EditorToolbarButton
        tooltip="Show playground view"
        icon="beaker"
        onClick={() => selectStory(storyId)}
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
