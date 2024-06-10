"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/AppointmentModal.module.css";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const handleDateChange: CalendarProps["onChange"] = (date) => {
    setSelectedDate(date as Date);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle the final submission logic
    // TODO: for now reset logic and close modal
    resetModal();
    onClose();
  };

  const closeModal = () => {
    resetModal();
    onClose();
  };

  const resetModal = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setClientAddress("");
    setStep(1);
  };

  return (
    isOpen && (
      <Modal onClose={closeModal}>
        <div className={styles.modal}>
          {step === 1 && (
            <>
              <h2>Select Appointment Date and Time</h2>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className={styles.calendar}
                tileClassName={({ date, view }) => {
                  const classes = [];
                  if (view === "month") {
                    const day = date.getDay();
                    if (day === 0 || day === 6) {
                      classes.push(styles.weekend);
                    }
                    if (
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString()
                    ) {
                      classes.push(styles.selectedDate);
                    }
                  }
                  return classes.join(" ");
                }}
                maxDate={
                  new Date(new Date().setMonth(new Date().getMonth() + 1))
                }
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
              <div className={styles.buttonContainerSingle}>
                <button
                  onClick={handleNextStep}
                  className={styles.buttonRight}
                  disabled={!selectedDate || !selectedTime}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Enter Client Information</h2>
              <label htmlFor="clientName">Name:</label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={styles.input}
              />
              <label htmlFor="clientPhone">Phone:</label>
              <input
                type="phone"
                id="clientPhone"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className={styles.input}
              />
              <label htmlFor="clientEmail">Email:</label>
              <input
                type="email"
                id="clientEmail"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={styles.input}
              />
              <label htmlFor="clientAddress">Address:</label>
              <input
                type="text"
                id="clientAddress"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className={styles.input}
              />
              <div className={styles.buttonContainer}>
                <button
                  onClick={handlePreviousStep}
                  className={styles.buttonLeft}
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  className={styles.buttonRight}
                  disabled={
                    !clientName ||
                    !clientPhone ||
                    !clientEmail ||
                    !clientAddress
                  }
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Confirm Appointment</h2>
              <p>
                <strong>Service:</strong> {service}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime}
              </p>
              <p>
                <strong>Client Name:</strong> {clientName}
              </p>
              <p>
                <strong>Phone:</strong> {clientPhone}
              </p>
              <p>
                <strong>Email:</strong> {clientEmail}
              </p>
              <p>
                <strong>Address:</strong> {clientAddress}
              </p>
              <div className={styles.buttonContainer}>
                <button
                  onClick={handlePreviousStep}
                  className={styles.buttonLeft}
                >
                  Back
                </button>
                <button onClick={handleSubmit} className={styles.buttonRight}>
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    )
  );
};

export default AppointmentModal;
