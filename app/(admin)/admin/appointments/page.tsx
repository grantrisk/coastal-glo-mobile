"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminAppointments.module.css";
import { z } from "zod";
import { appointmentSchema } from "../../../lib/schemas";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase"; // Ensure you have Firebase initialized in this file

// Type inference from schema
type Appointment = z.infer<typeof appointmentSchema>;

const defaultAppointments: Appointment[] = [
  {
    appointmentId: "apt1",
    userId: "usr1",
    guestInfo: undefined,
    service: {
      serviceId: "srv1",
      name: "Full Body Spray",
      description: "A full body tan spray for an even and natural look.",
      price: 50,
      duration: 30,
    },
    appointmentDate: new Date("2024-06-30T14:00:00Z"),
    status: "scheduled",
    createdAt: new Date("2024-06-01T09:00:00Z"),
    updatedAt: new Date("2024-06-01T09:00:00Z"),
  },
  {
    appointmentId: "apt2",
    userId: "usr2",
    guestInfo: {
      firstName: "Mike",
      lastName: "Ross",
      phone: "555-9021",
      email: "mike.ross@example.com",
      address: {
        street1: "789 Pine St",
        street2: undefined,
        city: "Springfield",
        state: "SP",
        zipCode: "98765",
      },
    },
    service: {
      serviceId: "srv3",
      name: "Face Tan",
      description: "Gentle face tanning for a sun-kissed glow.",
      price: 25,
      duration: 10,
    },
    appointmentDate: new Date("2024-07-05T10:30:00Z"),
    status: "scheduled",
    createdAt: new Date("2024-06-20T15:30:00Z"),
    updatedAt: new Date("2024-06-20T15:30:00Z"),
  },
];

function convertTimestamp(timestamp: any): Date {
  return new Date(timestamp.seconds * 1000);
}

// Admin Dashboard Component for Managing Appointments
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        if (querySnapshot.empty) {
          console.log("No such document!");
          setError(
            "No appointments found. Please create default appointments.",
          );
        } else {
          const fetchedAppointments = querySnapshot.docs.map((doc) => {
            const data = doc.data() as Appointment;
            return {
              ...data,
              appointmentDate: convertTimestamp(data.appointmentDate), // Convert Firestore timestamp to Date
              createdAt: convertTimestamp(data.createdAt),
              updatedAt: convertTimestamp(data.updatedAt),
            };
          });
          console.log("fetchedAppointments:", fetchedAppointments);
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

  const createDefaultAppointments = async () => {
    try {
      for (const appointment of defaultAppointments) {
        await setDoc(
          doc(db, "appointments", appointment.appointmentId),
          appointment,
        );
      }
      setAppointments(defaultAppointments);
      setError(null);
    } catch (error) {
      console.error("Error creating default appointments:", error);
      setError(
        "Failed to create default appointments. Please try again later.",
      );
    }
  };

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className={styles.section}>
        <p>{error}</p>
        <button onClick={createDefaultAppointments} className={styles.button}>
          Create Default Appointments
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.section}>
        <h2>Manage Appointments</h2>
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
