"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import styles from "../../styles/SpecialClosureFormModal.module.css";
import { SpecialClosure } from "../lib/schemas";

interface SpecialClosureFormModalProps {
  closure: SpecialClosure | null;
  onClose: () => void;
  onSave: (closure: SpecialClosure) => void;
  isClosing: boolean;
}

const SpecialClosureFormModal: React.FC<SpecialClosureFormModalProps> = ({
  closure,
  onClose,
  onSave,
  isClosing,
}) => {
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    if (closure) {
      setDate(closure.date.toISOString().split("T")[0]);
      setStartTime(closure.startTime);
      setEndTime(closure.endTime);
    }
  }, [closure]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedClosure: SpecialClosure = {
      id: closure?.id || "",
      date: new Date(date),
      startTime,
      endTime,
    };
    onSave(updatedClosure);
  };

  return (
    <Modal onClose={onClose} isClosing={isClosing}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSave} className={styles.form}>
          <h2>{closure ? "Update" : "Add"} Special Closure</h2>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SpecialClosureFormModal;
