export const SubmitButton = (props: { isSubmitting: boolean }) => {
  return (
    <button
      type="submit"
      className="bg-white hover:bg-slate-100 mt-8 p-2 w-full border border-black disabled:bg-slate-100"
      disabled={props.isSubmitting}
    >
      {props.isSubmitting ? "Sending, please wait..." : "Send"}
    </button>
  );
};
