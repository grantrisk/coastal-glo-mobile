"use client";

import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import styles from "./AppointmentDetailsModal.module.css";
import { appointmentService } from "../../lib/dependencyInjector";
import { Appointment } from "../../lib/schemas";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import useModal from "../../hooks/useModal";
import { getPhoneLink } from "../../utils";
import { RenderAddressLink } from "../RenderAddressLinks/RenderAddressLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";

const statusOptions = ["scheduled", "completed", "canceled"] as const;
const statusEnum = z.enum(statusOptions);

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  onClose: () => void;
  isClosing: boolean;
  onAppointmentDeleted: (appointmentId: string) => void;
  onAppointmentUpdated: (updatedAppointment: Appointment) => void; // New prop
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  onClose,
  isClosing,
  onAppointmentDeleted,
  onAppointmentUpdated,
}) => {
  const confirmationModal = useModal();
  const [selectedStatus, setSelectedStatus] = useState(appointment.status);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    setIsSaveEnabled(selectedStatus !== appointment.status);
  }, [selectedStatus, appointment.status]);

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

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    if (statusEnum.safeParse(newStatus).success) {
      setSelectedStatus(newStatus as (typeof statusOptions)[number]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await appointmentService.updateAppointmentStatus(
        appointment.appointmentId,
        selectedStatus,
      );
      const updatedAppointment = { ...appointment, status: selectedStatus };
      onAppointmentUpdated(updatedAppointment);
      onClose();
    } catch (error) {
      console.error("Error updating appointment status:", error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  return (
    <>
      <Modal onClose={onClose} isClosing={isClosing}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <button
              onClick={handleOpenConfirmation}
              className={styles.trashButton}
              title="Delete Appointment"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <h2>Appointment Details</h2>
          </div>
          <p>
            <strong>Service:</strong> {appointment.service.name}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {appointment.appointmentDate.toLocaleString()}
          </p>
          {appointment.guestInfo ? (
            <>
              <p>
                <strong>Guest:</strong> {appointment.guestInfo.firstName}{" "}
                {appointment.guestInfo.lastName}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                <a
                  href={getPhoneLink(appointment.guestInfo.phone)}
                  className={styles.link}
                >
                  {appointment.guestInfo.phone}
                </a>
                ,{" "}
                <a
                  href={`mailto:${appointment.guestInfo.email}`}
                  className={styles.link}
                >
                  {appointment.guestInfo.email}
                </a>
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {appointment.guestInfo.address && (
                  <RenderAddressLink address={appointment.guestInfo.address} />
                )}
              </p>
            </>
          ) : (
            <p>
              <strong>Guest:</strong> Guest information not available
            </p>
          )}
          <p>
            <strong>Status:</strong>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className={styles.statusSelect}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </p>
          <div className={styles.buttonGroup}>
            <button
              onClick={handleSaveChanges}
              className={styles.saveButton}
              disabled={!isSaveEnabled}
            >
              Save Changes
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
