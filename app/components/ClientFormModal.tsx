"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/ClientFormModal.module.css";
import Modal from "./Modal";
import { User } from "../lib/schemas";
import { clientService } from "../lib/dependencyInjector";
import { formatPhoneNumber } from "../utils";
import { createDateObject, formatDate } from "../utils";

interface ClientFormModalProps {
  client?: User | null;
  onClose: () => void;
  isClosing: boolean;
}

const defaultSubscription = {
  isActive: false,
  type: "None",
  remainingSprays: 0,
  nextBillingDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate(),
  ),
};

const ClientFormModal: React.FC<ClientFormModalProps> = ({
  client,
  onClose,
  isClosing,
}) => {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "NC",
      zipCode: "",
    },
    lastSolutionUsed: null,
    lastSprayDate: null,
    subscription: client?.subscription ? client.subscription : null,
  });

  useEffect(() => {
    if (client) {
      setFormData({
        ...client,
        subscription: client.subscription || null,
      });
    }
  }, [client]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        phone: formattedPhone,
      }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "lastSprayDate" ? createDateObject(value) : value,
    }));
  };

  const handleSubscriptionDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      subscription: {
        ...prevFormData.subscription!,
        [name]: createDateObject(value),
      },
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };

  const handleSubscriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      subscription: {
        ...prevFormData.subscription!,
        [name]: name === "isActive" ? value === "true" : value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (client) {
        await clientService.modifyClient(client.id, formData);
      } else {
        await clientService.createClient(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving client data: ", error);
    }
  };

  const addSubscription = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subscription: defaultSubscription,
    }));
  };

  const removeSubscription = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subscription: null,
    }));
  };

  return (
    <Modal onClose={onClose} isClosing={isClosing}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{client ? "Update Client" : "Add Client"}</h2>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Street:
            <input
              type="text"
              name="street1"
              value={formData.address.street1}
              onChange={handleAddressChange}
              required
            />
          </label>
          <label>
            Street 2:
            <input
              type="text"
              name="street2"
              value={formData.address.street2}
              onChange={handleAddressChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
              required
              disabled
            />
          </label>
          <label>
            Zip Code:
            <input
              type="text"
              name="zipCode"
              value={formData.address.zipCode}
              onChange={handleAddressChange}
              required
            />
          </label>
          <label>
            Last Solution Used:
            <input
              type="text"
              name="lastSolutionUsed"
              value={formData.lastSolutionUsed || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Spray Date:
            <input
              type="date"
              name="lastSprayDate"
              value={
                formData.lastSprayDate ? formatDate(formData.lastSprayDate) : ""
              }
              onChange={handleChange}
            />
          </label>
          {formData.subscription ? (
            <>
              <label>
                Subscription Type:
                <input
                  type="text"
                  name="type"
                  value={formData.subscription.type}
                  onChange={handleSubscriptionChange}
                  required
                />
              </label>
              <label>
                Subscription Status:
                <select
                  name="isActive"
                  value={formData.subscription.isActive ? "true" : "false"}
                  onChange={handleSubscriptionChange}
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </label>
              <label>
                Remaining Sprays:
                <input
                  type="number"
                  name="remainingSprays"
                  value={formData.subscription.remainingSprays}
                  onChange={handleSubscriptionChange}
                  required
                />
              </label>
              <label>
                Next Billing Date:
                <input
                  type="date"
                  name="nextBillingDate"
                  value={
                    formData.subscription.nextBillingDate
                      ? formatDate(formData.subscription.nextBillingDate)
                      : ""
                  }
                  onChange={handleSubscriptionDateChange}
                  required
                />
              </label>
              <button
                type="button"
                className={styles.removeButton}
                onClick={removeSubscription}
              >
                Remove Subscription
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.addButton}
              onClick={addSubscription}
            >
              Add Subscription
            </button>
          )}
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ClientFormModal;
