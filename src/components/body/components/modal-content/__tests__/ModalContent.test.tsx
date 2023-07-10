import { render, screen } from "@testing-library/react";
import { ModalContent } from "../ModalContent";

describe("ModalContent", () => {
  it("renders signup button", () => {
    render(<ModalContent />);
  });

  it("loads signup form at start", () => {
    render(<ModalContent />);

    expect(screen.getByTestId("signup-form")).toBeVisible();
  });
});
