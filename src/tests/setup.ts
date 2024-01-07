import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

vi.mock("@storybook/components");

afterEach(() => {
  cleanup();
});
