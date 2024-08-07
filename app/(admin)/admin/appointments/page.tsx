"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminAppointments.module.css";
import { Appointment, Service } from "../../../lib/schemas";
import { appointmentService } from "../../../lib/dependencyInjector";
import ConfirmationModal from "../../../components/ConfirmationModal";
import useModal from "../../../hooks/useModal";
import AdminHeader from "../../../components/AdminHeader";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("date");
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<Appointment | null>(null);

  const confirmationModal = useModal();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      let fetchedAppointments = await appointmentService.fetchAllAppointments();
      fetchedAppointments = sortAppointments(fetchedAppointments, sortOption);
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to fetch appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sortedAppointments = sortAppointments(appointments, sortOption);
    setAppointments(sortedAppointments);
  }, [sortOption]);

  const updateAppointmentStatus = async (
    appointmentId: string,
    status: Appointment["status"],
  ) => {
    try {
      // FIXME: the lastUpdate field is not being updated
      await appointmentService.updateAppointmentStatus(appointmentId, status);
      setAppointments(
        appointments.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? { ...appointment, status }
            : appointment,
        ),
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
      setError("Failed to update appointment status. Please try again later.");
    }
  };

  const deleteAppointment = async (appointmentId: string) => {
    try {
      await appointmentService.deleteAppointment(appointmentId);
      setAppointments(
        appointments.filter(
          (appointment) => appointment.appointmentId !== appointmentId,
        ),
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setError("Failed to delete appointment. Please try again later.");
    }
  };

  const handleOpenConfirmation = (appointment: Appointment) => {
    setAppointmentToDelete(appointment);
    confirmationModal.openModal();
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      deleteAppointment(appointmentToDelete.appointmentId);
      confirmationModal.closeModal();
    }
  };

  function sortAppointments(
    appointments: Appointment[],
    sortOption: string,
  ): Appointment[] {
    let sortedAppointments = [...appointments]; // Create a copy to avoid mutating the original array

    switch (sortOption) {
      case "date":
        sortedAppointments.sort(
          (a, b) => a.appointmentDate.getTime() - b.appointmentDate.getTime(),
        );
        break;
      case "service":
        sortedAppointments.sort((a, b) =>
          a.service.name.localeCompare(b.service.name),
        );
        break;
      case "status":
        sortedAppointments.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    return sortedAppointments;
  }

  if (loading) {
    return <p>Loading...</p>;
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
        <AdminHeader title={"Manage Appointments"} />
        <div className={styles.sortContainer}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="date">Appointment Date</option>
            <option value="service">Service Name</option>
            <option value="status">Status</option>
          </select>
        </div>
        <ul className={styles.list}>
          {appointments.map((appointment) => (
            <li key={appointment.appointmentId} className={styles.listItem}>
              <div className={styles.appointmentHeader}>
                <span className={styles.appointmentDate}>
                  {appointment.appointmentDate.toLocaleString()}
                </span>
                <span className={styles.appointmentStatus}>
                  {appointment.status}
                </span>
              </div>
              <div className={styles.appointmentDetails}>
                <div>
                  <strong>Service:</strong> {appointment.service.name}
                </div>
                <div>
                  <strong>Price:</strong> ${appointment.service.price}
                </div>
                <div>
                  <strong>Duration:</strong> {appointment.service.duration} mins
                </div>
                {appointment.guestInfo && (
                  <div>
                    <strong>Guest:</strong> {appointment.guestInfo.firstName}{" "}
                    {appointment.guestInfo.lastName}
                  </div>
                )}
                {appointment.guestInfo && (
                  <div>
                    <strong>Contact:</strong> {appointment.guestInfo.phone},{" "}
                    {appointment.guestInfo.email}
                  </div>
                )}
              </div>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() =>
                    updateAppointmentStatus(
                      appointment.appointmentId,
                      "completed",
                    )
                  }
                  className={styles.button}
                >
                  Complete
                </button>
                <button
                  onClick={() =>
                    updateAppointmentStatus(
                      appointment.appointmentId,
                      "canceled",
                    )
                  }
                  className={styles.button}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleOpenConfirmation(appointment)}
                  className={styles.button}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
}
