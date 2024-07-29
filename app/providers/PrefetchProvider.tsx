"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { serviceService } from "../lib/dependencyInjector";
import { Service } from "../lib/schemas";

// Define the shape of the context data
interface PrefetchContextProps {
  services: Service[];
  setServices: (services: Service[]) => void;
}

// Create a context to hold the prefetched services data
const PrefetchContext = createContext<PrefetchContextProps | undefined>(
  undefined,
);

// Create a provider component to supply the prefetched data to the rest of the app
export const PrefetchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [services, setServices] = useState<Service[]>([]);

  // Prefetch services when the component mounts
  useEffect(() => {
    const prefetchServices = async () => {
      try {
        // Fetch services from the service layer
        const fetchedServices = await serviceService.fetchServices();
        // Sort the fetched services by their listOrder
        const sortedServices = fetchedServices.sort(
          (a, b) => a.listOrder - b.listOrder,
        );
        // Store the sorted services in state
        setServices(sortedServices);
      } catch (error) {
        console.error("Error prefetching services:", error);
      }
    };

    // Call the prefetch function
    prefetchServices();
  }, []);

  return (
    // Provide the services and a way to update them to the rest of the app
    <PrefetchContext.Provider value={{ services, setServices }}>
      {children}
    </PrefetchContext.Provider>
  );
};

// Custom hook to use the prefetched data
export const usePrefetch = () => {
  const context = useContext(PrefetchContext);
  if (!context) {
    throw new Error("usePrefetch must be used within a PrefetchProvider");
  }
  return context;
};
