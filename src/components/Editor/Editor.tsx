import React, { forwardRef, lazy } from "react";
import { Extension, ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { Code, EditorTheme, PlaygroundState } from "@/types";
const CodeMirror = lazy(() => import("@uiw/react-codemirror"));

interface EditorProps {
  type: PlaygroundState["selectedTab"];
  code: Code["jsx"] | Code["css"];
  theme?: EditorTheme;
  fontSize: PlaygroundState["fontSize"];
  extensions: Extension[];
  onChange: (newVal: Code["jsx"] | Code["css"]) => void;
}

type EditorComponent = React.ForwardRefExoticComponent<
  EditorProps & React.RefAttributes<ReactCodeMirrorRef>
>;

const Editor: EditorComponent = forwardRef(
  ({ type, code, theme = "light", fontSize, extensions, onChange }, ref) => {
    const placeholder = `Insert your ${type.toUpperCase()} code here`;

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
