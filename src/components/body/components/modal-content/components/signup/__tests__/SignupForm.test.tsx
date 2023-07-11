import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SignupForm } from "../SignupForm";
import { server } from "./mocks/server";
import { vi } from "vitest";

describe("SignupForm", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("renders signup button", () => {
    render(
      <SignupForm
        setSuccess={() => {
          return;
        }}
      />
    );
  });

  it("has expected textbox and button labels", () => {
    render(
      <SignupForm
        setSuccess={() => {
          return;
        }}
      />
    );

    ["Full Name", "Email", "Confirm Email"].forEach((placeholder) => {
      expect(screen.getByPlaceholderText(placeholder)).not.toBeNull();
    });

    const submit = screen.getByRole("button");
    expect(submit.innerHTML).toBe("Send");
  });

  it("should require all values to be non-empty on submit", async () => {
    render(
      <SignupForm
        setSuccess={() => {
          return;
        }}
      />
    );

    const submit = screen.getByRole("button")!;
    const fullName = screen.getByTestId("fullName-input");
    const email = screen.getByTestId("email-input");
    const confirmEmail = screen.getByTestId("confirmEmail-input");
    // click button, and assert that error messages are all displayed
    await userEvent.click(submit);

    await waitFor(() => {
      expect(fullName).toHaveTextContent("This field is required.");
      expect(email).toHaveTextContent("This field is required.");
      expect(confirmEmail).toHaveTextContent("This field is required.");
    });
  });

  it("should require full name to be at least 3 characters", async () => {
    render(
      <SignupForm
        setSuccess={() => {
          return;
        }}
      />
    );

    const submit = screen.getByRole("button")!;
    const fullName = screen.getByTestId("fullName-input");

    await userEvent.type(fullName.querySelector("input")!, "Al");

    // click button, and assert that error messages are all displayed
    await userEvent.click(submit);

    await waitFor(() => {
      expect(fullName).toHaveTextContent(
        "Full name must be at least 3 characters"
      );
    });
  });

  it("should ensure that emails are valid format", async () => {
    render(
      <SignupForm
        setSuccess={() => {
          return;
        }}
      />
    );

    const submit = screen.getByRole("button")!;
    const email = screen.getByTestId("email-input");
    const confirmEmail = screen.getByTestId("confirmEmail-input");

    // click button, and assert that error messages are all displayed

    await userEvent.type(email.querySelector("input")!, "invalidEmail.com");
    await userEvent.type(
      confirmEmail.querySelector("input")!,
      "invalidEmail.com"
    );

    await userEvent.click(submit);

    await waitFor(() => {
      expect(email).toHaveTextContent("Please enter a valid email.");
      expect(confirmEmail).toHaveTextContent("Please enter a valid email.");
    });
  });

  it("should ensure that emails match", async () => {
    render(
      <SignupForm
        setSuccess={() => {
          return;
        }}
      />
    );

    const submit = screen.getByRole("button")!;
    const email = screen.getByTestId("email-input");
    const confirmEmail = screen.getByTestId("confirmEmail-input");

    // click button, and assert that error messages are all displayed
    await userEvent.click(submit);

    await userEvent.type(
      email.querySelector("input")!,
      "john.doe@airwallex.com"
    );
    await userEvent.type(
      confirmEmail.querySelector("input")!,
      "jane.doe@airwallex.com"
    );

    await waitFor(() => {
      expect(confirmEmail).toHaveTextContent("Emails should match.");
    });
  });

  it("should display API error messages", async () => {
    render(
      <SignupForm
        setSuccess={() => {
          return;
        }}
      />
    );

    const submit = screen.getByRole("button")!;
    const fullName = screen.getByTestId("fullName-input");
    const email = screen.getByTestId("email-input");
    const confirmEmail = screen.getByTestId("confirmEmail-input");

    // click button, and assert that error messages are all displayed

    await userEvent.type(fullName.querySelector("input")!, "John Doe");
    await userEvent.type(
      email.querySelector("input")!,
      "bademail@airwallex.com"
    );
    await userEvent.type(
      confirmEmail.querySelector("input")!,
      "bademail@airwallex.com"
    );

    await userEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText("Error: Bad Email.")).not.toBeNull();
    });
  });
  it("should call prop function on success", async () => {
    const setSuccessMock = vi.fn();
    render(<SignupForm setSuccess={setSuccessMock} />);

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
      expect(setSuccessMock).toBeCalledTimes(1);
    });
  });
});
