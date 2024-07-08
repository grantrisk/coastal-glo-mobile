import ClientRepository from "../repositories/clientRepository";
import ClientService from "../services/clientService";
import { IClientRepository } from "../repositories/IClientRepository";
import WorkingHoursRepository from "../repositories/workingHoursRepository";
import WorkingHoursService from "../services/workingHoursService";
import { IWorkingHoursRepository } from "../repositories/IWorkingHoursRepository";
import AppointmentRepository from "../repositories/appointmentRepository";
import AppointmentService from "../services/appointmentService";
import { IAppointmentRepository } from "../repositories/IAppointmentRepository";

// Dependency Injection Setup
const clientRepository: IClientRepository = new ClientRepository("clients");
const clientService = new ClientService(clientRepository);

const workingHoursRepository: IWorkingHoursRepository =
  new WorkingHoursRepository("workingHours");
const workingHoursService = new WorkingHoursService(workingHoursRepository);

const appointmentRepository: IAppointmentRepository = new AppointmentRepository(
  "appointments",
);
const appointmentService = new AppointmentService(appointmentRepository);

export { clientService, workingHoursService, appointmentService };
