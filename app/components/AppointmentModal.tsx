"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/AppointmentModal.module.css";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateChange: CalendarProps["onChange"] = (date) => {
    setSelectedDate(date as Date);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    isOpen && (
      <Modal onClose={onClose}>
        <div className={styles.modal}>
          <h2>Select Appointment Date and Time</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className={styles.calendar}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
            minDate={new Date()}
          />
          {selectedDate && (
            <div className={styles.timePicker}>
              <label htmlFor="time">Select Time:</label>
              <select
                id="time"
                onChange={handleTimeChange}
                value={selectedTime || ""}
                className={styles.timeSelect}
              >
                <option value="">Select a time</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
          )}
          <button onClick={onClose} className={styles.button}>
            Confirm
          </button>
        </div>
      </Modal>
    )
  );
};

export default AppointmentModal;
