import { ComponentEntry, StoryEntry } from "@storybook/manager-api";

export const componentEntry: ComponentEntry = {
  type: "component",
  id: "story",
  name: "Story",
  depth: 0,
  children: ["story--story"],
  isRoot: false,
  isComponent: true,
  isLeaf: false,
};

export const storyEntry: StoryEntry = {
  argTypes: {},
  args: {},
  depth: 1,
  id: "story--story",
  importPath: "path/to/story",
  initialArgs: {},
  isComponent: false,
  isLeaf: true,
  isRoot: false,
  kind: "Story",
  name: "Story",
  parameters: {},
  parent: "story",
  prepared: true,
  tags: ["story"],
  title: "Story",
  type: "story",
};
