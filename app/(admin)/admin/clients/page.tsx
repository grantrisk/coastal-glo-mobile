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

  const getAddressLink = (address: any) => {
    const street2 = address.street2 ? `, ${address.street2}` : "";
    const encodedAddress = encodeURIComponent(
      `${address.street1}${street2}, ${address.city}, ${address.state} ${address.zipCode}`,
    );

    const isIOS = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      return {
        googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        appleMaps: `http://maps.apple.com/?q=${encodedAddress}`,
      };
    } else if (isAndroid) {
      return {
        googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      };
    } else {
      return {
        googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      };
    }
  };

  const renderAddressLink = (address: any) => {
    const addressLinks = getAddressLink(address);

    return (
      <>
        <a
          href={addressLinks.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {address.street1}
          {address.street2 && `, ${address.street2}`}, {address.city},{" "}
          {address.state} {address.zipCode}
        </a>
        {addressLinks.appleMaps && (
          <>
            {" | "}
            <a
              href={addressLinks.appleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Open in Apple Maps
            </a>
          </>
        )}
      </>
    );
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

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
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
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${client.email}`} className={styles.link}>
                      {client.email}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a href={`tel:${client.phone}`} className={styles.link}>
                      {formatPhoneNumber(client.phone)}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {renderAddressLink(client.address)}
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
                      : "No subscription available"}
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
