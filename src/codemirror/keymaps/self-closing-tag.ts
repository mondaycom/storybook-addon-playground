import { EditorSelection, EditorView } from "@uiw/react-codemirror";
import {
  getEditorStateInfo,
  parseTagFromLineText,
} from "../utils/extensions-utils";

function insertSelfClosingTagCommand(view: EditorView): boolean {
  const { state, dispatch } = view;
  const { cursorPos, lineTextUpToCursor, lineTextAfterCursor } =
    getEditorStateInfo(state);

  const tagName = parseTagFromLineText(lineTextUpToCursor);

  if (!tagName) {
    return false;
  }

  if (!isInsideOpenTag(lineTextUpToCursor)) {
    return false;
  }

  if (isFollowedByCloseTag(lineTextAfterCursor)) {
    return false;
  }

  // +2 to move in after the inserted self-closing bracket
  const newCursorPos = EditorSelection.cursor(cursorPos + 2);

  // insert self-closing tag syntax ('/>') and adjust the cursor position
  dispatch(
    state.update({
      changes: { from: cursorPos, insert: "/>" },
      selection: newCursorPos,
    })
  );

  return true;
}

function isInsideOpenTag(lineTextUpToCursor: string): boolean {
  // Checks if the cursor is within an open tag (e.g., after "<Button" or "<Button prop").
  return /<\w+[^>]*$/.test(lineTextUpToCursor);
}

function isFollowedByCloseTag(lineTextAfterCursor: string): boolean {
  // Checks if the cursor's position in the document is followed by a closing part of a tag or self-closing syntax.
  return (
    /<\/?\w+>/.test(lineTextAfterCursor) || /\/>/.test(lineTextAfterCursor)
  );
}

export default insertSelfClosingTagCommand;
