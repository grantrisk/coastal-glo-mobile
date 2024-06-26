"use client";

import React, { useState } from "react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { z } from "zod";
import { serviceSchema } from "../../../lib/schemas";

// Type inference from schema
type Service = z.infer<typeof serviceSchema>;

// Admin Dashboard Component for Managing Services
export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([
    {
      serviceId: "srv1",
      name: "Full Body Spray",
      description: "A full body tan spray for an even and natural look.",
      price: 50,
      duration: 30, // duration in minutes
    },
    {
      serviceId: "srv2",
      name: "Partial Body Spray",
      description: "Partial body spray for legs or arms.",
      price: 30,
      duration: 15,
    },
    {
      serviceId: "srv3",
      name: "Face Tan",
      description: "Gentle face tanning for a sun-kissed glow.",
      price: 25,
      duration: 10,
    },
  ]);

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
        <h2>Services</h2>
        <ul className={styles.list}>
          {services.map((service) => (
            <li key={service.serviceId} className={styles.listItem}>
              {service.name} - {service.duration} mins - ${service.price}
              <div className={styles.buttonGroup}>
                <button
                  onClick={() =>
                    updateService(service.serviceId, {
                      price: service.price + 5,
                    })
                  }
                  className={styles.button}
                >
                  Update
                </button>
                <button
                  onClick={() => deleteService(service.serviceId)}
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
