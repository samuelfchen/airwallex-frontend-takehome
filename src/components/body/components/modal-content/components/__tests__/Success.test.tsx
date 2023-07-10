import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Success } from "../Success";

describe("Success", () => {
  it("calls dialog close on button press", async () => {
    render(
      <dialog id="modal" open={true}>
        <Success />
      </dialog>
    );

    const closeButton = screen.getByRole("button");
    await userEvent.click(closeButton);

    const dialog: HTMLDialogElement = screen.getByRole("dialog");
    await waitFor(() => {
      expect(dialog.open).toBe(false);
    });
  });
});
