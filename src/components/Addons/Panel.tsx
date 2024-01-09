import React, { Suspense } from "react";
import { Editor, EditorTabs, EditorToolbar } from "../Editor";
import {
  useInitialCode,
  useBroadcastEditorChanges,
  usePlaygroundState,
} from "@/hooks";
import { AddonPanel } from "@storybook/components";
import { Addon_RenderOptions } from "@storybook/types";
import { Extension } from "@uiw/react-codemirror";
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
  const { code, selectedTab, fontSize, updateCode, updateSelectedTab } =
    usePlaygroundState();

  return (
    <AddonPanel active={active}>
      <div className={styles.panel}>
        <EditorToolbar />
        <div className={styles.editorWrapper}>
          <EditorTabs
            selectedTab={selectedTab}
            onTabChange={updateSelectedTab}
          />
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
