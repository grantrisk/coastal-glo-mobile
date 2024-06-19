"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/AppointmentModal.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../lib/firebase"; // Import Firestore instance
import { addDoc, collection } from "firebase/firestore";
import { appointmentSchema, serviceSchema } from "../lib/schemas";
import { z } from "zod";

interface AppointmentModalProps {
  onClose: () => void;
  service: z.infer<typeof serviceSchema>;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
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
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDateChange: CalendarProps["onChange"] = (date) => {
    setSelectedDate(date as Date);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      setBtnDisabled(true);
      await toast.promise(submitAppointment(), {
        pending: "Submitting appointment...",
        success: "Appointment submitted successfully!",
        error: "Failed to submit appointment. Please try again.",
      });
      startClosingAnimation();
    } catch (error) {
      console.error("Error submitting appointment: ", error);
      setBtnDisabled(false);
    }
  };

  const submitAppointment = async () => {
    // create datetime based on selectedDate and selectedTime
    const timeParts = selectedTime?.split(":");
    const hours = parseInt(timeParts?.[0] || "0", 10);
    const minutes = parseInt(timeParts?.[1] || "0", 10);
    const selectedDateCopy = new Date(selectedDate as Date);
    selectedDateCopy.setHours(hours, minutes);

    const appointmentData: z.infer<typeof appointmentSchema> = {
      userId: null, //FIXME: Assuming guest user for now
      guestInfo: {
        firstName: clientName.split(" ")[0],
        lastName: clientName.split(" ").slice(-1)[0],
        phone: clientPhone,
        email: clientEmail,
        address: {
          street1: clientStreet,
          street2: clientApt,
          city: clientCity,
          state: clientState,
          zipCode: clientZip,
        },
      },
      service: service,
      appointmentDate: selectedDateCopy,
      status: "scheduled",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const parsedAppointment = appointmentSchema.parse(appointmentData);

    // FIXME: add App Check
    await addDoc(collection(db, "appointments"), parsedAppointment);
  };

  const startClosingAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  const closeModal = () => {
    onClose();
    resetModal();
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
    setBtnDisabled(false);
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

  const availableTimes = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  return (
    <>
      <Modal onClose={startClosingAnimation} isClosing={isClosing}>
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
                      if (date.toDateString() === new Date().toDateString()) {
                        classes.push(styles.today);
                      }
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
                  <div className={styles.timeGrid}>
                    {availableTimes.map((time) => (
                      <div
                        key={time}
                        className={`${styles.timeSlot} ${
                          selectedTime === time ? styles.selectedTimeSlot : ""
                        }`}
                        onClick={() => handleTimeClick(time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.buttonContainerSingle}>
                <button
                  onClick={handleNextStep}
                  className={`${styles.buttonRight} ${
                    !selectedDate || !selectedTime ? styles.disabledButton : ""
                  }`}
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
              <h2>Review Your Appointment</h2>
              <div className={styles.review}>
                <div className={styles.reviewSection}>
                  <h3>Service Information</h3>
                  <p>
                    <strong>Service:</strong> {service.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ${service.price}
                  </p>
                  <p>
                    <strong>Duration:</strong> {service.duration} minutes
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTime}
                  </p>
                </div>
                <div className={styles.reviewSection}>
                  <h3>Client Information</h3>
                  <p>
                    <strong>Name:</strong> {clientName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {clientPhone}
                  </p>
                  <p>
                    <strong>Email:</strong> {clientEmail}
                  </p>
                </div>
                <div className={styles.reviewSection}>
                  <h3>Address Information</h3>
                  <p>
                    <strong>Street:</strong> {clientStreet}
                  </p>
                  {clientApt && (
                    <p>
                      <strong>Unit:</strong> {clientApt}
                    </p>
                  )}
                  <p>
                    <strong>City:</strong> {clientCity}
                  </p>
                  <p>
                    <strong>State:</strong> {clientState}
                  </p>
                  <p>
                    <strong>Zip:</strong> {clientZip}
                  </p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  onClick={handlePreviousStep}
                  className={styles.buttonLeft}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className={styles.buttonRight}
                  disabled={btnDisabled}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AppointmentModal;
