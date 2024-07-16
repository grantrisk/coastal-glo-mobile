"use client";

import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import { Service, User, Appointment, WorkingHours } from "../../lib/schemas";

// Helper to manage form inputs for editing and creating
const useFormInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event: { target: { value: any } }) =>
    setValue(event.target.value);
  return { value, onChange: handleChange };
};

// Admin Dashboard Component
export default function Dashboard() {
  // Initialize state with empty arrays or default values matching the schemas
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
        recommended: false,
        isMonthly: false,
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
        recommended: false,
        isMonthly: false,
      },
      appointmentDate: new Date("2024-07-05T10:30:00Z"),
      status: "scheduled",
      createdAt: new Date("2024-06-20T15:30:00Z"),
      updatedAt: new Date("2024-06-20T15:30:00Z"),
    },
  ]);
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    sunday: "Closed",
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM",
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 4:00 PM",
  });
  const [clients, setClients] = useState<User[]>([
    {
      id: "usr1",
      firstName: "Jane",
      lastName: "Doe",
      phone: "555-1234",
      email: "jane.doe@example.com",
      lastSprayDate: new Date("2024-06-25"),
      lastSolutionUsed: "Medium",
      address: {
        street1: "123 Elm St",
        street2: undefined,
        city: "Springfield",
        state: "SP",
        zipCode: "98765",
      },
      subscription: {
        isActive: true,
        type: "Monthly Unlimited",
        remainingSprays: 5,
        nextBillingDate: new Date("2024-07-15"),
      },
    },
    {
      id: "usr2",
      firstName: "John",
      lastName: "Smith",
      phone: "555-5678",
      email: "john.smith@example.com",
      lastSprayDate: new Date("2024-06-20"),
      lastSolutionUsed: "Medium",
      address: {
        street1: "456 Oak St",
        street2: "Apt 9",
        city: "Springfield",
        state: "SP",
        zipCode: "98765",
      },
      subscription: {
        isActive: false,
        type: "One-Time",
        remainingSprays: 1,
        nextBillingDate: new Date("2024-08-01"),
      },
    },
  ]);
  const [services, setServices] = useState<Service[]>([
    {
      serviceId: "srv1",
      name: "Full Body Spray",
      description: "A full body tan spray for an even and natural look.",
      price: 50,
      duration: 30, // duration in minutes
      recommended: false,
      isMonthly: false,
    },
    {
      serviceId: "srv2",
      name: "Partial Body Spray",
      description: "Partial body spray for legs or arms.",
      price: 30,
      duration: 15,
      recommended: false,
      isMonthly: false,
    },
    {
      serviceId: "srv3",
      name: "Face Tan",
      description: "Gentle face tanning for a sun-kissed glow.",
      price: 25,
      duration: 10,
      recommended: false,
      isMonthly: false,
    },
  ]);

  // Example functions to manipulate the state
  const addService = (newService: Service) => {
    setServices([...services, newService]);
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    setServices(
      services.map((service) =>
        service.serviceId === id ? { ...service, ...updatedService } : service,
      ),
    );
  };

  const deleteService = (serviceId: string) => {
    setServices(services.filter((service) => service.serviceId !== serviceId));
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
              -{appointment.service.name}
              <div className={styles.buttonGroup}>
                <button className={styles.button}>Approve</button>
                <button className={styles.button}>Reject</button>
                <button className={styles.button}>Reschedule</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Working Hours</h2>
        <ul className={styles.list}>
          {Object.keys(workingHours).map((day) => (
            <li key={day} className={styles.listItem}>
              {day}: {workingHours[day as keyof WorkingHours]}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Clients</h2>
        <ul className={styles.list}>
          {clients.map((client) => (
            <li key={client.id} className={styles.listItem}>
              {client.firstName} {client.lastName} - {client.email}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Services</h2>
        <ul className={styles.list}>
          {services.map((service) => (
            <li key={service.serviceId} className={styles.listItem}>
              {service.name} - {service.duration} mins - ${service.price}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
