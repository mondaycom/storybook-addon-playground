import React from "react";
import { render } from "@testing-library/react";
import ErrorState from "../ErrorState";

describe("ErrorState", () => {
  it("should render an error message with the provided error string", () => {
    const error = "Test error";
    const { getByText } = render(<ErrorState error={error} />);
    const errorMessage = getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });
});
