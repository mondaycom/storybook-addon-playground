import { useEffect, useRef } from "react";
import { useAddonState } from "@storybook/manager-api";
import { PlaygroundState } from "@/types";
import { saveCodeToStorage } from "@/utils";
import { DEFAULT_ADDON_STATE, PANEL_ID } from "@/consts";

const SAVE_DEBOUNCE_MS = 1000;

const usePersistence = () => {
  const [state] = useAddonState<PlaygroundState>(PANEL_ID, DEFAULT_ADDON_STATE);
  const { code, hasInitialCodeLoaded } = state;
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasInitialCodeLoaded || !code) {
      return;
    }

    if (!code.jsx.trim() && !code.css.trim()) {
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveCodeToStorage(code);
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [code, hasInitialCodeLoaded]);
};

export default usePersistence;
