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
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
      });
    }
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "price" || name === "duration" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (service) {
        await serviceService.updateService(service.serviceId, formData);
      } else {
        await serviceService.addService({
          ...formData,
          serviceId: Math.random().toString(36).substr(2, 9),
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
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ServiceFormModal;
