import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = (callback?: () => void) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (callback) callback();
    }, 300);
  };

  return {
    isOpen,
    isClosing,
    openModal,
    closeModal,
  };
};

export default useModal;
