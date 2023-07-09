export const InputField = (props: {
  placeholder?: string;
  onValueChange: (s: string) => void;
  error?: string;
  tw?: string;
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder ?? ""}
        className={`input input-bordered w-full rounded-none ${
          props.error !== undefined ? "input-error" : "mb-7"
        } ${props.tw ?? ""}`}
        onChange={(e) => {
          props.onValueChange(e.target.value);
        }}
        // TODO: only perform validation on blur
      />
      {props.error !== undefined && (
        <label className="label my-0">
          <span className="label-text-alt text-red-400">{props.error}</span>
        </label>
      )}
    </div>
  );
};
