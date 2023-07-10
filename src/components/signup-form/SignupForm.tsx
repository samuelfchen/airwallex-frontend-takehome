import { useEffect, useState } from "react";
import { SubmitButton } from "./components/SubmitButton";
import _ from "lodash";
import * as EmailValidator from "email-validator";
import { InputField } from "./components/InputField";

export const SignupForm = () => {
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [confirmEmail, setConfirmEmail] = useState<string>();

  const [emailError, setEmailError] = useState<string>();
  const [fullNameError, setFullNameError] = useState<string>();
  const [confirmEmailError, setConfirmEmailError] = useState<string>();

  useEffect(() => {
    // TODO: tidy this up
    if (fullName !== undefined && fullName.length === 0) {
      setFullNameError("This field is required!");
    } else {
      setFullNameError(undefined);
    }
    // validate email and confirm email
    if (email !== undefined) {
      if (EmailValidator.validate(email)) {
        setEmailError(undefined);
      } else if (email.length === 0) {
        setEmailError("This field is required!");
      } else {
        // Invalid email
        setEmailError("Invalid email!");
      }
    }
    if (confirmEmail !== undefined && email !== undefined) {
      if (confirmEmail === email) {
        setConfirmEmailError(undefined);
      } else if (confirmEmail.length === 0) {
        setConfirmEmailError("This field is required!");
      } else {
        // Invalid email
        setConfirmEmailError("Emails should match!");
      }
    }
  }, [email, confirmEmail, fullName]);

  return (
    <div id="signup-form">
      {/* Title */}
      <h3 className="italic font-bold text-lg mt-8">Request an invite</h3>
      {/* Divider */}
      <div className="relative flex py-5 justify-center">
        <div className="w-[60px] border-t border-gray-400"></div>
      </div>
      {/* Input fields */}
      <div className="max-w-md mb-8">
        <InputField
          placeholder="Full Name"
          onValueChange={(value) => {
            setFullName(value);
          }}
          error={fullNameError}
        />
        <InputField
          placeholder="Email"
          onValueChange={(value) => {
            setEmail(value);
          }}
          error={emailError}
        />
        <InputField
          placeholder="Confirm Email"
          onValueChange={(value) => {
            setConfirmEmail(value);
          }}
          error={confirmEmailError}
        />
        <SubmitButton isLoading={false} />
      </div>
    </div>
  );
};
