import React from "react";
import { render } from "@testing-library/react";
import PlaygroundRendererErrorState from "../PlaygroundRendererErrorState";

describe("PlaygroundRendererErrorState", () => {
  it("should render an error message with the provided error string", () => {
    const error = "Test error";
    const { getByText } = render(
      <PlaygroundRendererErrorState error={error} />
    );
    const errorMessage = getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });
});
