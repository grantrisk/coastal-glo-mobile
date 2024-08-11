"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import styles from "../../styles/AppointmentDetailsModal.module.css";
import { appointmentService } from "../lib/dependencyInjector";
import { Appointment } from "../lib/schemas";
import ConfirmationModal from "./ConfirmationModal";
import useModal from "../hooks/useModal";

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  onClose: () => void;
  isClosing: boolean;
  onAppointmentDeleted: (appointmentId: string) => void;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  onClose,
  isClosing,
  onAppointmentDeleted,
}) => {
  const confirmationModal = useModal();

  const handleDelete = async () => {
    try {
      await appointmentService.deleteAppointment(appointment.appointmentId);
      onAppointmentDeleted(appointment.appointmentId);
      confirmationModal.closeModal();
      onClose();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  const handleOpenConfirmation = () => {
    confirmationModal.openModal();
  };

  return (
    <>
      <Modal onClose={onClose} isClosing={isClosing}>
        <div className={styles.modalContent}>
          <h2>Appointment Details</h2>
          <p>
            <strong>Service:</strong> {appointment.service.name}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {appointment.appointmentDate.toLocaleString()}
          </p>
          <p>
            <strong>Guest:</strong> {appointment.guestInfo?.firstName}{" "}
            {appointment.guestInfo?.lastName}
          </p>
          <p>
            <strong>Contact:</strong> {appointment.guestInfo?.phone},{" "}
            {appointment.guestInfo?.email}
          </p>
          <p>
            <strong>Status:</strong> {appointment.status}
          </p>
          <div className={styles.buttonGroup}>
            <button
              onClick={handleOpenConfirmation}
              className={styles.deleteButton}
            >
              Delete
            </button>
            <button onClick={onClose} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      </Modal>

      {confirmationModal.isOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this appointment?"
          onConfirm={handleDelete}
          onClose={() => confirmationModal.closeModal()}
          isClosing={confirmationModal.isClosing}
        />
      )}
    </>
  );
};

export default AppointmentDetailsModal;
