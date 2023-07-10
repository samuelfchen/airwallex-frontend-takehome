import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { InputField } from "./components/InputField";
import { SubmitButton } from "./components/SubmitButton";
import { axiosClient } from "../../../../api";
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

      props.setSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Set error message to response message
        const data = error.response.data as { errorMessage: string };
        setErrorMessage(data.errorMessage ?? "");
      }
    } finally {
      event?.preventDefault();
    }
  };
  const onError: SubmitErrorHandler<FormInput> = (_, event) => {
    event?.preventDefault();
  };

  return (
    <div id="signup-form">
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
        />
        <InputField
          placeholder="Email"
          error={errors.email}
          register={register}
          label="email"
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
          <p className="mt-4 ml-4 text-sm text-red-500 italic">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};
