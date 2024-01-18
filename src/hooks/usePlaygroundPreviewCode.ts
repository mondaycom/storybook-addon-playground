import { Code } from "@/types";
import { DEFAULT_ADDON_STATE, PLAYGROUND_EDITOR_CHANGED } from "@/consts";
import { useCallback, useState, useChannel } from "@storybook/preview-api";

const usePlaygroundPreviewCode = () => {
  const [code, setCode] = useState<Code>(DEFAULT_ADDON_STATE.code);

  const onEditorChange = useCallback((newCode: Code) => {
    setCode(newCode);
  }, []);

  useChannel({
    [PLAYGROUND_EDITOR_CHANGED]: onEditorChange,
  });

  return code;
};

export default usePlaygroundPreviewCode;
