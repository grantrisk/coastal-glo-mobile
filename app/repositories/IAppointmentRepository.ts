import { Appointment } from "../lib/schemas";

export interface IAppointmentRepository {
  getAllAppointments(): Promise<Appointment[]>;

  getAppointmentsByDate(date: Date): Promise<Appointment[]>;

  getAppointmentsInRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]>;

  updateAppointmentStatus(appointmentId: string, status: string): Promise<void>;

  deleteAppointment(appointmentId: string): Promise<void>;

  createAppointment(appointment: Appointment): Promise<void>; // Added method
}
