"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/ClientFormModal.module.css";
import Modal from "./Modal";
import { z } from "zod";
import { userSchema } from "../lib/schemas";
import { convertTimestamp } from "../lib/utils";

// Type inference from schema
type User = z.infer<typeof userSchema>;

interface ClientFormModalProps {
  client?: User | null;
  onClose: () => void;
  onSave: (clientData: Omit<User, "id">) => void;
  isClosing: boolean;
}

const defaultSubscription = {
  isActive: false,
  type: "None",
  remainingSprays: 0,
  nextBillingDate: new Date(),
};

const ClientFormModal: React.FC<ClientFormModalProps> = ({
  client,
  onClose,
  onSave,
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
    lastSprayDate: null,
    subscription: defaultSubscription,
  });

  useEffect(() => {
    if (client) {
      setFormData({
        ...client,
        lastSprayDate: convertTimestamp(client.lastSprayDate),
        subscription: client.subscription || defaultSubscription,
      });
    }
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("====", name, value);
    // convert date to date object
    if (name === "lastSprayDate") {
      setFormData({
        ...formData,
        lastSprayDate: new Date(value),
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubscriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      subscription: {
        ...formData.subscription,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
          {/*<label>
            Next Billing Date:
            <input
              type="date"
              name="nextBillingDate"
              value={
                convertTimestamp(formData.subscription.nextBillingDate)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={handleSubscriptionChange}
              required
            />
          </label>*/}
          <label>
            Last Spray Date:
            <input
              type="date"
              name="lastSprayDate"
              value={
                formData.lastSprayDate !== null
                  ? formData.lastSprayDate.toISOString().split("T")[0]
                  : ""
              }
              /*value={
                              formData.lastSprayDate !== null
                                ? convertTimestamp(formData.lastSprayDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }*/
              /*value={
                              formData.lastSprayDate instanceof Date &&
                              !isNaN(formData.lastSprayDate.getTime())
                                ? formData.lastSprayDate.toISOString().split("T")[0]
                                : ""
                            }*/
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ClientFormModal;
