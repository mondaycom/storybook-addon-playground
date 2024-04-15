import {
  extractAlreadyUsedProps,
  isInsideAttribute,
  isInsideOpenTag,
  getNewTagContext,
  shouldTriggerPropSuggestions,
} from "../autocomplete-utils";
import { describe } from "vitest";

describe("autocomplete-utils", () => {
  describe("getNewTagContext", () => {
    it('should return an empty string if just "<" is typed', () => {
      expect(getNewTagContext("<")).toBe("");
    });

    it("should return the partial tag name if in the middle of typing a tag", () => {
      expect(getNewTagContext("<Butt")).toBe("Butt");
    });

    it("should return null if the text does not contain a tag context", () => {
      expect(getNewTagContext("Just some random text")).toBe(null);
    });

    it("should handle multiple tags correctly and return the latest context if cursor is at the end", () => {
      expect(getNewTagContext("<div><span><Button")).toBe("Button");
    });

    it("should return null if tag is completed", () => {
      expect(getNewTagContext("<div>")).toBe(null);
    });

    it("should return null if tag is completed and closed with matching tag", () => {
      expect(getNewTagContext("<div></div>")).toBe(null);
    });

    it("should return null if complete tag contains attributes", () => {
      expect(getNewTagContext("<div className='myClass'>")).toBe(null);
    });

    it("should return null if incomplete tag contains attributes", () => {
      expect(getNewTagContext("<div className='myClass'")).toBe(null);
    });

    it("should return null there is text after the tag closed", () => {
      expect(getNewTagContext("<Button>click me")).toBe(null);
    });
  });

  describe("isInsideOpenTag", () => {
    it("should return false if cursor is at the end of a self-closing tag", () => {
      const text = "<Input />";
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeFalsy();
    });

    it("should return true if cursor is immediately after a tag name", () => {
      const text = "<But";
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is at the end of a complete tag name", () => {
      const text = "<Button";
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is immediately after an incomplete attribute name", () => {
      const text = "<Button dis";
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is immediately after an incomplete attribute value", () => {
      const text = '<Button disabled="true';
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is immediately after a complete attribute value", () => {
      const text = '<Button disabled="true"';
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is immediately after the tag name but before any attributes", () => {
      const text = "<Button ";
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is after a tag with multiple attributes, before closing >", () => {
      const text = '<Button color="blue" disabled';
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is just before a closing tag", () => {
      const text = "<Button></Button>";
      const cursorPos = text.indexOf("></Button>");
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return false if cursor is at tag children position", () => {
      const text = "<Button></Button>";
      const cursorPos = text.indexOf("></Button>") + 1;
      expect(isInsideOpenTag(text, cursorPos)).toBeFalsy();
    });

    it("should return true if cursor is within the open tag that has a space after the tag name and before a close bracket", () => {
      const text = "<Button >";
      const cursorPos = text.length - 1;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is behind the /> of a self-closed tag", () => {
      const text = '<Input something="else" />';
      const cursorPos = text.length - 2;
      expect(isInsideOpenTag(text, cursorPos)).toBeTruthy();
    });

    it("should return false if cursor is after the /> of a self-closed tag", () => {
      const text = '<Input something="else" />';
      const cursorPos = text.length;
      expect(isInsideOpenTag(text, cursorPos)).toBeFalsy();
    });
  });

  describe("isInsideAttribute", () => {
    it("should return true if cursor is inside an attribute's braces value", () => {
      const text = "<Component myProp={value";
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is inside an attribute's double quote value", () => {
      const text = '<Component myProp="value';
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is inside an attribute's single quote value", () => {
      const text = "<Component myProp='value";
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });

    it("should return false if cursor is outside any attribute", () => {
      const text = "<Component ";
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeFalsy();
    });

    it("should return false if cursor is right after a flag prop", () => {
      const text = "<Component disabled ";
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeFalsy();
    });

    it("should return false if cursor is at the end of a complete attribute", () => {
      const text = "<Component myProp={value} ";
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeFalsy();
    });

    it("should return true if cursor is before the close braces of a complete attribute", () => {
      const text = "<Component myProp={value} ";
      const cursorPos = text.length - 2;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is inside an incomplete complex attribute expression", () => {
      const text = '<Component myProp={{ key: "value" ';
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is inside an half-incomplete complex attribute expression", () => {
      const text = '<Component myProp={{ key: "value" }';
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is inside a complete complex attribute expression", () => {
      const text = '<Component myProp={{ key: "value" }}';
      const cursorPos = text.length - 2;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });

    it("should return false if cursor is after a complete complex attribute expression", () => {
      const text = '<Component myProp={{ key: "value" }}';
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeFalsy();
    });

    it("should return true if cursor is at the beginning of an attribute's value", () => {
      const text = "<Component myProp=";
      const cursorPos = text.length;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });

    it("should return true if cursor is inside a complete attribute's value but not at the end", () => {
      const text = '<Component myProp="completeValue" anotherProp={true} ';
      const cursorPos = text.indexOf("completeValue") + 6;
      expect(isInsideAttribute(text, cursorPos)).toBeTruthy();
    });
  });

  describe("shouldTriggerPropSuggestions", () => {
    it("should trigger prop suggestions immediately after a tag name", () => {
      const text = "<Button ";
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeTruthy();
    });

    it("should trigger prop suggestions when the cursor is after a space within a tag", () => {
      const text = "<Button disabled ";
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeTruthy();
    });

    it("should not trigger prop suggestions inside a string attribute value", () => {
      const text = '<Button label="Click me';
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeFalsy();
    });

    it("should not trigger prop suggestions inside a braces attribute value", () => {
      const text = "<Button style={{ margin: 10";
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeFalsy();
    });

    it("should trigger prop suggestions after a complete attribute with a space", () => {
      const text = "<Button disabled style={{ margin: 10 }} ";
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeTruthy();
    });

    it("should not trigger prop suggestions when the cursor is at the end of a self-closing tag", () => {
      const text = "<Input />";
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeFalsy();
    });

    it("should trigger prop suggestions when the cursor is after a flag prop without equals sign", () => {
      const text = "<Button disabled ";
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeTruthy();
    });

    it("should not trigger prop suggestions when the cursor is right after an equal sign", () => {
      const text = "<Button disabled=";
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeFalsy();
    });

    it("should trigger prop suggestions when there's a space after a completed string attribute", () => {
      const text = '<Button label="Click me" ';
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeTruthy();
    });

    it("should trigger prop suggestions when there's a space after a completed braces attribute", () => {
      const text = "<Button style={{ margin: 10 }} ";
      const cursorPos = text.length;
      expect(shouldTriggerPropSuggestions(text, cursorPos)).toBeTruthy();
    });
  });

  describe("extractAlreadyUsedProps", () => {
    it("should extract props from a simple tag", () => {
      const text = '<Button disabled style="primary" ';
      const cursorPos = text.length;
      const expectedProps = new Set(["disabled", "style"]);
      expect(extractAlreadyUsedProps(text, cursorPos)).toEqual(expectedProps);
    });

    it("should handle self-closing tags", () => {
      const text = '<Input value="Hello" />';
      const cursorPos = text.length;
      const expectedProps = new Set(["value"]);
      expect(extractAlreadyUsedProps(text, cursorPos)).toEqual(expectedProps);
    });

    it("should not include props after the cursor position", () => {
      const text =
        '<Component propBeforeCursor="value" propAfterCursor="value" />';
      const cursorPos = text.indexOf("propAfterCursor");
      const expectedProps = new Set(["propBeforeCursor"]);
      expect(extractAlreadyUsedProps(text, cursorPos)).toEqual(expectedProps);
    });

    it("should correctly handle flag props", () => {
      const text = "<Button disabled autofocus />";
      const cursorPos = text.length;
      const expectedProps = new Set(["disabled", "autofocus"]);
      expect(extractAlreadyUsedProps(text, cursorPos)).toEqual(expectedProps);
    });

    it("should handle multiple instances of the same prop as one", () => {
      const text = "<Button disabled disabled />";
      const cursorPos = text.length;
      const expectedProps = new Set(["disabled"]);
      expect(extractAlreadyUsedProps(text, cursorPos)).toEqual(expectedProps);
    });

    it("should handle props with JSX expressions", () => {
      const text = "<Component prop={someValue} anotherProp={2} />";
      const cursorPos = text.length;
      const expectedProps = new Set(["prop", "anotherProp"]);
      expect(extractAlreadyUsedProps(text, cursorPos)).toEqual(expectedProps);
    });

    // should refine the regex to handle this case
    it.skip("should not insert values from string within attribute values as new tags", () => {
      const text =
        '<Component numberProp={5} stringProp="value < with < signs" />';
      const cursorPos = text.length;
      const expectedProps = new Set(["numberProp", "stringProp"]);
      expect(extractAlreadyUsedProps(text, cursorPos)).toEqual(expectedProps);
    });

    // should refine the regex to handle this case
    it.skip("should handle complex nested structures", () => {
      const text =
        '<Parent><Child prop1="value1" /><Child prop2="value2" /></Parent>';
      const cursorPos = text.length;
      const expectedProps = new Set(["prop1"]);
      expect(extractAlreadyUsedProps(text, cursorPos)).toEqual(expectedProps);
    });
  });
});
