import { Service } from "../lib/schemas";
import { IServiceRepository } from "../repositories/IServiceRepository";

class ServiceService {
  private serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async fetchServices(): Promise<Service[]> {
    return await this.serviceRepository.getServices();
  }

  async addService(service: Service): Promise<void> {
    await this.serviceRepository.createService(service);
  }

  async updateService(
    serviceId: string,
    updatedService: Partial<Service>,
  ): Promise<void> {
    await this.serviceRepository.updateService(serviceId, updatedService);
  }

  async deleteService(serviceId: string): Promise<void> {
    await this.serviceRepository.deleteService(serviceId);
  }
}

export default ServiceService;
