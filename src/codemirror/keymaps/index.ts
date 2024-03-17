import { KeyBinding } from "@uiw/react-codemirror";
import closingBracket from "./closing-bracket";

export default [{ key: ">", run: closingBracket }] satisfies KeyBinding[];
