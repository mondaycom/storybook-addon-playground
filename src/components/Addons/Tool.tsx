import React, { memo } from "react";
import { useParameter, useStorybookApi } from "@storybook/manager-api";
import { Icons, IconButton } from "@storybook/components";
import { Addon_RenderOptions } from "@storybook/types";
import { DEFAULT_ADDON_PARAMETERS } from "@/consts";
import { ADDON_ID_FOR_PARAMETERS } from "@/consts";

const Tool: React.FC<Addon_RenderOptions> = () => {
  const { selectStory } = useStorybookApi();
  const { playgroundStoryId } = useParameter(
    ADDON_ID_FOR_PARAMETERS,
    DEFAULT_ADDON_PARAMETERS
  );

  return (
    <IconButton
      placeholder="Show playground view"
      title="Show playground view"
      onClick={() => selectStory(playgroundStoryId)}
      style={{ outline: "1px dashed" }}
    >
      <Icons icon="beaker" />
    </IconButton>
  );
};

export default memo(Tool);