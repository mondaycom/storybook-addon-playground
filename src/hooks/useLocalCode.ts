import { useEffect } from "react";
import { fetchFromLocalStorage, saveToLocalStorage } from "@/utils";

const LOCAL_STORAGE_KEY = "storybook-addon-playground";

const useLocalCode = (code: string, updateCode: (newCode: string) => void): void => {
  useEffect(() => {
    if (code) {
      saveToLocalStorage<string>(LOCAL_STORAGE_KEY, code);
    }
  }, [code]);

  useEffect(() => {
    const storageResult = fetchFromLocalStorage<string>(LOCAL_STORAGE_KEY);
    if (storageResult) {
      updateCode(storageResult);
    }
  }, [updateCode]);
};

export default useLocalCode;
