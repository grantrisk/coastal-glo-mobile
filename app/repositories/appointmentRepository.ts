import { db } from "../lib/firebase";
import { Appointment, appointmentSchema } from "../lib/schemas";
import {
  addDoc,
  and,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  or,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { IAppointmentRepository } from "./IAppointmentRepository";
import { convertTimestamp } from "../utils";

class AppointmentRepository implements IAppointmentRepository {
  private readonly collection: CollectionReference;
  private cache: Map<string, Appointment[]> = new Map();

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

  async getAppointmentsInRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]> {
    const cacheKey = `${startDate.getTime()}-${endDate.getTime()}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as Appointment[];
    }

    try {
      const dateStart = new Date(startDate);
      dateStart.setHours(0, 0, 0, 0);

      const dateEnd = new Date(endDate);
      dateEnd.setHours(23, 59, 59, 999);

      // This is a composite query
      const q = query(
        this.collection,
        or(
          and(
            where("appointmentDate", ">=", dateStart),
            where("appointmentDate", "<=", dateEnd),
          ),
          and(
            where("appointmentDate", ">=", dateStart),
            where("appointmentDate", "<=", dateEnd),
          ),
        ),
      );

      const snapshot = await getDocs(q);

      const appointments = snapshot.docs.map((doc) => {
        const data = doc.data();

        // Convert all necessary date fields using convertTimestamp
        const transformedData = {
          ...data,
          appointmentDate: convertTimestamp(data.appointmentDate),
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        };

        return appointmentSchema.parse({ id: doc.id, ...transformedData });
      });

      this.cache.set(cacheKey, appointments);
      return appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
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
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp(), // Automatically update the 'updatedAt' field
      });

      // Invalidate the cache as the data might have changed
      this.cache.clear();
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

      // Invalidate the cache as the data might have changed
      this.cache.clear();
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

      // Invalidate the cache as the data might have changed
      this.cache.clear();
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
