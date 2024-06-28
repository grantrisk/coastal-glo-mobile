"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminClients.module.css";
import { z } from "zod";
import { userSchema } from "../../../lib/schemas";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase"; // Ensure you have Firebase initialized in this file
import ClientFormModal from "../../../components/ClientFormModal";

// Type inference from schema
type User = z.infer<typeof userSchema>;

// Admin Dashboard Component for Managing Clients
export default function ClientsPage() {
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentClient, setCurrentClient] = useState<User | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const fetchedClients = querySnapshot.docs.map((doc) => {
          const data = doc.data() as User;
          return { ...data, id: doc.id };
        });
        setClients(fetchedClients);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setError("Failed to fetch clients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const updateClient = async (id: string, updatedClient: Partial<User>) => {
    try {
      const clientRef = doc(db, "clients", id);
      await updateDoc(clientRef, updatedClient);
      setClients(
        clients.map((client) =>
          client.id === id ? { ...client, ...updatedClient } : client,
        ),
      );
    } catch (error) {
      console.error("Error updating client:", error);
      setError("Failed to update client. Please try again later.");
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const clientRef = doc(db, "clients", id);
      await deleteDoc(clientRef);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
      setError("Failed to delete client. Please try again later.");
    }
  };

  const createClient = async (clientData: Omit<User, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "clients"), clientData);
      await updateDoc(docRef, { id: docRef.id }); // Update the document with the generated ID
      setClients([...clients, { ...clientData, id: docRef.id }]);
    } catch (error) {
      console.error("Error creating client:", error);
      setError("Failed to create client. Please try again later.");
    }
  };

  const handleOpenModal = (client?: User) => {
    setCurrentClient(client || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setCurrentClient(null);
    }, 300);
  };

  const handleSaveClient = (clientData: Omit<User, "id">) => {
    if (currentClient) {
      updateClient(currentClient.id, clientData);
    } else {
      createClient(clientData);
    }
    handleCloseModal();
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
        {/*TODO: come back and fix date issues with client form modal*/}
        {/*<div className={styles.header}>
          <h2>Clients</h2>
          <button
            onClick={() => handleOpenModal()}
            className={styles.createButton}
          >
            Add Client
          </button>
        </div>*/}
        {clients.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          <ul className={styles.list}>
            {clients.map((client) => (
              <li key={client.id} className={styles.listItem}>
                <div className={styles.clientInfo}>
                  <h3>
                    {client.firstName} {client.lastName}
                  </h3>
                  <p>
                    <strong>Email:</strong> {client.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {client.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {client.address.street1},{" "}
                    {client.address.city}, {client.address.state}{" "}
                    {client.address.zipCode}
                  </p>
                  {client.subscription && (
                    <>
                      <p>
                        <strong>Subscription:</strong>{" "}
                        {client.subscription.type} (
                        {client.subscription.isActive ? "Active" : "Inactive"})
                      </p>
                      <p>
                        <strong>Remaining Sprays:</strong>{" "}
                        {client.subscription.remainingSprays}
                      </p>
                      <p>
                        <strong>Next Billing Date:</strong>{" "}
                        {new Date(
                          client.subscription.nextBillingDate,
                        ).toLocaleDateString()}
                      </p>
                    </>
                  )}
                  <p>
                    <strong>Last Spray Date:</strong>{" "}
                    {client.lastSprayDate
                      ? new Date(client.lastSprayDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className={styles.buttonGroup}>
                  {/*TODO come back and fix date issue*/}
                  {/*<button
                    onClick={() => handleOpenModal(client)}
                    className={styles.button}
                  >
                    Update
                  </button>*/}
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
        )}
      </div>
      {isModalOpen && (
        <ClientFormModal
          client={currentClient}
          onClose={handleCloseModal}
          onSave={handleSaveClient}
          isClosing={isClosing}
        />
      )}
    </>
  );
}
