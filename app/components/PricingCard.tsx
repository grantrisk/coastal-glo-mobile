"use client";

import React, { useState } from "react";
import styles from "../../styles/PricingCard.module.css";
import AppointmentModal from "./AppointmentModal";

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={title}
      />
    </div>
  );
};

export default PricingCard;
