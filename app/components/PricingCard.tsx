import React from "react";
import styles from "../../styles/PricingCard.module.css";
import Link from "next/link";

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
              <Link
                href={"https://coastalglomobile.glossgenius.com/services"}
                prefetch
                target={"_blank"}
                className={styles.button}
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
