import { useParameter, useStorybookState } from "@storybook/manager-api";
import { EditorTheme, PlaygroundParameters } from "@/types";
import { ADDON_ID_FOR_PARAMETERS, DEFAULT_ADDON_PARAMETERS } from "@/consts";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

type DefaultThemes = typeof githubDark | typeof githubDark;

function isBasicTheme(theme: EditorTheme): theme is "light" | "dark" {
  return typeof theme === "string" && ["light", "dark"].includes(theme);
}

function getTheme(basicThemeName: string): DefaultThemes {
  return basicThemeName === "dark" ? githubDark : githubLight;
}

const useEditorTheme = (): EditorTheme => {
  const { theme: storybookTheme } = useStorybookState();
  const { editorTheme: addonTheme } = useParameter<PlaygroundParameters>(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );
  if (isBasicTheme(addonTheme)) {
    return getTheme(addonTheme);
  }
  return addonTheme || getTheme(storybookTheme.base);
};

export default useEditorTheme;
