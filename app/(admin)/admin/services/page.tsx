"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminServicesPage.module.css";
import { Service } from "../../../lib/schemas";
import { serviceService } from "../../../lib/dependencyInjector";
import ServiceFormModal from "../../../components/ServiceFormModal";

// Admin Dashboard Component for Managing Services
const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const fetchedServices = await serviceService.fetchServices();
      setServices(fetchedServices);
      setError(null);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await serviceService.deleteService(id);
      setServices(services.filter((service) => service.serviceId !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      setError("Failed to delete service. Please try again later.");
    }
  };

  const handleOpenModal = (service?: Service) => {
    setCurrentService(service || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setCurrentService(null);
    }, 300);
    fetchServices();
  };

  if (loading) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  if (error) {
    return (
      <div className={styles.section}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.section}>
        <div className={styles.header}>
          <h1>Services</h1>
          <button
            onClick={() => handleOpenModal()}
            className={styles.createButton}
          >
            Add Service
          </button>
        </div>
        {services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          <ul className={styles.list}>
            {services.map((service) => (
              <li key={service.serviceId} className={styles.listItem}>
                <div className={styles.serviceInfo}>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <p>Duration: {service.duration} mins</p>
                  <p>Price: ${service.price}</p>
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleOpenModal(service)}
                    className={styles.button}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteService(service.serviceId)}
                    className={styles.button}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isModalOpen && (
        <ServiceFormModal
          service={currentService}
          onClose={handleCloseModal}
          isClosing={isClosing}
        />
      )}
    </>
  );
};

export default ServicesPage;
