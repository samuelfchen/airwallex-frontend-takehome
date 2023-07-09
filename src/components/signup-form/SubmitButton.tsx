export const SubmitButton = (props: { isLoading: boolean }) => {
  return (
    <button
      className="bg-white hover:bg-slate-100 mt-8 p-2 w-full border border-black"
      onClick={() => {
        return;
      }}
    >
      {props.isLoading ? "Sending, please wait..." : "Send"}
    </button>
  );
};
