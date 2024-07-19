import ClientRepository from "../repositories/clientRepository";
import ClientService from "../services/clientService";
import { IClientRepository } from "../repositories/IClientRepository";
import WorkingHoursRepository from "../repositories/workingHoursRepository";
import WorkingHoursService from "../services/workingHoursService";
import { IWorkingHoursRepository } from "../repositories/IWorkingHoursRepository";
import AppointmentRepository from "../repositories/appointmentRepository";
import AppointmentService from "../services/appointmentService";
import { IAppointmentRepository } from "../repositories/IAppointmentRepository";
import ServiceRepository from "../repositories/serviceRepository";
import ServiceService from "../services/serviceService";
import { IServiceRepository } from "../repositories/IServiceRepository";
import { ISpecialClosureRepository } from "../repositories/ISpecialClosureRepository";
import SpecialClosureRepository from "../repositories/specialClosureRepository";
import SpecialClosureService from "../services/specialClosureService";

/// Dependency Injection Setup
// Client
const clientRepository: IClientRepository = new ClientRepository("clients");
const clientService = new ClientService(clientRepository);

// Working Hours
const workingHoursRepository: IWorkingHoursRepository =
  new WorkingHoursRepository("workingHours");
const workingHoursService = new WorkingHoursService(workingHoursRepository);

// Special Closure
const specialClosureRepository: ISpecialClosureRepository =
  new SpecialClosureRepository("specialClosures");
const specialClosureService = new SpecialClosureService(
  specialClosureRepository,
);

// Appointment
const appointmentRepository: IAppointmentRepository = new AppointmentRepository(
  "appointments",
);
const appointmentService = new AppointmentService(appointmentRepository);

// Service
const serviceRepository: IServiceRepository = new ServiceRepository("services");
const serviceService = new ServiceService(serviceRepository);

export {
  clientService,
  workingHoursService,
  specialClosureService,
  appointmentService,
  serviceService,
};
