import { db } from "../lib/firebase";
import { Appointment } from "../lib/schemas";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  CollectionReference,
} from "firebase/firestore";
import { IAppointmentRepository } from "./IAppointmentRepository";
import { convertTimestamp } from "../utils";

class AppointmentRepository implements IAppointmentRepository {
  private readonly collection: CollectionReference;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
  }

  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const querySnapshot = await getDocs(this.collection);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data() as Appointment;
        return {
          ...data,
          appointmentDate: convertTimestamp(data.appointmentDate) as Date,
          createdAt: convertTimestamp(data.createdAt) as Date,
          updatedAt: convertTimestamp(data.updatedAt) as Date,
        };
      });
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

  async getAppointmentsByDate(date: Date): Promise<Appointment[]> {
    try {
      const querySnapshot = await getDocs(this.collection);
      return querySnapshot.docs
        .map((doc) => {
          const data = doc.data() as Appointment;
          return {
            ...data,
            appointmentDate: convertTimestamp(data.appointmentDate) as Date,
            createdAt: convertTimestamp(data.createdAt) as Date,
            updatedAt: convertTimestamp(data.updatedAt) as Date,
          };
        })
        .filter((appointment) => {
          return (
            appointment.appointmentDate.toDateString() === date.toDateString()
          );
        });
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
    try {
      const docRef = doc(this.collection, appointmentId);
      await updateDoc(docRef, { status });
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
    try {
      const docRef = doc(this.collection, appointmentId);
      await deleteDoc(docRef);
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
      const docRef = await addDoc(this.collection, appointment);
      await updateDoc(docRef, { appointmentId: docRef.id }); // Update the document with the generated ID
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

export default AppointmentRepository;
