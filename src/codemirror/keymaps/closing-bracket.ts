import { EditorSelection, EditorView } from "@uiw/react-codemirror";
import {
  getEditorStateInfo,
  parseTagFromLineText,
} from "../utils/extensions-utils";

function insertAutoClosingTagCommand(view: EditorView): boolean {
  const { state, dispatch } = view;
  const { cursorPos, fullLineText, lineTextUpToCursor, lineTextAfterCursor } =
    getEditorStateInfo(state);

  const tagName = parseTagFromLineText(lineTextUpToCursor);

  if (!tagName) {
    return false;
  }

  if (isSelfClosingTag(fullLineText)) {
    return false;
  }

  if (isInsertingContentInsideTags(lineTextAfterCursor)) {
    return false;
  }

  if (
    lineTextUpToCursor.trim().endsWith("/") ||
    lineTextAfterCursor.startsWith(">")
  ) {
    return false;
  }

  // +1 to move in between the inserted closing bracket and the closing tag
  const newCursorPos = EditorSelection.cursor(cursorPos + 1);

  dispatch(
    state.update({
      changes: { from: cursorPos, insert: `></${tagName}>` },
      selection: newCursorPos,
    })
  );

  return true;
}

function isSelfClosingTag(lineText: string): boolean {
  return /<\w+(\s+\w+="[^"]*")*\s*\/>$/.test(lineText);
}

function isInsertingContentInsideTags(lineTextAfterCursor: string): boolean {
  // check if there's a closing tag after the cursor (meaning the inserted `>` is part of the content)
  return /<\/[a-zA-Z0-9]+>/.test(lineTextAfterCursor);
}

export default insertAutoClosingTagCommand;
