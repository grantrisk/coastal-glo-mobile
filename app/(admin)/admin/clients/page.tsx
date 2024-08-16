"use client";

import React, { useEffect, useState } from "react";
import styles from "./AdminClients.module.css";
import { User } from "../../../lib/schemas";
import { clientService } from "../../../lib/dependencyInjector";
import ClientFormModal from "../../../components/ClientFormModal/ClientFormModal";
import { formatPhoneNumber, getPhoneLink } from "../../../utils";
import useModal from "../../../hooks/useModal";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import { RenderAddressLink } from "../../../components/RenderAddressLinks/RenderAddressLinks";

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentClient, setCurrentClient] = useState<User | null>(null);
  const [clientToDelete, setClientToDelete] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const clientFormModal = useModal();
  const confirmationModal = useModal();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const fetchedClients = await clientService.fetchAllClients();
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
    clientFormModal.openModal();
  };

  const handleOpenConfirmation = (client: User) => {
    setClientToDelete(client);
    confirmationModal.openModal();
  };

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      deleteClient(clientToDelete.id);
      confirmationModal.closeModal();
    }
  };

  const handleCloseModal = () => {
    clientFormModal.closeModal(() => {
      setCurrentClient(null);
    });
    fetchClients();
  };

  const renderSubscription = (subscription: any) => {
    if (subscription) {
      return (
        <div className={styles.subscriptionInfo}>
          <p>
            <strong>Subscription Type:</strong> {subscription.type}
          </p>
          <p>
            <strong>Active:</strong> {subscription.isActive ? "Yes" : "No"}
          </p>
          <p>
            <strong>Remaining Sprays:</strong> {subscription.remainingSprays}
          </p>
          <p>
            <strong>Next Billing Date:</strong>{" "}
            {subscription.nextBillingDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return <p>No subscription available.</p>;
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      `${client.firstName} ${client.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
        <AdminHeader title={"Clients"}>
          <button
            onClick={() => handleOpenModal()}
            className={styles.createButton}
          >
            Add Client
          </button>
        </AdminHeader>
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {filteredClients.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          <ul className={styles.list}>
            {filteredClients.map((client) => (
              <li key={client.id} className={styles.listItem}>
                <div className={styles.clientInfo}>
                  <h3>
                    {client.firstName} {client.lastName}
                  </h3>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${client.email}`} className={styles.link}>
                      {client.email}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a
                      href={getPhoneLink(client.phone)}
                      className={styles.link}
                    >
                      {formatPhoneNumber(client.phone)}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {RenderAddressLink({ address: client.address })}
                  </p>
                  <p>
                    <strong>Last Solution Used:</strong>{" "}
                    {client.lastSolutionUsed || "N/A"}
                  </p>
                  <p>
                    <strong>Last Spray Date:</strong>{" "}
                    {client.lastSprayDate
                      ? client.lastSprayDate.toDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Subscription:</strong>{" "}
                    {client.subscription
                      ? renderSubscription(client.subscription)
                      : "No subscription selected"}
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
                    onClick={() => handleOpenConfirmation(client)}
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
      {clientFormModal.isOpen && (
        <ClientFormModal
          client={currentClient}
          onClose={handleCloseModal}
          isClosing={clientFormModal.isClosing}
        />
      )}
      {confirmationModal.isOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this client?"
          onConfirm={handleConfirmDelete}
          onClose={() => confirmationModal.closeModal()}
          isClosing={confirmationModal.isClosing}
        />
      )}
    </>
  );
};

export default ClientsPage;
