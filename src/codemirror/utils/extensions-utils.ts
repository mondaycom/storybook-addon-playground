import { EditorState } from "@uiw/react-codemirror";

interface EditorStateInfo {
  cursorPos: number;
  fullLineText: string;
  lineTextUpToCursor: string;
  lineTextAfterCursor: string;
}

export function parseTagFromLineText(lineText: string): string {
  return lineText.match(/<([a-zA-Z0-9]+)/)?.[1];
}

export function extractEditorStateInfo(state: EditorState): EditorStateInfo {
  const cursorPos = state.selection.main.head;
  const line = state.doc.lineAt(cursorPos);
  const lineTextUpToCursor = line.text.substring(0, cursorPos - line.from);
  const lineTextAfterCursor = line.text.substring(cursorPos - line.from);

  return {
    cursorPos,
    fullLineText: line.text,
    lineTextUpToCursor,
    lineTextAfterCursor,
  };
}
