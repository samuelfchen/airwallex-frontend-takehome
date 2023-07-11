import { useState } from "react";
import { ModalContent } from "./components/modal-content/ModalContent";

const MODAL_TRANSITION_TIME_MS = 200;

export const Body = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="w-full mx-5 text-center">
          <h1 className="mx-auto max-w-4xl font-display sm:text-5xl sm:leading-[3rem] lg:text-6xl lg:leading-[4rem] text-4xl font-bold tracking-tight sm:mb-7 mb-5">
            A{" "}
            <span className="relative whitespace-nowrap text-green-500">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-green-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative">better way</span>
            </span>{" "}
            <br />
            to enjoy every day.
          </h1>
          <h5 className="font-medium lg:text-2xl sm:text-xl text-l mb-3">
            Be the first to know when we launch.
          </h5>
          <button
            className="bg-white hover:bg-slate-100 sm:p-4 p-3 border border-black"
            onClick={() => {
              // Fetch and open DaisyUI modal
              if (document) {
                const modalElement = document.getElementById(
                  "modal"
                ) as HTMLDialogElement;
                modalElement.showModal();
                setIsModalOpen(true);
              }
            }}
          >
            Request an invite
          </button>
          {/* Modal */}
          <dialog
            id="modal"
            className="modal"
            onClose={() => {
              setTimeout(() => {
                setIsModalOpen(false);
              }, MODAL_TRANSITION_TIME_MS);
            }}
          >
            <div className="modal-box rounded-none">
              {isModalOpen && (
                <div data-testid="modal-content">
                  <ModalContent />
                </div>
              )}
            </div>
            <form
              data-testid="modal-backdrop"
              method="dialog"
              className="modal-backdrop"
            >
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};
