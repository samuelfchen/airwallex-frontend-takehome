import { useState } from "react";
import { SignupForm } from "./components/SignupForm";
import { Success } from "./components/Success";

export const ModalContent = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <>
      {isSubmitted ? (
        <Success />
      ) : (
        <SignupForm setSuccess={() => setIsSubmitted(true)} />
      )}
    </>
  );
};
