import { Appointment } from "../lib/schemas";
import { IAppointmentRepository } from "../repositories/IAppointmentRepository";

class AppointmentService {
  private appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async fetchAllAppointments(): Promise<Appointment[]> {
    try {
      return await this.appointmentRepository.getAllAppointments();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch appointments: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching appointments.",
        );
      }
    }
  }

  async fetchAppointmentsByDate(date: Date): Promise<Appointment[]> {
    if (!date) {
      throw new Error("Date is required");
    }
    try {
      return await this.appointmentRepository.getAppointmentsByDate(date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch appointments: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching appointments.",
        );
      }
    }
  }

  async updateAppointmentStatus(
    appointmentId: string,
    status: string,
  ): Promise<void> {
    if (!appointmentId || !status) {
      throw new Error("Appointment ID and status are required");
    }
    try {
      await this.appointmentRepository.updateAppointmentStatus(
        appointmentId,
        status,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to update appointment status: ${error.message}`,
        );
      } else {
        throw new Error(
          "An unknown error occurred while updating appointment status.",
        );
      }
    }
  }

  async deleteAppointment(appointmentId: string): Promise<void> {
    if (!appointmentId) {
      throw new Error("Appointment ID is required");
    }
    try {
      await this.appointmentRepository.deleteAppointment(appointmentId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete appointment: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while deleting appointment.",
        );
      }
    }
  }

  async createAppointment(appointment: Appointment): Promise<void> {
    try {
      await this.appointmentRepository.createAppointment(appointment);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create appointment: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while creating appointment.",
        );
      }
    }
  }
}

export default AppointmentService;
