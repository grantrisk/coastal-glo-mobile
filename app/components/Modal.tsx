"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/Modal.module.css";

interface ModalProps {
  onClose: () => void;
  isClosing: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, isClosing }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isClosing) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isClosing, onClose]);

  return (
    <div
      className={`${styles.modalBackdrop} ${isClosing ? styles.fadeOut : ""}`}
    >
      <div
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
