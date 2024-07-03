"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminAppointments.module.css";
import { Appointment } from "../../../lib/schemas";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { convertTimestamp } from "../../../lib/utils";

// Admin Dashboard Component for Managing Appointments
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("date");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        if (querySnapshot.empty) {
          console.log("No such document!");
          setError("No appointments found.");
        } else {
          const fetchedAppointments = querySnapshot.docs.map((doc) => {
            const data = doc.data() as Appointment;
            return {
              ...data,
              appointmentDate: convertTimestamp(data.appointmentDate) as Date, // Convert Firestore timestamp to Date
              createdAt: convertTimestamp(data.createdAt) as Date,
              updatedAt: convertTimestamp(data.updatedAt) as Date,
            };
          });
          setAppointments(fetchedAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const sortedAppointments = sortAppointments(appointments, sortOption);
    setAppointments(sortedAppointments);
  }, [sortOption]);

  const updateAppointmentStatus = async (
    appointmentId: string,
    status: Appointment["status"],
  ) => {
    const updatedData = appointments.map((appointment) =>
      appointment.appointmentId === appointmentId
        ? { ...appointment, status }
        : appointment,
    );
    setAppointments(updatedData);

    const docRef = doc(db, "appointments", appointmentId);
    await updateDoc(docRef, { status });
  };

  const deleteAppointment = async (appointmentId: string) => {
    setAppointments(
      appointments.filter(
        (appointment) => appointment.appointmentId !== appointmentId,
      ),
    );

    const docRef = doc(db, "appointments", appointmentId);
    await deleteDoc(docRef);
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

    console.log(sortedAppointments);

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
        <h2>Manage Appointments</h2>
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
                  onClick={() => deleteAppointment(appointment.appointmentId)}
                  className={styles.button}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
