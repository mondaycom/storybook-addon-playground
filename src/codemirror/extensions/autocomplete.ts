import {
  startCompletion,
  CompletionContext,
  CompletionResult,
  Completion,
  autocompletion,
} from "@codemirror/autocomplete";
import { getEditorStateInfo } from "../utils/extensions-utils";
import { AutocompletionsMetadata } from "@/types";
import {
  getNewTagContext,
  shouldTriggerPropSuggestions,
  extractAlreadyUsedProps,
  isInsideAttribute,
} from "../utils/autocomplete-utils";

function generateComponentNameCompletions(
  partialName: string,
  options: AutocompletionsMetadata
): Completion[] {
  return Object.keys(options)
    .filter((componentName) =>
      componentName.toLowerCase().startsWith(partialName.toLowerCase())
    )
    .map((componentName) => ({
      label: componentName,
      section: "Components",
      type: "keyword",
      apply: (view, completion, from, to) => {
        // insert the component name and a space
        const insertText = `${completion.label} `;
        view.dispatch({
          changes: { from, to, insert: insertText },
          // move the cursor to the end of the new inserted text
          selection: { anchor: from + insertText.length },
        });

        // we need to trigger autocompletion to immediately show prop completions after inserting the component name
        requestAnimationFrame(() => {
          startCompletion(view);
        });
      },
    }));
}

function generatePropCompletions(
  componentName: keyof AutocompletionsMetadata,
  options: AutocompletionsMetadata,
  partialPropName: string,
  usedProps: Set<string>
): Completion[] {
  const componentProps = options[componentName];
  if (!componentProps?.length) {
    return [];
  }

  const normalizedProps = componentProps.flatMap((propItem) =>
    Object.entries(propItem).map(([name, propInfo]) => ({ name, ...propInfo }))
  );

  return normalizedProps
    .filter(
      ({ name }) => !usedProps.has(name) && name.startsWith(partialPropName)
    )
    .map(({ name, type, required, defaultValue, description }) => ({
      label: name,
      boost: required ? 1 : 0, // move required props to the top of the list
      detail: Array.isArray(type) ? type.join(" | ") : type,
      // show description and default value in the completion tooltip
      info:
        (description ? `${description}` : "") +
        (description && defaultValue ? " | " : "") +
        (defaultValue ? ` Defaults to: ${defaultValue}` : ""),
      section: `${componentName}'s props`, // group props by component name
      type: required ? "required" : "property", // property won't have * next to it
      apply: (view, _completion, from, to) => {
        const textToInsert = type === "string" ? `${name}=""` : `${name}={}`;
        const replaceFrom = from - partialPropName.length;

        const transaction = view.state.update({
          changes: {
            from: replaceFrom,
            to,
            insert: textToInsert,
          },
          selection: { anchor: replaceFrom + textToInsert.length - 1 },
        });
        view.dispatch(transaction); // Dispatch the transaction to apply changes and set cursor
      },
    }));
}

function playgroundAutocompletion(
  context: CompletionContext,
  options: AutocompletionsMetadata
): CompletionResult | null {
  const { state } = context;
  const { cursorPos, fullLineText, lineTextUpToCursor } =
    getEditorStateInfo(state);

  let completions: Completion[] = [];
  let from = cursorPos;

  if (isInsideAttribute(fullLineText, cursorPos)) {
    // never show suggestions from any kind inside attributes
    return null;
  }

  const newTagName = getNewTagContext(lineTextUpToCursor);
  if (newTagName !== null) {
    // if the cursor is in a new tag context, generate component name completions
    completions = generateComponentNameCompletions(newTagName, options);
    if (newTagName !== "") {
      from -= newTagName.length;
    }
  } else {
    // otherwise, generate prop completions
    if (!shouldTriggerPropSuggestions(fullLineText, cursorPos)) {
      return null;
    }
    const match = lineTextUpToCursor.match(/<(\w+)\s[\s\S]*?(\w*)$/);
    if (!match) {
      return null;
    }
    const usedProps = extractAlreadyUsedProps(fullLineText, cursorPos);
    const [, componentName, partialPropName] = match;
    completions = generatePropCompletions(
      componentName,
      options,
      partialPropName,
      usedProps
    );
  }

  if (completions.length === 0) {
    return null;
  }

  return {
    from,
    to: cursorPos,
    options: completions,
    validFor: /^[\w-]*$/,
  };
}

export default (options: AutocompletionsMetadata) =>
  autocompletion({
    override: [
      (context: CompletionContext) =>
        playgroundAutocompletion(context, options),
    ],
    tooltipClass: () => "playground-autocompletion-dialog",
    optionClass: () => "playground-autocompletion-option",
  });
