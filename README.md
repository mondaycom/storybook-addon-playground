# Storybook Addon Playground

![img.png](assets/img.png)

## How to run locally

Install dependencies and start

```bash
npm i
npm start
```

Go to [localhost:6006](http://localhost:6006)

## How to add to your Storybook project

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
      // title of your story (including category prefix)
      playgroundStoryId: "playground",
      components: {
        // ...your custom components
      },
    },
  },
};
```

### Story

Create a story with the following content:

```js
import { withPlaygroundRenderer } from "../../src/decorators";

export default {
  title: "Playground",
  decorators: [withPlaygroundRenderer],
};

export const Playground = {};
```

## Build

### Vite

Vite is used to build the local Storybook for testing and dev purposes

### Rollup

Rollup is used to build the addon for publishing

```mermaid
graph TD;
    subgraph ADDON
    A{{Rollup}}
    B[index.ts]
    C[manager.ts]

    D[Panel addon]
    E[Tool addon]

    F[withPlaygroundRenderer]
    G[PlaygroundRenderer]
    H[react-jsx-parser]

    I[Editor]
    J[useCopyToClipboard]
    K[usePlaygroundArgs]
    L[useToolbarActions]
    M[prettier]
    N[react-codemirror]

    O[Toolbar icon]

    P[Storybook Addon API]

    A -->|Entry| B
    A -->|Entry| C

    B -->|Exports| F

    P --> D
    P --> E

    E -->|Renders| O

    C -->|Registers Addons| P

    F -->|Renders in a story| G
    G ====>|Using lib| H


    D -->|Renders| I
    I ====>|Using lib| N
    I -->|Uses| L
    I -->|Uses| K

    L ===>|Using lib| M
    L -->|Uses| J
    end

    subgraph UI
    X{{Vite}}
    Z["Storybook UI (.storybook - Testing and Development)"]
    X --> Z
    end
```