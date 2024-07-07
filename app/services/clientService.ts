import { User } from "../lib/schemas";
import { IClientRepository } from "../repositories/IClientRepository";

class ClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  async fetchAllClients(): Promise<User[]> {
    try {
      return await this.clientRepository.getAllClients();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch clients: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching clients.");
      }
    }
  }

  async fetchClientById(clientId: string): Promise<User> {
    if (!clientId) {
      throw new Error("Client ID is required");
    }
    try {
      return await this.clientRepository.getClientById(clientId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch client: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching client.");
      }
    }
  }

  async createClient(clientData: Omit<User, "id">): Promise<User> {
    try {
      return await this.clientRepository.addClient(clientData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create client: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while creating client.");
      }
    }
  }

  async modifyClient(
    clientId: string,
    clientData: Partial<Omit<User, "id">>,
  ): Promise<void> {
    if (!clientId) {
      throw new Error("Client ID is required");
    }
    try {
      await this.clientRepository.updateClient(clientId, clientData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update client: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while updating client.");
      }
    }
  }

  async removeClient(clientId: string): Promise<void> {
    if (!clientId) {
      throw new Error("Client ID is required");
    }
    try {
      await this.clientRepository.deleteClient(clientId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete client: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while deleting client.");
      }
    }
  }
}

export default ClientService;
