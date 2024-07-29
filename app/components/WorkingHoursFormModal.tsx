"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/WorkingHoursFormModal.module.css";
import Modal from "./Modal";
import { WorkingHours } from "../lib/schemas";

interface WorkingHoursFormModalProps {
  day: keyof WorkingHours;
  currentHours: string;
  onClose: () => void;
  onSave: (day: keyof WorkingHours, updatedHours: string) => void;
  isClosing: boolean;
}

const times = [
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

const WorkingHoursFormModal: React.FC<WorkingHoursFormModalProps> = ({
  day,
  currentHours,
  onClose,
  onSave,
  isClosing,
}) => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    if (currentHours === "Closed") {
      setStartTime("");
      setEndTime("");
    } else {
      const [start, end] = currentHours.split(" - ");
      setStartTime(start);
      setEndTime(end);
    }
  }, [currentHours]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHours =
      startTime && endTime ? `${startTime} - ${endTime}` : "Closed";
    onSave(day, updatedHours);
    onClose();
  };

  return (
    <Modal onClose={onClose} isClosing={isClosing}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSave} className={styles.form}>
          <h2>
            Update Working Hours for{" "}
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </h2>
          <label>
            Start Time:
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            >
              <option value="">Select Start Time</option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label>
            End Time:
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            >
              <option value="">Select End Time</option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default WorkingHoursFormModal;
