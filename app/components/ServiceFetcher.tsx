"use client";

import React, { useEffect, useState } from "react";
import { serviceService } from "../lib/dependencyInjector";
import { Service } from "../lib/schemas";
import PricingCard from "./PricingCard";
import SkeletonPricingCard from "./SkeletonPricingCard";

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

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {loading
        ? // Display skeleton cards while loading
          Array.from({ length: 2 }).map((_, index) => (
            <SkeletonPricingCard key={index} />
          ))
        : services.map((service) => (
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
    </>
  );
};

export default ServiceFetcher;
