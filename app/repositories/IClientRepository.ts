import { User } from "../lib/schemas";

export interface IClientRepository {
  getAllClients(): Promise<User[]>;

  getClientById(clientId: string): Promise<User>;

  addClient(clientData: Omit<User, "id">): Promise<User>;

  updateClient(
    clientId: string,
    clientData: Partial<Omit<User, "id">>,
  ): Promise<void>;

  deleteClient(clientId: string): Promise<void>;
}
