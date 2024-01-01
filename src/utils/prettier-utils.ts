import { format, Options } from "prettier";
import parserHtml from "prettier/parser-html";
import parserTypeScript from "prettier/parser-typescript";
import parserPostCss from "prettier/parser-postcss";

const jsxOptions: Options = {
  parser: "typescript",
  arrowParens: "avoid",
  trailingComma: "es5",
  plugins: [parserHtml, parserTypeScript],
};

const cssOptions: Options = {
  parser: "css",
  plugins: [parserPostCss],
};

export function formatJsx(code: string): string {
  return formatCode(code, jsxOptions);
}

export function formatCss(code: string): string {
  return formatCode(code, cssOptions);
}

function formatCode(code: string, options: Options): string {
  try {
    return format(code, options).replace(/;\s*$/, "");
  } catch (e) {
    throw new Error(`[Playground Error]: Error formatting code: ${e}`);
  }
}
