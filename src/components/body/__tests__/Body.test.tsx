import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Body } from "../Body";

describe("Body", () => {
  it("renders", () => {
    render(<Body />);
  });

  it("opens modal on signup button click", async () => {
    render(<Body />);

    const signupButton = screen.getByRole("button")!;

    await userEvent.click(signupButton);

    await waitFor(() => {
      expect(screen.getByTestId("modal-content")).toBeVisible();
    });
  });

  it("should unrender signup form on modal close", async () => {
    render(<Body />);

    const signupButton = screen.getByRole("button")!;

    await userEvent.click(signupButton);

    await waitFor(() => {
      expect(screen.getByTestId("modal-content")).toBeVisible();
    });

    // Close modal - note, this is simulated as jest has not implemented
    // HTMLDialogElement support, see https://github.com/jsdom/jsdom/issues/3294
    const backdrop = screen.getByRole("dialog", { hidden: true });
    fireEvent(backdrop, new Event("close"));

    await waitFor(
      () => {
        expect(screen.queryByTestId("modal-content")).toBeNull();
      },
      { timeout: 1000 }
    );
  });
});
