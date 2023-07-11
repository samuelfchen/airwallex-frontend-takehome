import { render, screen, waitFor } from "@testing-library/react";

import { ModalContent } from "../ModalContent";
import { server } from "../components/signup/__tests__/mocks/server";
import userEvent from "@testing-library/user-event";

describe("ModalContent", () => {
  it("renders", () => {
    render(<ModalContent />);
  });

  it("loads signup form at start", () => {
    render(<ModalContent />);

    expect(screen.getByTestId("signup-form")).toBeVisible();
  });

  it("switches to success page upon successful signup", async () => {
    server.listen();

    render(<ModalContent />);
    const submit = screen.getByRole("button")!;
    const fullName = screen.getByTestId("fullName-input");
    const email = screen.getByTestId("email-input");
    const confirmEmail = screen.getByTestId("confirmEmail-input");

    // click button, and assert that error messages are all displayed

    await userEvent.type(fullName.querySelector("input")!, "John Doe");
    await userEvent.type(
      email.querySelector("input")!,
      "john.doe@airwallex.com"
    );
    await userEvent.type(
      confirmEmail.querySelector("input")!,
      "john.doe@airwallex.com"
    );

    await userEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByTestId("success-modal")).not.toBeNull();
    });

    server.close();
  });
});
