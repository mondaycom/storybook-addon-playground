import { useCallback, useEffect } from "react";
import usePlaygroundState from "./usePlaygroundState";
import { useStorybookApi } from "@storybook/manager-api";
import { PANEL_ID } from "@/consts";

const useAutoOpenPlayground = () => {
  const { isPlaygroundStorySelected } = usePlaygroundState();
  const { togglePanel, setSelectedPanel } = useStorybookApi();

  const openPlaygroundPanel = useCallback(() => {
    togglePanel(true);
    setSelectedPanel(PANEL_ID);
  }, [togglePanel, setSelectedPanel]);

  useEffect(() => {
    if (isPlaygroundStorySelected) {
      openPlaygroundPanel();
    }
  }, [isPlaygroundStorySelected, openPlaygroundPanel]);
};

export default useAutoOpenPlayground;
