import { ComponentEntry, StoryEntry } from "@storybook/manager-api";

export const componentEntry: ComponentEntry = {
  type: "component",
  id: "story",
  name: "Story",
  depth: 0,
  children: ["story--story"],
  tags: ["story"],
};

export const storyEntry: StoryEntry = {
  argTypes: {},
  args: {},
  depth: 1,
  id: "story--story",
  importPath: "path/to/story",
  initialArgs: {},
  name: "Story",
  parameters: {},
  parent: "story",
  prepared: true,
  tags: ["story"],
  title: "Story",
  type: "story",
};
