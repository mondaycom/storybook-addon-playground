import React from "react";
import { fireEvent, render } from "@testing-library/react";
import EditorTab from "../EditorTab";

describe("EditorTab", () => {
  const title = "Test title";

  it("should render a tab with the title passed as prop", () => {
    const { getByText } = render(<EditorTab title={title} />);
    expect(getByText(title)).toBeInTheDocument();
  });

  it("should apply the 'selected' class to the tab if selected prop is true", () => {
    const { getByText } = render(<EditorTab title={title} selected />);
    expect(getByText(title)).toHaveClass("selected");
  });

  it("should call onClick when tab is clicked", () => {
    const onClickMock = vi.fn();
    const { getByText } = render(
      <EditorTab title={title} onClick={onClickMock} />
    );
    fireEvent.click(getByText(title));
    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it("should not call onClick when tab is clicked and already selected", () => {
    const onClickMock = vi.fn();
    const { getByText } = render(
      <EditorTab title={title} selected onClick={onClickMock} />
    );
    fireEvent.click(getByText(title));
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
