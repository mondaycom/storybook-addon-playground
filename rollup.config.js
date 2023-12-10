import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";

export default {
  input: ["src/index.ts", "src/manager.ts"],
  output: [
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
  ],
  external: [/node_modules/],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    scss(),
  ],
};
