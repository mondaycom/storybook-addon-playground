import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

const exportEntry = "src/index.ts";
const managerEntry = "src/manager.ts";

export default {
  external: [/node_modules/],
  plugins: [resolve(), commonjs(), json(), typescript(), postcss()],
  input: [exportEntry, managerEntry],
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
    preserveModules: true,
  },
};
