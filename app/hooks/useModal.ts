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
      // FIXME: occasionally, there is a display bug where the modal will jump. Its got to be
      //  because of this timeout and callback
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
