import { useState } from "react";
import { Modal } from "./components/Modal";
import { SignupForm } from "./components/SignupForm";

export const Body = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <SignupForm />
      </Modal>
      <div className="w-full flex justify-center items-center">
        <div className="w-2/3 text-center">
          <h1 className="text-6xl font-bold mb-5">
            A better way <br />
            to enjoy every day.
          </h1>
          <h5 className="font-medium text-2xl mb-3">
            Be the first to know when we launch.
          </h5>
          <button
            className="bg-white hover:bg-slate-100 py-4 px-4 border border-black"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Request an invite
          </button>
        </div>
      </div>
    </div>
  );
};
