import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import fs from "fs";

function loadEntries() {
  const packageJson = fs.readFileSync("./package.json", "utf8");
  const parsed = JSON.parse(packageJson);
  return parsed.bundler || {};
}

const { exportEntries = [], managerEntries = [] } = loadEntries();

function generateConfig(entries, generateDts = false) {
  return {
    external: [/node_modules/],
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: generateDts,
            declarationMap: generateDts,
          },
        },
      }),
      postcss(),
    ],
    input: entries,
    output: {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
  };
}

export default [
  generateConfig(exportEntries, true),
  generateConfig(managerEntries),
];
