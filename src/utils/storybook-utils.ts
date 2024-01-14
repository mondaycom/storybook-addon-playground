import { HashEntry } from "@storybook/manager-api";

export function getStoryId(resolvedEntry: HashEntry): string {
  if (!resolvedEntry) {
    return null;
  }
  if (resolvedEntry.type === "component") {
    return resolvedEntry.children[0];
  }
  return resolvedEntry.id;
}
