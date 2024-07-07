import ClientRepository from "../repositories/clientRepository";
import ClientService from "../services/clientService";
import { IClientRepository } from "../repositories/IClientRepository";
import WorkingHoursRepository from "../repositories/workingHoursRepository";
import WorkingHoursService from "../services/workingHoursService";
import { IWorkingHoursRepository } from "../repositories/IWorkingHoursRepository";

// Dependency Injection Setup
const clientRepository: IClientRepository = new ClientRepository("clients");
const clientService = new ClientService(clientRepository);
const workingHoursRepository: IWorkingHoursRepository =
  new WorkingHoursRepository("workingHours");
const workingHoursService = new WorkingHoursService(workingHoursRepository);

export { clientService, workingHoursService };
