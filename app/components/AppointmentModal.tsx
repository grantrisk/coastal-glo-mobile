"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/AppointmentModal.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [clientStreet, setClientStreet] = useState<string>("");
  const [clientApt, setClientApt] = useState<string>("");
  const [clientCity, setClientCity] = useState<string>("");
  const [clientZip, setClientZip] = useState<string>("");
  const [clientState, setClientState] = useState<string>("NC");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
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

  const handleSubmit = async () => {
    await toast.promise(submitAppointment(), {
      pending: {
        render() {
          return "Submitting appointment...";
        },
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      },
      success: {
        render() {
          return "Appointment submitted successfully!";
        },
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      },
      error: {
        render() {
          return "Failed to submit appointment. Please try again.";
        },
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      },
    });

    // Handle the final submission logic
    // TODO: for now reset logic and close modal
    // FIXME: clicking the close button and the submit button don't have the same behavior
    //  potentially move the modal closing animation to the pricing card area?
    closeModal();
  };

  const submitAppointment = async () => {
    // Simulate an async operation (e.g., API call)
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    console.log("Appointment submitted successfully!");
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
    setClientStreet("");
    setClientApt("");
    setClientCity("");
    setClientZip("");
    setPhoneError("");
    setEmailError("");
    setStep(1);
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6,
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setClientPhone(formattedPhoneNumber);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const checkPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    if (!validatePhoneNumber(formattedPhoneNumber)) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <Modal onClose={closeModal}>
          <div className={styles.modal}>
            {step === 1 && (
              <>
                <h2>Appointment Date and Time</h2>
                <div className={styles.dateTimeSection}>
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
                </div>
                <div className={styles.buttonContainerSingle}>
                  <button
                    onClick={handleNextStep}
                    className={`${styles.buttonRight} ${!selectedDate || !selectedTime ? styles.disabledButton : ""}`}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2>Enter Your Information</h2>
                <div className={styles.form}>
                  <label htmlFor="clientName" className={styles.label}>
                    Name:
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={styles.input}
                    placeholder={"Jane Doe"}
                  />
                  <label htmlFor="clientPhone" className={styles.label}>
                    Phone:
                  </label>
                  {phoneError && <p className={styles.error}>{phoneError}</p>}
                  <input
                    type="text"
                    id="clientPhone"
                    value={clientPhone}
                    onChange={handlePhoneChange}
                    onBlur={checkPhone}
                    className={styles.input}
                    placeholder={"(555) 555-5555"}
                  />
                  <label htmlFor="clientEmail" className={styles.label}>
                    Email:
                  </label>
                  {emailError && <p className={styles.error}>{emailError}</p>}
                  <input
                    type="email"
                    id="clientEmail"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    onBlur={checkEmail}
                    className={styles.input}
                    placeholder={"email@provider.com"}
                  />
                  <label htmlFor="clientAddress" className={styles.label}>
                    Address:
                  </label>
                  <input
                    type="text"
                    id="clientStreet"
                    value={clientStreet}
                    onChange={(e) => setClientStreet(e.target.value)}
                    className={`${styles.input} ${styles.address}`}
                    placeholder={"Address (Street Number)"}
                  />
                  <input
                    type="text"
                    id="clientApt"
                    value={clientApt}
                    onChange={(e) => setClientApt(e.target.value)}
                    className={`${styles.input} ${styles.address}`}
                    placeholder={"Address 2 (Apt. / Suite #)"}
                  />
                  <input
                    type="text"
                    id="clientCity"
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    className={`${styles.input} ${styles.address}`}
                    placeholder={"City"}
                  />
                  <input
                    type="text"
                    id="clientZip"
                    value={clientZip}
                    onChange={(e) => setClientZip(e.target.value)}
                    className={`${styles.input} ${styles.address}`}
                    placeholder={"Zip Code"}
                  />
                  <input
                    type="text"
                    id="clientState"
                    value={clientState}
                    onChange={(e) => setClientState(e.target.value)}
                    className={`${styles.input} ${styles.address}`}
                    placeholder={"State"}
                    disabled
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={handlePreviousStep}
                    className={styles.buttonLeft}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className={`${styles.buttonRight} ${
                      !clientName ||
                      !clientPhone ||
                      !clientEmail ||
                      !clientStreet ||
                      !clientCity ||
                      !clientZip
                        ? styles.disabledButton
                        : ""
                    }`}
                    disabled={
                      !clientName ||
                      !clientPhone ||
                      !clientEmail ||
                      !clientStreet ||
                      !clientCity ||
                      !clientZip
                    }
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2>Submit Appointment</h2>
                <div className={styles.review}>
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
                    <strong>Address:</strong> {clientStreet}
                    {clientApt && `, ${clientApt}`}, {clientCity}, NC{" "}
                    {clientZip}
                  </p>
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={handlePreviousStep}
                    className={styles.buttonLeft}
                  >
                    Back
                  </button>
                  <button onClick={handleSubmit} className={styles.buttonRight}>
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default AppointmentModal;
