import { KeyBinding } from "@uiw/react-codemirror";
import closingBracket from "./closing-bracket";
import selfClosingTag from "./self-closing-tag";

export default [
  { key: ">", run: closingBracket },
  { key: "/", run: selfClosingTag },
] satisfies KeyBinding[];
