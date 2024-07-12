"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/ServiceFormModal.module.css";
import Modal from "./Modal";
import { Service } from "../lib/schemas";
import { serviceService } from "../lib/dependencyInjector";

interface ServiceFormModalProps {
  service?: Service | null;
  onClose: () => void;
  isClosing: boolean;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  service,
  onClose,
  isClosing,
}) => {
  const [formData, setFormData] = useState<Omit<Service, "serviceId">>({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    recommended: false,
    isMonthly: false,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        recommended: service.recommended,
        isMonthly: service.isMonthly,
      });
    }
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]:
          name === "price" || name === "duration" ? parseFloat(value) : value,
      }));
    }
  };

  const sanitizeFormData = (data: Omit<Service, "serviceId">) => {
    const sanitizedData = { ...data };
    sanitizedData.name = sanitizedData.name.trim();
    sanitizedData.description = sanitizedData.description.trim();
    return sanitizedData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedData = sanitizeFormData(formData);
    try {
      if (service) {
        await serviceService.updateService(service.serviceId, sanitizedData);
      } else {
        await serviceService.addService({
          ...sanitizedData,
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving service data: ", error);
    }
  };

  return (
    <Modal onClose={onClose} isClosing={isClosing}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{service ? "Update Service" : "Add Service"}</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Duration (minutes):
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.checkboxLabel}>
            Recommended:
            <input
              type="checkbox"
              name="recommended"
              checked={formData.recommended}
              onChange={handleChange}
            />
          </label>
          <label className={styles.checkboxLabel}>
            Monthly Charge:
            <input
              type="checkbox"
              name="isMonthly"
              checked={formData.isMonthly}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ServiceFormModal;
