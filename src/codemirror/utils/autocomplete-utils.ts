export function getNewTagContext(textUpToCursor: string): string {
  // typing `<` or `<Bu` or `<Button` should all be considered new tag contexts
  const pattern = /<([A-Za-z]*)$/;

  const match = textUpToCursor.match(pattern);
  if (match) {
    // return "" in case of `<` to suggest all components
    return match[1] || "";
  }

  return null;
}

export function isInsideOpenTag(
  fullLineText: string,
  cursorPos: number
): boolean {
  const textUpToCursor = fullLineText.substring(0, cursorPos);
  // Check explicitly for self-closing tag pattern, which should return false
  if (
    /<[A-Za-z]+(\s+[A-Za-z-]+(\s*=\s*("[^"]*"|'[^']*'|{[^}]*}))*\s*\/?>)$/.test(
      textUpToCursor
    ) &&
    /\/>$/.test(textUpToCursor)
  ) {
    return false;
  }

  // Check if the cursor is just before a closing tag, which we don't want to match
  if (/<\/[A-Za-z]+>$/.test(textUpToCursor)) {
    return false;
  }

  // Check for an open tag being typed
  return /<[A-Za-z]+[^>]*$/.test(textUpToCursor);
}

export function isInsideAttribute(
  fullLineText: string,
  cursorPos: number
): boolean {
  const textUpToCursor = fullLineText.substring(0, cursorPos);

  // Matches any JSX attribute including complex expressions within braces
  // This also matches incomplete attributes (missing closing quote/brace)
  const insideComplexExpression = /([A-Za-z-]+)\s*=\s*\{\s*[^}]*$/.test(
    textUpToCursor
  );
  if (insideComplexExpression) {
    return true;
  }

  // Matches inside quotes (single or double) that are not closed yet or have content before closing quote
  const insideQuotes = /([A-Za-z-]+)\s*=\s*["'][^"']*$/;
  if (insideQuotes.test(textUpToCursor)) {
    return true;
  }

  // Matches at the beginning of an attribute's value, immediately after '='
  const atBeginningOfValue = /([A-Za-z-]+)\s*=\s*$/;
  if (atBeginningOfValue.test(textUpToCursor)) {
    return true;
  }

  // Checks if cursor is right after a complete attribute's value but within it
  // This covers both quoted values and complex expressions that are correctly closed
  const afterCompleteValue = /([A-Za-z-]+)\s*=\s*(["'][^"']*["']|\{[^}]*})\s+$/;
  const justAfterCompleteValue =
    /([A-Za-z-]+)\s*=\s*(["'][^"']*["']|\{[^}]*})$/;
  if (
    justAfterCompleteValue.test(textUpToCursor) &&
    !afterCompleteValue.test(textUpToCursor)
  ) {
    // If just after a complete value without trailing spaces, we're still inside the attribute
    return true;
  }

  // Handles cases where the cursor is within a complete attribute's value but not at the end
  const withinCompleteValue =
    /([A-Za-z-]+)\s*=\s*["']([^"']+)["']\s+[A-Za-z-]+\s*=/;
  if (withinCompleteValue.test(fullLineText.substring(0, cursorPos + 1))) {
    return false;
  }

  return false;
}

export function shouldTriggerPropSuggestions(
  fullLineText: string,
  cursorPos: number
) {
  const isAfterSpaceOrTagName = /[ >]\s*$/.test(
    fullLineText.substring(0, cursorPos)
  );

  return isInsideOpenTag(fullLineText, cursorPos) && isAfterSpaceOrTagName;
}

export function extractAlreadyUsedProps(
  fullLineText: string,
  cursorPos: number
): Set<string> {
  const regex = /<\w+\s+([^>]+)>?/g;
  const textUpToCursor = fullLineText.substring(0, cursorPos);
  let match;
  const usedProps = new Set<string>();

  while ((match = regex.exec(textUpToCursor))) {
    match[1].split(/\s+/).forEach((prop) => {
      const [propName] = prop.split("=");
      if (
        propName &&
        !["!", "<", ">", "/"].some((char) => propName.includes(char))
      ) {
        usedProps.add(propName);
      }
    });
  }

  return usedProps;
}
