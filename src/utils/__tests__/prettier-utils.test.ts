import { formatJsx, formatCss } from "@/utils";
import { expect } from "vitest";

describe("prettier-utils", () => {
  describe("formatJsx", () => {
    it("should return a correctly formatted string when given valid one-liner JSX code", () => {
      const code = "<div>Hello, World!</div>";
      const result = formatJsx(code);
      expect(result).toMatchSnapshot();
    });

    it("should return a correctly formatted string when given valid multi-liner JSX code", () => {
      const code = `<div><Button>Hello, World!</Button><Dropdown options={[{ value: 1, label: "Option 1" },{ value: 2, label: "Option 2" },{ value: 3, label: "Option 3" }]}/></div>`;
      const result = formatJsx(code);
      expect(result).toMatchSnapshot();
    });

    it("should return empty string for empty input", () => {
      const code = "";
      const expected = "";
      const result = formatJsx(code);
      expect(result).toEqual(expected);
    });

    it("should remove leading and trailing white space in the input string", () => {
      const code = "      <div>Hello, World!</div>   ";
      const result = formatJsx(code);
      expect(result).toMatchSnapshot();
    });

    it("should throw when given invalid JSX code", () => {
      const code = "<div>Hello, World!</span>";
      expect(() => {
        formatJsx(code);
      }).toThrowError();
    });

    it("should handle multi-line comments correctly", () => {
      const code = `<div><Button>Hello, World!</Button><Dropdown /*dropdown options*/ options={[{ value: 1, label: "Option 1" },{ value: 2, label: "Option 2" },{ value: 3, label: "Option 3" }]}/></div>`;
      const result = formatJsx(code);
      expect(result).toMatchSnapshot();
    });

    it("should handle single-line comments correctly", () => {
      const code = `
        <div>
            <Button>Hello, World!</Button>
            <Dropdown //dropdown options
                options={[
                    { value: 1, label: "Option 1" },{ value: 2, label: "Option 2" },{ value: 3, label: "Option 3" }]
                }/>
        </div>`;
      const result = formatJsx(code);
      expect(result).toMatchSnapshot();
    });
  });

  describe("formatCss", () => {
    it("should return a correctly formatted string when given valid one-liner CSS code", () => {
      const code = "body { color: red; }";
      const result = formatCss(code);
      expect(result).toMatchSnapshot();
    });

    it("should return a correctly formatted string when given valid multi-liner CSS code", () => {
      const code = `.container { display: flex;flex-direction: column;align-items: center; }.button { background-color: blue;color: white;padding: 10px 20px; }`;
      const result = formatCss(code);
      expect(result).toMatchSnapshot();
    });

    it("should return empty string for empty input", () => {
      const code = "";
      const expected = "";
      const result = formatCss(code);
      expect(result).toEqual(expected);
    });

    it("should remove leading and trailing white space in the input string", () => {
      const code = "      body { color: red; }      ";
      const result = formatCss(code);
      expect(result).toMatchSnapshot();
    });

    it("should throw when given invalid CSS code", () => {
      const code = "body { color: red; .{.button { background-color: blue; } }";
      expect(() => {
        formatCss(code);
      }).toThrowError();
    });

    it("should handle multi-line comments correctly", () => {
      const code = `/* Container styles */.container { display: flex;/* Flexbox properties */flex-direction: column;align-items: center; }`;
      const result = formatCss(code);
      expect(result).toMatchSnapshot();
    });

    it("should handle single-line comments correctly", () => {
      const code = `
      .button {
        
        background-color: blue;  // Button background color
      color: white;            // Button text color
        padding: 10px 20px;      // Button padding
      }
    `;
      const result = formatCss(code);
      expect(result).toMatchSnapshot();
    });
  });
});
