export const Success = () => {
  return (
    <div id="signup-form">
      {/* Title */}
      <h3 className="italic font-bold text-lg mt-8">All done!</h3>
      {/* Divider */}
      <div className="relative flex py-5 justify-center">
        <div className="w-[60px] border-t border-gray-400"></div>
      </div>
      <div className="max-w-md mb-8 py-8">
        You will be one of the first to experience Broccoli & Co. when we
        launch.
      </div>
      <button
        onClick={() => {
          // Close modal
          if (document) {
            const modalElement = document.getElementById(
              "modal"
            ) as HTMLElement & {
              close: () => void;
            };
            modalElement.close();
          }
        }}
        className="bg-white hover:bg-slate-100 mt-8 p-2 w-3/4 border border-black disabled:bg-slate-100"
      >
        OK
      </button>
    </div>
  );
};
