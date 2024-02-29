import React from "react";
import styles from "../../styles/ServiceCard.module.css";

interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  buttonText: string;
  recommended?: boolean;
}

// TODO: if its the request button, make it a link to the contact form or maybe open up email

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  buttonText,
  recommended,
}) => {
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
          {price && <p className={styles.price}>{price}</p>}
          <button className={styles.button}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
