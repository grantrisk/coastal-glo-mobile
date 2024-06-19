"use client";

import React, { useState } from "react";
import styles from "../../styles/PricingCard.module.css";
import AppointmentModal from "./AppointmentModal";
import { z } from "zod";
import { serviceSchema, productSchema } from "../lib/schemas";

interface PricingCardProps {
  title: string;
  description: string;
  price?: number | null;
  recommended?: boolean;
  isService?: boolean;
  isMonthly?: boolean;
  serviceId?: string; // Optional, only for services
  duration?: number; // Optional, only for services
  productId?: string; // Optional, only for products
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  recommended,
  isService,
  isMonthly,
  serviceId,
  duration,
  productId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const service: z.infer<typeof serviceSchema> = {
    serviceId: serviceId || "",
    name: title,
    description,
    price: price || 0,
    duration: duration || 0,
  };

  const product: z.infer<typeof productSchema> = {
    productId: productId || "",
    name: title,
    description,
    price: price || 0,
  };

  const openModal = () => {
    if (isService) {
      const parsedService = serviceSchema.safeParse(service);
      if (!parsedService.success) {
        throw new Error("Invalid service data");
      }
    } else {
      const parsedProduct = productSchema.safeParse(product);
      if (!parsedProduct.success) {
        throw new Error("Invalid product data");
      }
    }
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
            {price !== undefined && (
              <>
                <p className={styles.price}>
                  {`$${price}`}
                  {isMonthly && " / month"}
                </p>
                {isService && (
                  <button onClick={openModal} className={styles.button}>
                    <b>SELECT</b>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && isService && (
        <AppointmentModal onClose={closeModal} service={service} />
      )}
    </div>
  );
};

export default PricingCard;
