import React, { Suspense, useMemo, useRef } from "react";
import { Editor, EditorToolbar } from "../Editor";
import {
  useInitialCode,
  useBroadcastEditorChanges,
  useAutoOpenPlayground,
  useEditorTheme,
  usePlaygroundArgs,
  usePersistence,
} from "@/hooks";
import { AddonPanel } from "@storybook/components";
import { Addon_RenderOptions } from "@storybook/types";
import { Extension, keymap, ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { useAddonState, useParameter } from "@storybook/manager-api";
import {
  ADDON_ID_FOR_PARAMETERS,
  DEFAULT_ADDON_PARAMETERS,
  DEFAULT_ADDON_STATE,
  EDITOR_STATE_FIELDS,
  PANEL_ID,
} from "@/consts";
import { PlaygroundParameters, PlaygroundState, Tab } from "@/types";
import { langs } from "@uiw/codemirror-extensions-langs";
import styles from "./Panel.module.css";
import { autocomplete as playgroundAutocompletion } from "@/codemirror/extensions";
import playgroundKeymaps from "@/codemirror/keymaps";

const Panel: React.FC<Addon_RenderOptions> = ({ active }) => {
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  useInitialCode();
  useBroadcastEditorChanges();
  useAutoOpenPlayground();
  usePersistence();
  const theme = useEditorTheme();
  const { updateCode } = usePlaygroundArgs();
  const { autocompletions } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );
  const [state] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);

  const extensions = useMemo<Record<Tab, Extension[]>>(
    () => ({
      jsx: [
        playgroundAutocompletion(autocompletions),
        keymap.of(playgroundKeymaps),
        langs.javascript({ jsx: true, typescript: true }),
      ],
      css: [langs.css()],
    }),
    [autocompletions]
  );

  const { code, selectedTab, hasInitialCodeLoaded, editorState } = state;

  const editorInitialState = useMemo(
    () => ({
      json: editorState[selectedTab],
      fields: EDITOR_STATE_FIELDS,
    }),
    [editorState, selectedTab]
  );

  return (
    <AddonPanel active={active}>
      <div className={styles.panel}>
        <EditorToolbar editorRef={editorRef} />
        <div className={styles.editorWrapper}>
          <div className={styles.editor}>
            <Suspense fallback={"Loading Editor..."}>
              <Editor
                key={selectedTab}
                ref={editorRef}
                loading={!hasInitialCodeLoaded}
                placeholder={`Insert your ${selectedTab.toUpperCase()} code here`}
                code={code[selectedTab]}
                theme={theme}
                extensions={extensions[selectedTab]}
                style={{ fontSize: 13 }}
                onChange={updateCode}
                initialState={editorInitialState}
                setup={{
                  foldGutter: false,
                }}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </AddonPanel>
  );
};

export default Panel;
