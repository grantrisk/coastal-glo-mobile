"use client";

import React, { useState } from "react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { z } from "zod";
import { userSchema } from "../../../lib/schemas";

// Type inference from schema
type User = z.infer<typeof userSchema>;

// Admin Dashboard Component for Managing Clients
export default function ClientsPage() {
  const [clients, setClients] = useState<User[]>([
    {
      id: "usr1",
      firstName: "Jane",
      lastName: "Doe",
      phone: "555-1234",
      email: "jane.doe@example.com",
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

  const updateClient = (id: string, updatedClient: Partial<User>) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, ...updatedClient } : client,
      ),
    );
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  return (
    <>
      <div className={styles.section}>
        <h2>Clients</h2>
        <ul className={styles.list}>
          {clients.map((client) => (
            <li key={client.id} className={styles.listItem}>
              {client.firstName} {client.lastName} - {client.email}
              <div className={styles.buttonGroup}>
                <button
                  onClick={() =>
                    updateClient(client.id, {
                      email: "updated.email@example.com",
                    })
                  }
                  className={styles.button}
                >
                  Update
                </button>
                <button
                  onClick={() => deleteClient(client.id)}
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
