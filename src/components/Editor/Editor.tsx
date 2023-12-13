import React, { forwardRef, lazy } from "react";
import { Extension, ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorTheme, PlaygroundParameters, PlaygroundState } from "@/types";
import { useParameter, useStorybookState } from "@storybook/manager-api";
import { ADDON_ID_FOR_PARAMETERS, DEFAULT_ADDON_PARAMETERS } from "@/consts";
const CodeMirror = lazy(() => import("@uiw/react-codemirror"));

interface EditorProps {
  type: PlaygroundState["selectedTab"];
  code: string;
  fontSize: PlaygroundState["fontSize"];
  extensions: Extension[];
  onChange: (newVal: string) => void;
}

type EditorComponent = React.ForwardRefExoticComponent<
  EditorProps & React.RefAttributes<ReactCodeMirrorRef>
>;

const Editor: EditorComponent = forwardRef(
  ({ type, code, fontSize, extensions, onChange }, ref) => {
    const { theme: storybookTheme } = useStorybookState();
    const { editorTheme: addonTheme } = useParameter<PlaygroundParameters>(
      ADDON_ID_FOR_PARAMETERS,
      DEFAULT_ADDON_PARAMETERS
    );
    const placeholder = `Insert your ${type.toUpperCase()} code here`;
    const theme: EditorTheme =
      addonTheme || storybookTheme.base === "dark" ? "dark" : "light";

    return (
      <CodeMirror
        style={{ fontSize }}
        ref={ref}
        theme={theme}
        value={code}
        extensions={extensions}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);

export default Editor;
