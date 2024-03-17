import {
  startCompletion,
  CompletionContext,
  CompletionResult,
  Completion,
  autocompletion,
} from "@codemirror/autocomplete";
import { getEditorStateInfo } from "../utils/extensions-utils";
import { AutocompletionsMetadata } from "@/types";

function isNewTagContext(lineText: string): boolean {
  return /<\w*$/.test(lineText);
}

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

function extractAlreadyUsedProps(
  fullLineText: string,
  cursorPos: number
): Set<string> {
  const tagStart = fullLineText.lastIndexOf("<", cursorPos);
  let tagEnd = fullLineText.indexOf(">", cursorPos);
  if (tagEnd === -1) {
    // tags that aren't closed yet
    tagEnd = fullLineText.length;
  }

  const tagContent = fullLineText.substring(tagStart, tagEnd);

  // props in the format propName="value", propName={value}, and just propName (flag-boolean)
  const propRegex = /(\w+)(?=\s*=|\s*\/>|>|$)/g;
  const usedProps = new Set<string>();
  let match;

  while ((match = propRegex.exec(tagContent))) {
    usedProps.add(match[1]);
  }

  return usedProps;
}

function generatePropCompletions(
  componentName: keyof AutocompletionsMetadata,
  options: AutocompletionsMetadata,
  partialPropName: string,
  usedProps: Set<string>,
  lineTextUpToCursor: string
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
      boost: required ? 1 : 0,
      detail: Array.isArray(type) ? type.join(" | ") : type,
      info:
        (description ? `${description}` : "") +
        (description && defaultValue ? " | " : "") +
        (defaultValue ? ` Defaults to: ${defaultValue}` : ""),
      section: `${componentName}'s props`,
      type: required ? "required" : "property",
      apply: (view, _completion, from, to) => {
        const applyText = type === "string" ? `${name}=""` : `${name}={}`;
        const applyPrefix = lineTextUpToCursor.endsWith(" ") ? "" : " ";
        const textToInsert = applyPrefix + applyText;

        const transaction = view.state.update({
          changes: {
            from,
            to,
            insert: textToInsert,
          },
          selection: { anchor: from + textToInsert.length - 1 },
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

  if (isNewTagContext(lineTextUpToCursor)) {
    // if the cursor is in a new tag context, generate component name completions
    const partialComponentName =
      /<(\w*)$/.exec(lineTextUpToCursor)?.[1] || null;
    if (partialComponentName) {
      from -= partialComponentName.length;
      completions = generateComponentNameCompletions(
        partialComponentName,
        options
      );
    } else if (lineTextUpToCursor.endsWith("<")) {
      completions = generateComponentNameCompletions("", options);
    }
  } else {
    // otherwise, generate prop completions
    const usedProps = extractAlreadyUsedProps(fullLineText, cursorPos);
    const match = lineTextUpToCursor.match(/<(\w+)\s[\s\S]*?(\w*)$/);
    if (match) {
      const [, componentName, partialPropName] = match;
      completions = generatePropCompletions(
        componentName,
        options,
        partialPropName,
        usedProps,
        lineTextUpToCursor
      );
    }
  }

  if (completions.length === 0) {
    return null;
  }

  return {
    from,
    to: cursorPos,
    options: completions,
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
