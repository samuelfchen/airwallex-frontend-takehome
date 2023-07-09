import { ReactNode } from "react";

export const Modal = (props: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  children?: ReactNode;
}) => {
  if (props.isOpen) props.setIsOpen(false);

  return <>{props.children}</>;
};
