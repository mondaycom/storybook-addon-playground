# Playground - Storybook Addon

This addon enhances your Storybook experience by allowing you to interactively play with your components. It's perfect for developers looking to experiment in real time, debug issues, or build complex compositions.

![img.png](assets/img.png)

## Installation

To install the addon, run one of the following commands in your project directory:

```bash
yarn add -D storybook-addon-playground
# or
npm install -D storybook-addon-playground
```

## Configuration

Add the addon to your Storybook configuration in `.storybook/main.js` or `.storybook/main.ts`:

```js
const config = {
  addons: [
    // rest of your addons ...
    "storybook-addon-playground",
  ],
};
```

The addon configuration is done through Storybook's `preview`.

Few of the parameters are required for the addon to work properly:

- `storyId`: **Required**. The story id that your playground has on Storybook.
- `components`: **Required**. An object with the components that should be rendered in the playground. The key is the component name and the value is the component itself.
- `autocompletions`: Optional. An array of autocompletions that should be used on the playground. Default is an empty array. We recommend on using `react-docgen` to generate a documentation output and run our util function on the output. You can use whatever tool you'd like as long as it matches the expected format in the addon. _Default is no autocompletions._
- `editorTheme`: Optional. The theme that should be used on the playground. _Default is your Storybook theme._
- `initialCode`: Optional. The initial code ("welcome") that should be rendered on the playground. _Default is empty editor._
- `share`: Optional. A boolean that allow users to share the code. _Default is false._

On your `.storybook/preview.ts` file, you should add something similar to the following:

```ts
import MyComponentsLibrary from "my-components-library";
import MyIconsLibrary from "my-icons-library";
import reactDocgenOutput from "./react-docgen-output.json";
import { generateAutocompletions } from "storybook-addon-playground";

const preview = {
  parameters: {
    playground: {
      storyId: "playground",
      components: { ...MyComponentsLibrary, ...MyIconsLibrary },
      autocompletions: generateAutocompletions(reactDocgenOutput),
      editorTheme: "light",
      introCode: { jsx: `<div>Welcome to my Playground!</div>`, css: "" },
    },
  },
};
```

Set up the playground environment in your Storybook stories:

```js
import { withPlayground } from "storybook-addon-playground";

export default {
  title: "Playground",
  decorators: [withPlayground],
};

export const Playground = {};
```

## Usage

To use the Playground, navigate to the Storybook UI and select a story that has the playground decorator. In your addons panel, see an interactive code editor alongside your component, where you can modify the code and immediately see your changes reflected.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

### Develop locally

Install dependencies and start

```bash
yarn
yarn start
# or
npm i
npm start
```

Go to [localhost:6006](http://localhost:6006)

### Build

#### Rollup

Rollup is used to build the addon for publishing.

#### Vite

Vite serves the build to a local Storybook for testing and dev purposes.
