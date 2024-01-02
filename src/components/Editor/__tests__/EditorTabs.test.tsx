import React from "react";
import { fireEvent, render } from "@testing-library/react";
import EditorTabs from "../EditorTabs";

describe("EditorTabs", () => {
  it('should render two tabs with titles "JSX" and "CSS"', () => {
    const { getByText } = render(<EditorTabs selectedTab="jsx" />);
    expect(getByText("JSX")).toBeInTheDocument();
    expect(getByText("CSS")).toBeInTheDocument();
  });

  it('should apply the "selected" prop to the currently selected tab', () => {
    const { getByText } = render(<EditorTabs selectedTab="css" />);
    expect(getByText("CSS")).toHaveClass("selected");
    expect(getByText("JSX")).not.toHaveClass("selected");
  });

  it('should call the "onTabChange" function when a tab is clicked', () => {
    const onTabChangeMock = vi.fn();
    const { getByText } = render(
      <EditorTabs selectedTab="css" onTabChange={onTabChangeMock} />
    );
    fireEvent.click(getByText("JSX"));
    expect(onTabChangeMock).toHaveBeenCalledOnce();
    expect(onTabChangeMock).toHaveBeenCalledWith("jsx");
  });
});
