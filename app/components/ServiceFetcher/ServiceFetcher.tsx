"use client";

import React, { useEffect, useState } from "react";
import { usePrefetch } from "../../providers/PrefetchProvider";
import { Service } from "../../lib/schemas";
import PricingCard from "../PricingCard/PricingCard";
import SkeletonPricingCard from "../PricingCard/SkeletonPricingCard/SkeletonPricingCard";
import { serviceService } from "../../lib/dependencyInjector";

const ServiceFetcher: React.FC = () => {
  const { services: prefetchedServices, setServices } = usePrefetch();
  const [services, setLocalServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefetchedServices.length > 0) {
      setLocalServices(prefetchedServices);
      setLoading(false);
    } else {
      const fetchServices = async () => {
        try {
          const fetchedServices = await serviceService.fetchServices();
          const sortedServices = fetchedServices.sort(
            (a, b) => a.listOrder - b.listOrder,
          );
          setLocalServices(sortedServices); // Update local state with fetched services
          setServices(sortedServices); // Update global state with fetched services
          setError(null);
        } catch (error) {
          console.error("Error fetching services:", error);
          setError("Failed to fetch services. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchServices();
    }
  }, [prefetchedServices, setServices]);

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
