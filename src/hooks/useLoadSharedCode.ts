import { useEffect } from "react";
import { getPaste } from "@/utils";
import { useStorybookState } from "@storybook/manager-api";

const useLoadSharedCode = (updateCode: (newCode: string) => void) => {
  const storybookState = useStorybookState();
  const uid =
    storybookState?.customQueryParams?.myQueryParamThatIShouldDecideOn ||
    "fdK02ndy"; // TODO fake uid to test

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function fetch() {
      if (!uid) return;
      const pasteResult = await getPaste(uid);
      if (pasteResult) {
        updateCode(pasteResult);
      }
    }
    // fetch();
  }, [uid, updateCode]);
};

export default useLoadSharedCode;
