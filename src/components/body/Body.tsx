import { useState } from "react";
import { ModalContent } from "./components/modal-content/ModalContent";

const MODAL_TRANSITION_TIME_MS = 200;

export const Body = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="sm:w-2/3 w-3/4 text-center">
          <h1 className="sm:text-6xl text-4xl font-bold mb-5">
            A better way <br />
            to enjoy every day.
          </h1>
          <h5 className="font-medium text-2xl mb-3">
            Be the first to know when we launch.
          </h5>
          <button
            className="bg-white hover:bg-slate-100 py-4 px-4 border border-black"
            onClick={() => {
              // Fetch and open DaisyUI modal
              if (document) {
                const modalElement = document.getElementById(
                  "modal"
                ) as HTMLElement & {
                  showModal: () => void;
                };
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
              {isModalOpen && <ModalContent />}
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};
