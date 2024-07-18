"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import styles from "../../styles/SpecialClosureFormModal.module.css";
import { SpecialClosure } from "../lib/schemas";
import { createDateObject, formatDate } from "../utils";

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
    date: new Date(),
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (closure) {
      setFormData({
        date: closure.date,
        startTime: closure.startTime,
        endTime: closure.endTime,
      });
    }
  }, [closure]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "date" ? createDateObject(value) : value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
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
            Date:
            <input
              type="date"
              name="date"
              value={formatDate(formData.date)}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
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
