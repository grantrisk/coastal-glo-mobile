import clientRepository from "../repositories/clientRepository";
import { User } from "../lib/schemas";

class ClientService {
  async fetchAllClients(): Promise<User[]> {
    return await clientRepository.getAllClients();
  }

  async fetchClientById(clientId: string): Promise<User> {
    return await clientRepository.getClientById(clientId);
  }

  async createClient(clientData: Omit<User, "id">): Promise<User> {
    return await clientRepository.addClient(clientData);
  }

  async modifyClient(
    clientId: string,
    clientData: Partial<Omit<User, "id">>,
  ): Promise<void> {
    return await clientRepository.updateClient(clientId, clientData);
  }

  async removeClient(clientId: string): Promise<void> {
    return await clientRepository.deleteClient(clientId);
  }
}

export default new ClientService();
