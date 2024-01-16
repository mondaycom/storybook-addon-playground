import React, { forwardRef, lazy } from "react";
import { Extension, ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { Code, EditorTheme, PlaygroundState } from "@/types";
import { Loader } from "@storybook/components";
const CodeMirror = lazy(() => import("@uiw/react-codemirror"));

interface EditorProps {
  loading: boolean;
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
  (
    { loading, type, code, theme = "light", fontSize, extensions, onChange },
    ref
  ) => {
    const placeholder = `Insert your ${type.toUpperCase()} code here`;

    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <CodeMirror
            style={{ fontSize }}
            ref={ref}
            theme={theme}
            value={code}
            extensions={extensions}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      </>
    );
  }
);

export default Editor;
