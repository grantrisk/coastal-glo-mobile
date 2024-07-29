import React from "react";
import styles from "../../styles/PricingCard.module.css";

const SkeletonPricingCard: React.FC = () => {
  return (
    <div className={`${styles.card} ${styles.skeletonCard}`}>
      <div className={styles.container}>
        <div className={styles.skeletonContent}>
          <div>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonDescription}></div>
          </div>
          <div className={styles.skeletonPriceContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPricingCard;
