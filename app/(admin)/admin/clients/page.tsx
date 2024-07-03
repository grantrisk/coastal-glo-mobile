"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminClients.module.css";
import { User } from "../../../lib/schemas";
import clientService from "../../../services/clientService";
import ClientFormModal from "../../../components/ClientFormModal";

// Admin Dashboard Component for Managing Clients
const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentClient, setCurrentClient] = useState<User | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const fetchedClients = await clientService.fetchAllClients();
      console.log(fetchedClients);
      setClients(fetchedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError("Failed to fetch clients. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await clientService.removeClient(id);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
      setError("Failed to delete client. Please try again later.");
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
    fetchClients();
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
        <div className={styles.header}>
          <h2>Clients</h2>
          <button
            onClick={() => handleOpenModal()}
            className={styles.createButton}
          >
            Add Client
          </button>
        </div>
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
                  {/*{client.subscription && (
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
                        {client.subscription.nextBillingDate
                          ? client.subscription.nextBillingDate.toDateString()
                          : "N/A"}
                      </p>
                    </>
                  )}*/}
                  <p>
                    <strong>Last Spray Date:</strong>{" "}
                    {client.lastSprayDate
                      ? client.lastSprayDate.toDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleOpenModal(client)}
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
        )}
      </div>
      {isModalOpen && (
        <ClientFormModal
          client={currentClient}
          onClose={handleCloseModal}
          isClosing={isClosing}
        />
      )}
    </>
  );
};

export default ClientsPage;
