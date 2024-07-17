"use client";

import React from "react";
import Modal from "./Modal";
import styles from "../../styles/ConfirmationModal.module.css";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  isClosing: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onClose,
  isClosing,
}) => {
  return (
    <Modal onClose={onClose} isClosing={isClosing}>
      <div className={styles.modalContent}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
