"use client";

import React, { useEffect, useState } from "react";
import styles from "./AdminServicesPage.module.css";
import { Service } from "../../../lib/schemas";
import { serviceService } from "../../../lib/dependencyInjector";
import ServiceFormModal from "../../../components/ServiceFormModal/ServiceFormModal";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import useModal from "../../../hooks/useModal";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";

// Admin Dashboard Component for Managing Services
const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  const serviceFormModal = useModal();
  const confirmationModal = useModal();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const fetchedServices = await serviceService.fetchServices();
      // Sort services by listOrder before setting them in the state
      const sortedServices = fetchedServices.sort(
        (a, b) => a.listOrder - b.listOrder,
      );
      setServices(sortedServices);
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
    serviceFormModal.openModal();
  };

  const handleOpenConfirmation = (service: Service) => {
    setServiceToDelete(service);
    confirmationModal.openModal();
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete.serviceId);
      confirmationModal.closeModal();
    }
  };

  const handleCloseServiceFormModal = () => {
    serviceFormModal.closeModal(() => {
      setCurrentService(null);
      fetchServices();
    });
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
        <AdminHeader title={"Services"}>
          <button
            onClick={() => handleOpenModal()}
            className={styles.createButton}
          >
            Add Service
          </button>
        </AdminHeader>
        {services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          <ul className={styles.list}>
            {services.map((service) => (
              <li key={service.serviceId} className={styles.listItem}>
                <div className={styles.serviceInfo}>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <p>
                    Duration:{" "}
                    {service.duration !== null
                      ? `${service.duration} mins`
                      : "N/A"}
                  </p>
                  <p>Display Order: {service.listOrder}</p>
                  <p>
                    Price:{" "}
                    {service.price !== null ? `$${service.price}` : "N/A"}
                  </p>
                  <p>Recommended: {service.recommended ? "true" : "false"}</p>{" "}
                  <p>Monthly Charge: {service.isMonthly ? "true" : "false"}</p>{" "}
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleOpenModal(service)}
                    className={styles.button}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleOpenConfirmation(service)}
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
      {serviceFormModal.isOpen && (
        <ServiceFormModal
          service={currentService}
          onClose={handleCloseServiceFormModal}
          isClosing={serviceFormModal.isClosing}
        />
      )}
      {confirmationModal.isOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this service?"
          onConfirm={handleConfirmDelete}
          onClose={() => confirmationModal.closeModal()}
          isClosing={confirmationModal.isClosing}
        />
      )}
    </>
  );
};

export default ServicesPage;
