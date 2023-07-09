export const InputField = (props: {
  placeholder?: string;
  onChange: (s: string) => void;
  tw?: string;
}) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder ?? ""}
      className={`input input-bordered w-full rounded-none my-2 ${
        props.tw ?? ""
      }`}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    />
  );
};
