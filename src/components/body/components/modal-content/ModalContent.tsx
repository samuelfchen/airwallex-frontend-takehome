import { useState } from "react";
import { SignupForm } from "./SignupForm";
import { Success } from "./Success";

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
