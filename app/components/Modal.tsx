"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Modal.module.css";

interface ModalProps {
  onClose: () => void;
  isClosing: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, isClosing }) => {
  // State to track whether the mousedown event started on the modal content
  const [isMouseDownOnModal, setIsMouseDownOnModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle the "Escape" key press to close the modal
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isClosing) {
        onClose();
      }
    };

    // Add event listener for "keydown" events
    document.addEventListener("keydown", handleEscape);

    // Add class to body to prevent scrolling when modal is open
    document.body.classList.add(styles.modalOpen);

    // Cleanup event listener and remove class from body when modal is closed
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove(styles.modalOpen);
    };
  }, [isClosing, onClose]);

  // Function to handle the mousedown event
  // Sets isMouseDownOnModal to true if the event started on the modal content, otherwise false
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && modalRef.current.contains(event.target as Node)) {
      setIsMouseDownOnModal(true);
    } else {
      setIsMouseDownOnModal(false);
    }
  };

  // Function to handle the mouseup event
  // Closes the modal only if the mousedown and mouseup events both occurred on the backdrop
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !isMouseDownOnModal &&
      event.target === event.currentTarget &&
      !isClosing
    ) {
      onClose();
    }
    // Reset isMouseDownOnModal state
    setIsMouseDownOnModal(false);
  };

  return (
    <div
      className={`${styles.modalBackdrop} ${isClosing ? styles.fadeOut : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`${styles.modalContent} ${isClosing ? styles.slideOut : ""}`}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
