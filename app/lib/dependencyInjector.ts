import ClientRepository from "../repositories/clientRepository";
import ClientService from "../services/clientService";
import { IClientRepository } from "../repositories/IClientRepository";

// Dependency Injection Setup
const clientRepository: IClientRepository = new ClientRepository("clients");
const clientService = new ClientService(clientRepository);

export { clientService };
