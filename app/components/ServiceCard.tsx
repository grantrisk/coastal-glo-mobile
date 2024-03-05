import React from "react";
import styles from "../../styles/ServiceCard.module.css";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  recommended?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
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
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
