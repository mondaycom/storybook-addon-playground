# Storybook Addon Playground

![img.png](assets/img.png)

## How to use

### Install

```bash
npm install -D @mondaydotcomorg/storybook/addons/playground
```

### Implement

On your `.storybook/main.ts` file, add the following:

```js
const config = {
  // ...config
  addons: [
    // ...addons
    "@mondaydotcomorg/storybook/addons/playground",
  ],
};
```

On your `.storybook/preview.ts` file, add the following:

```js
const preview = {
  // ...preview
  parameters: {
    playground: {
      playgroundStoryId: "playground",
      components: {
        // ...your custom components
      },
    },
  },
};
```

Create a story with the following content:

```js
import { withPlaygroundRenderer } from "../../src/decorators";

export default {
  title: "Playground",
  decorators: [withPlaygroundRenderer],
};

export const Playground = {};
```

### Vite

Vite is used to build the local Storybook for testing and dev purposes

### Rollup

Rollup is used to build the addon for publishing
