import React, { Suspense, useCallback } from "react";
import { Editor, EditorTabs, EditorToolbar } from "../Editor";
import {
  usePlaygroundArgs,
  useInitialCode,
  useBroadcastEditorChanges,
} from "@/hooks";
import { AddonPanel } from "@storybook/components";
import { Addon_RenderOptions } from "@storybook/types";
import { Extension } from "@uiw/react-codemirror";
import { useAddonState } from "@storybook/manager-api";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";
import { PlaygroundState, Tab } from "@/types";
import { langs } from "@uiw/codemirror-extensions-langs";
import styles from "./Panel.module.css";

const commonExtensions: Extension[] = [];
const extensions: { jsx: Extension[]; css: Extension[] } = {
  jsx: [langs.html(), langs.javascript(), ...commonExtensions],
  css: [langs.css(), ...commonExtensions],
};

const Panel: React.FC<Addon_RenderOptions> = ({ active }) => {
  useInitialCode();
  useBroadcastEditorChanges();
  const { updateCode } = usePlaygroundArgs();
  const [state, setState] = useAddonState<PlaygroundState>(
    PANEL_ID,
    DEFAULT_ADDON_STATE
  );

  const { code, selectedTab, fontSize } = state;

  const onTabChange = useCallback(
    (newTab: Tab) => {
      setState((state) => ({ ...state, selectedTab: newTab }));
    },
    [setState]
  );

  return (
    <AddonPanel active={active}>
      <div className={styles.panel}>
        <EditorToolbar />
        <div className={styles.editorWrapper}>
          <EditorTabs selectedTab={selectedTab} onTabChange={onTabChange} />
          <div className={styles.editor}>
            <Suspense fallback={"Loading Editor..."}>
              <Editor
                type={selectedTab}
                code={code[selectedTab]}
                extensions={extensions[selectedTab]}
                fontSize={fontSize}
                onChange={updateCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </AddonPanel>
  );
};

export default Panel;
