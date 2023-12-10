import React, { forwardRef, lazy } from "react";
import { Extension, ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { PlaygroundState } from "@/types";
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
    const placeholder = `Insert your ${type.toUpperCase()} code here`;

    return (
      <CodeMirror
        style={{ fontSize }}
        ref={ref}
        theme="dark"
        value={code}
        extensions={extensions}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);

export default Editor;
