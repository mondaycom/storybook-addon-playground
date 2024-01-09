import { getStoryId } from "@/utils";
import { HashEntry } from "@storybook/manager-api";
import { componentEntry, storyEntry } from "./storybook-utils.test.helpers";

describe("id-utils", () => {
  describe("getStoryId", () => {
    it("should return the resolvedEntry first child when the type is 'component'", () => {
      const result = getStoryId(componentEntry);
      expect(result).toBe("story--story");
    });

    it("should return the resolvedEntry id when the type is 'story'", () => {
      const result = getStoryId(storyEntry);
      expect(result).toBe("story--story");
    });

    it("should return null when resolvedEntry is null", () => {
      const resolvedEntry: HashEntry = null;
      const result = getStoryId(resolvedEntry);
      expect(result).toBeNull();
    });
  });
});
