"use client";

import styles from "../../../styles/AdminDashboard.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase"; // Adjust the path according to your project structure
import { onAuthStateChanged, User } from "firebase/auth";

interface WorkingHours {
  [key: string]: string;
}

interface Appointment {
  id: number;
  date: string;
  clientName: string;
  service: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
}

interface Service {
  id: number;
  name: string;
  duration: string;
  price: string;
}

export default function Dashboard() {
  const navigation = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      date: "2024-06-21",
      clientName: "Jane Doe",
      service: "Full Body Spray",
    },
    {
      id: 2,
      date: "2024-06-22",
      clientName: "John Smith",
      service: "Partial Spray",
    },
  ]);
  const [workingHours] = useState<WorkingHours>({
    Monday: "9:00 AM - 5:00 PM",
    Tuesday: "9:00 AM - 5:00 PM",
    Wednesday: "9:00 AM - 5:00 PM",
    Thursday: "9:00 AM - 5:00 PM",
    Friday: "9:00 AM - 5:00 PM",
    Saturday: "10:00 AM - 4:00 PM",
    Sunday: "Closed",
  });
  const [clients] = useState<Client[]>([
    { id: 1, name: "Jane Doe", email: "jane@example.com" },
    { id: 2, name: "John Smith", email: "john@example.com" },
  ]);
  const [services] = useState<Service[]>([
    { id: 1, name: "Full Body Spray", duration: "30 mins", price: "$40" },
    { id: 2, name: "Partial Spray", duration: "20 mins", price: "$25" },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigation.push("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Only render if user is authenticated
  return user ? (
    <main className={styles.dashboardMain}>
      <section className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
      </section>

      <nav className={styles.dashboardNav}>
        <ul>
          <li>Working Hours</li>
          <li>Manage Appointments</li>
          <li>Clients</li>
          <li>Services</li>
          <li>Reports</li>
        </ul>
      </nav>

      <section className={styles.dashboardContent}>
        <div className={styles.section}>
          <h2>Manage Appointments</h2>
          <ul className={styles.list}>
            {appointments.map((appointment) => (
              <li key={appointment.id} className={styles.listItem}>
                {appointment.date} - {appointment.clientName} -{" "}
                {appointment.service}
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
                {client.name} - {client.email}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Services</h2>
          <ul className={styles.list}>
            {services.map((service) => (
              <li key={service.id} className={styles.listItem}>
                {service.name} - {service.duration} - {service.price}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  ) : null; // Or you can render a loading indicator or a redirect message
}
