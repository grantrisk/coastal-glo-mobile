"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import styles from "../../styles/SpecialClosureFormModal.module.css";
import { SpecialClosure } from "../lib/schemas";
import { formatDateTime, createDateTimeObject } from "../utils";

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
  const [formData, setFormData] = useState<Omit<SpecialClosure, "id">>({
    startTime: createDateTimeObject(new Date().toDateString()), // this defaults the time to midnight
    endTime: createDateTimeObject(new Date().toDateString()),
  });

  useEffect(() => {
    if (closure) {
      setFormData({
        startTime: new Date(closure.startTime),
        endTime: new Date(closure.endTime),
      });
    }
  }, [closure]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: createDateTimeObject(value),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    // FIXME: where there were no special closures before, creating one created a duplicate
    e.preventDefault();
    const updatedClosure: SpecialClosure = {
      id: closure?.id || "",
      ...formData,
    };
    onSave(updatedClosure);
  };

  return (
    <Modal onClose={onClose} isClosing={isClosing}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSave} className={styles.form}>
          <h2>{closure ? "Update" : "Add"} Special Closure</h2>
          <label>
            Start Time:
            <input
              type="datetime-local"
              name="startTime"
              value={formatDateTime(formData.startTime)}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="datetime-local"
              name="endTime"
              value={formatDateTime(formData.endTime)}
              onChange={handleChange}
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
