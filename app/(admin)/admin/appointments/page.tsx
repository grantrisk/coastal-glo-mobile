"use client";

import React, { useState } from "react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { z } from "zod";
import { appointmentSchema } from "../../../lib/schemas";

// Type inference from schema
type Appointment = z.infer<typeof appointmentSchema>;

// Admin Dashboard Component for Managing Appointments
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
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
  ]);

  const updateAppointmentStatus = (
    appointmentId: string,
    status: "scheduled" | "completed" | "canceled",
  ) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.appointmentId === appointmentId
          ? { ...appointment, status }
          : appointment,
      ),
    );
  };

  const deleteAppointment = (appointmentId: string) => {
    setAppointments(
      appointments.filter(
        (appointment) => appointment.appointmentId !== appointmentId,
      ),
    );
  };

  return (
    <>
      <div className={styles.section}>
        <h2>Manage Appointments</h2>
        <ul className={styles.list}>
          {appointments.map((appointment) => (
            <li key={appointment.appointmentId} className={styles.listItem}>
              {appointment.appointmentDate.toISOString().split("T")[0]} -
              {appointment.guestInfo
                ? appointment.guestInfo.firstName +
                  " " +
                  appointment.guestInfo.lastName
                : "Guest"}{" "}
              - {appointment.service.name}
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
