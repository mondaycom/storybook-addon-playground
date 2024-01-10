import { useParameter, useStorybookState } from "@storybook/manager-api";
import { EditorTheme, PlaygroundParameters } from "@/types";
import { ADDON_ID_FOR_PARAMETERS, DEFAULT_ADDON_PARAMETERS } from "@/consts";

const useEditorTheme = (): EditorTheme => {
  const { theme: storybookTheme } = useStorybookState();
  const { editorTheme: addonTheme } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );
  return addonTheme || (storybookTheme.base === "dark" ? "dark" : "light");
};

export default useEditorTheme;
