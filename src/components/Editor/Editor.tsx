import React, { forwardRef, lazy } from "react";
import {
  Extension,
  ReactCodeMirrorRef,
  BasicSetupOptions,
} from "@uiw/react-codemirror";
import { Loader } from "@storybook/components";
const CodeMirror = lazy(() => import("@uiw/react-codemirror"));
import "./Editor.module.css";

interface EditorProps {
  code: string;
  onChange: (newVal: string) => void;
  placeholder?: string;
  loading?: boolean;
  theme?: "light" | "dark" | Extension;
  style?: React.CSSProperties;
  extensions?: Extension[];
  setup?: BasicSetupOptions;
}

type EditorComponent = React.ForwardRefExoticComponent<
  EditorProps & React.RefAttributes<ReactCodeMirrorRef>
>;

const Editor: EditorComponent = forwardRef(
  (
    {
      code,
      onChange,
      placeholder,
      loading,
      theme = "light",
      style,
      extensions,
      setup,
    },
    ref
  ) => {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <CodeMirror
            ref={ref}
            style={style}
            theme={theme}
            value={code}
            extensions={extensions}
            onChange={onChange}
            placeholder={placeholder}
            basicSetup={setup}
          />
        )}
      </>
    );
  }
);

export default Editor;
