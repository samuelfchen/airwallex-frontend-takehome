import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as EmailValidator from "email-validator";
import { InputField } from "./components/InputField";
import { SubmitButton } from "./components/SubmitButton";

export interface FormInput {
  fullName: string;
  email: string;
  confirmEmail: string;
}

export const SignupForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data, event) => {
    // TODO: handle success and error cases
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    event?.preventDefault();
  };
  const onError: SubmitErrorHandler<FormInput> = (errors, event) => {
    console.log("err", errors);
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
      </form>
    </div>
  );
};
