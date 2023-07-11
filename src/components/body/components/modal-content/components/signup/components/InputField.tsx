import { FieldError, Path, UseFormRegister, Validate } from "react-hook-form";
import { FormInput } from "../SignupForm";

export const InputField = (props: {
  placeholder?: string;
  // For react-hook-form integration
  error?: FieldError;
  register: UseFormRegister<FormInput>;
  label: Path<FormInput>;
  validate?: Validate<string, FormInput>;
}) => {
  return (
    <div data-testid={`${props.label}-input`}>
      <input
        id={props.label}
        className={`
              input input-bordered w-full rounded-none 
              ${props.error !== undefined ? "input-error" : "mb-5"}
            `}
        placeholder={props.placeholder}
        required
        {...props.register(props.label, {
          required: true,
          validate: props.validate,
        })}
      />
      {props.error !== undefined && (
        <span className="ml-4 text-sm text-red-500 italic">
          {props.error.type === "required"
            ? "This field is required."
            : props.error.message}
        </span>
      )}
    </div>
  );
};
