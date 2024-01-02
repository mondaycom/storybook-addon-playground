import React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import EditorToolbarButton from "../EditorToolbarButton";

describe("EditorToolbarButton", () => {
  it("should render button correctly", () => {
    const { getByRole } = render(<EditorToolbarButton icon="trash" />);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should render text within the button", () => {
    const text = "Button text";
    const { getByRole } = render(
      <EditorToolbarButton text={text} icon="trash" />
    );
    const button = getByRole("button");
    const textElement = within(button).getByText(text);
    expect(textElement).toBeInTheDocument();
  });

  it("should render button as disabled", () => {
    const { getByRole } = render(<EditorToolbarButton icon="trash" disabled />);
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it('should call the "onClick" function when a button is clicked', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <EditorToolbarButton icon="trash" onClick={onClickMock} />
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it('should not call the "onClick" function when a button is disabled and clicked', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <EditorToolbarButton icon="trash" disabled onClick={onClickMock} />
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
