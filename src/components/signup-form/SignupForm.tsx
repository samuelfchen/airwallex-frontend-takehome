import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";

export const SignupForm = () => {
  return (
    <div id="signup-form">
      {/* Title */}
      <h3 className="font-bold text-lg">Request an invite</h3>
      {/* Divider */}
      <div className="relative flex py-5 justify-center">
        <div className="w-[60px] border-t border-gray-400"></div>
      </div>
      {/* Input fields */}
      <div className="max-w-md">
        <InputField
          placeholder="Full Name"
          onChange={() => {
            return;
          }}
        />
        <InputField
          placeholder="Email"
          onChange={() => {
            return;
          }}
        />
        <InputField
          placeholder="Confirm Email"
          onChange={() => {
            return;
          }}
        />
        <SubmitButton isLoading={false} />
      </div>
    </div>
  );
};
