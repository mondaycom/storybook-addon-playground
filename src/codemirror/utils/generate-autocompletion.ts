import {
  DefaultValueDescriptor,
  Documentation,
  PropDescriptor,
} from "react-docgen/dist/Documentation";
const excludedProps = ["children", "data-testid", "dataTestId", "id"];

type ReactDocGenOutput = Record<string, Documentation[]>;
type PropEntry = [string, PropDescriptor];
type TsPropDescriptor = PropDescriptor["tsType"];
type JsPropDescriptor = PropDescriptor["type"];

export function generateAutocompletion(input: ReactDocGenOutput) {
  return Object.values(input)
    .flat()
    .reduce((acc, { displayName, props = {} }) => {
      return {
        ...acc,
        [displayName]: Object.entries(props).filter(filterProps).map(mapProps),
      };
    }, {});
}

function filterProps([propName]: PropEntry): boolean {
  return !excludedProps.includes(propName);
}

function mapProps([propName, propValue]: PropEntry) {
  const {
    tsType,
    type: jsType,
    required = false,
    description = "",
    defaultValue,
  } = propValue;

  return {
    [propName]: {
      type: parseType(tsType ?? jsType),
      required,
      defaultValue: parseDefaultValue(defaultValue),
      description,
    },
  };
}

function parseType(propType: JsPropDescriptor | TsPropDescriptor): unknown {
  if (!propType) {
    return "unknown";
  }

  switch (propType.name) {
    case "enum":
      if ("value" in propType && propType.value) {
        return Array.isArray(propType.value)
          ? propType.value.map((v) =>
              typeof v === "object" && "value" in v
                ? v.value.replace(/"/g, "")
                : ""
            )
          : propType.value;
      }
      break;
    case "union":
    case "arrayOf":
      if ("elements" in propType && propType.elements) {
        const elements = propType.elements
          .map((element) => parseType(element))
          .flat();
        return propType.name === "arrayOf"
          ? elements.map((el) => `${el}[]`)
          : elements;
      }
      break;
    default: {
      const raw = (propType as JsPropDescriptor).raw;
      return raw ? raw.replace(/\n/g, "") : propType.name || "unknown";
    }
  }
}

function parseDefaultValue(defaultValue: DefaultValueDescriptor) {
  if (
    !defaultValue?.value ||
    ["null", "undefined"].includes(defaultValue?.value as string)
  ) {
    return;
  }
  return defaultValue.value;
}
