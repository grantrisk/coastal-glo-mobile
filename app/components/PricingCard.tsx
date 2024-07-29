"use client";

import React from "react";
import styles from "../../styles/PricingCard.module.css";
import AppointmentModal from "./AppointmentModal";
import { Service, Product, serviceSchema, productSchema } from "../lib/schemas";
import useModal from "../hooks/useModal";

interface PricingCardProps {
  title: string;
  description: string;
  price?: number | null;
  recommended?: boolean;
  isService?: boolean;
  isMonthly?: boolean;
  listOrder?: number;
  serviceId?: string; // Optional, only for services
  duration?: number | null; // Optional, only for services
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
  listOrder,
}) => {
  const appointmentModal = useModal();

  const service: Service = {
    serviceId: serviceId || "",
    name: title,
    description,
    price: price ?? null,
    duration: duration ?? null,
    listOrder: listOrder || 0,
    recommended: recommended || false,
    isMonthly: isMonthly || false,
  };

  const product: Product = {
    productId: productId || "",
    name: title,
    description,
    price: price ?? null,
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
    appointmentModal.openModal();
  };

  const closeModal = () => {
    appointmentModal.closeModal();
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
            {price !== null && (
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
      {appointmentModal.isOpen && isService && (
        <AppointmentModal
          onClose={closeModal}
          service={service}
          isClosing={appointmentModal.isClosing}
        />
      )}
    </div>
  );
};

export default PricingCard;
