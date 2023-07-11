import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { InputField } from "./components/InputField";
import { SubmitButton } from "./components/SubmitButton";
import { axiosClient } from "../../../../../../api";
import axios from "axios";
import { useState } from "react";

export interface FormInput {
  fullName: string;
  email: string;
  confirmEmail: string;
}

export const SignupForm = (props: { setSuccess: () => void }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>();

  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit: SubmitHandler<FormInput> = async (data, event) => {
    try {
      await axiosClient.post("/prod/fake-auth", {
        name: data.fullName,
        email: data.email,
      });

      // If post does not throw, then show success screen.
      props.setSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Set error message to response message
        const data = error.response.data as { errorMessage: string };
        setErrorMessage(data.errorMessage ?? "Something went wrong.");
      }
    } finally {
      // Prevent event propagation to stop 'page refresh' on form submit
      event?.preventDefault();
    }
  };
  const onError: SubmitErrorHandler<FormInput> = (_, event) => {
    // Prevent event propagation to stop 'page refresh' on form submit
    event?.preventDefault();
  };

  return (
    <div data-testid="signup-form" id="signup-form">
      {/* Title */}
      <h3 className="italic font-bold text-lg mt-8">Request an invite</h3>
      {/* Divider */}
      <div className="relative flex py-5 justify-center">
        <div className="w-[60px] border-t border-gray-400"></div>
      </div>
      {/* Input fields */}
      <form
        className="max-w-md mb-8 text-left"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <InputField
          placeholder="Full Name"
          error={errors.fullName}
          register={register}
          label="fullName"
          validate={(val) => {
            if (val.length < 3) {
              return "Full name must be at least 3 characters.";
            }
          }}
        />
        <InputField
          placeholder="Email"
          error={errors.email}
          register={register}
          label="email"
          type="email"
          validate={(val) => {
            if (EmailValidator.validate(val) === false) {
              return "Please enter a valid email.";
            }
          }}
        />
        <InputField
          placeholder="Confirm Email"
          error={errors.confirmEmail}
          register={register}
          label="confirmEmail"
          type="email"
          validate={(val) => {
            if (EmailValidator.validate(val) === false) {
              return "Please enter a valid email.";
            } else if (watch("email") !== val) {
              return "Emails should match.";
            }
          }}
        />
        <SubmitButton isSubmitting={isSubmitting} />
        {errorMessage !== undefined && (
          <p className="mt-4 sm:mx-4 mx-0 sm:text-left text-center text-sm text-red-500 italic">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};
