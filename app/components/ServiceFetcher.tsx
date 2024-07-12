"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/Services.module.css";
import { serviceService } from "../lib/dependencyInjector";
import { Service } from "../lib/schemas";
import PricingCard from "./PricingCard";

const ServiceFetcher: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await serviceService.fetchServices();
        setServices(fetchedServices);
        setError(null);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
    <section className={styles.serviceSection}>
      {services.map((service) => (
        <PricingCard
          key={service.serviceId}
          title={service.name}
          description={service.description}
          price={service.price}
          duration={service.duration}
          recommended={service.recommended}
          isService
          isMonthly={service.isMonthly}
        />
      ))}
    </section>
  );
};

export default ServiceFetcher;
