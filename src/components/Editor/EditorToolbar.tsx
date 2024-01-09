import React, { useCallback } from "react";
import { useCopyToClipboard, usePlaygroundState } from "@/hooks";
import EditorToolbarButton from "./EditorToolbarButton";
import EditorToolbarDivider from "./EditorToolbarDivider";
import { useParameter, useStorybookApi } from "@storybook/manager-api";
import { ADDON_ID_FOR_PARAMETERS, DEFAULT_ADDON_PARAMETERS } from "@/consts";
import { PlaygroundParameters } from "@/types";
import styles from "./EditorToolbar.module.css";

const EditorToolbar: React.FC = () => {
  const { selectStory } = useStorybookApi();
  const { storyId } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );
  const { resetCode, formatCode, updateFontSize } = usePlaygroundState();
  const { onCopy, isCopied, shouldAllowCopy } = useCopyToClipboard();

  const increaseFontSize = useCallback(() => {
    updateFontSize(1);
  }, [updateFontSize]);

  const decreaseFontSize = useCallback(() => {
    updateFontSize(-1);
  }, [updateFontSize]);

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
        onClick={formatCode}
      />
      <EditorToolbarButton text="Reset" icon="trash" onClick={resetCode} />
      <EditorToolbarDivider />
      <EditorToolbarButton icon="add" smallPadding onClick={increaseFontSize} />
      Font
      <EditorToolbarButton
        icon="subtract"
        smallPadding
        onClick={decreaseFontSize}
      />
    </div>
  );
};

export default EditorToolbar;
