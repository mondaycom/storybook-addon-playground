import { addons } from "@storybook/manager-api";
import { Addon_TypesEnum } from "@storybook/types";
import { Tool, Panel, PanelTitle } from "@/components/Addons";
import { ADDON_ID, ADDON_ID_FOR_PARAMETERS, PANEL_ID, TOOL_ID } from "./consts";
import { PlaygroundParameters } from "@/types";

addons.register(ADDON_ID, (api) => {
  function getPlaygroundStoryId() {
    const { playgroundStoryId } = (api.getCurrentParameter(
      ADDON_ID_FOR_PARAMETERS
    ) || {}) as PlaygroundParameters;
    return playgroundStoryId;
  }

  addons.add(TOOL_ID, {
    type: Addon_TypesEnum.TOOLEXTRA,
    title: null, // has no effect, but it is a must-have attr
    match: ({ storyId }) => !storyId.includes(getPlaygroundStoryId()),
    render: Tool,
  });

  addons.add(PANEL_ID, {
    type: Addon_TypesEnum.PANEL,
    title: PanelTitle,
    render: Panel,
  });
});
