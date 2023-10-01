import { addons, types } from "@storybook/manager-api";
import { ADDON_ID, PANEL_ID } from "./constants";
import Panel from "./Panel";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Playground",
    match: ({ viewMode }) => {
      return viewMode === "story";
    },
    render: Panel,
  });
});
