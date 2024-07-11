import { Service } from "../lib/schemas";

export interface IServiceRepository {
  getServices(): Promise<Service[]>;

  createService(service: Service): Promise<Service>;

  updateService(
    serviceId: string,
    updatedService: Partial<Service>,
  ): Promise<void>;

  deleteService(serviceId: string): Promise<void>;
}
