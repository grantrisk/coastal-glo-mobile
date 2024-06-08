"use client";

import React, { useState } from "react";
import styles from "../../styles/PricingCard.module.css";
import Modal from "./Modal"; // Assuming you have a Modal component
import Calendar, { CalendarProps } from "react-calendar"; // You need to install this package or use a similar one
import "react-calendar/dist/Calendar.css"; // Import calendar styles

interface PricingCardProps {
  title: string;
  description: string;
  price?: string;
  recommended?: boolean;
  service?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  recommended,
  service = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateChange: CalendarProps["onChange"] = (date) => {
    setSelectedDate(date as Date);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    <div className={`${styles.card} ${recommended ? styles.recommended : ""}`}>
      {recommended && (
        <div className={styles.recommendedLabel}>RECOMMENDED</div>
      )}
      <div className={styles.container}>
        <div className={styles.content}>
          {recommended && (
            <div>
              <div className={styles.lineAnimation}></div>
            </div>
          )}
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.priceContainer}>
            <p className={styles.price}>{price}</p>
            {service && (
              <button onClick={openModal} className={styles.button}>
                <b>SELECT</b>
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
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
            <button onClick={closeModal} className={styles.button}>
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PricingCard;
