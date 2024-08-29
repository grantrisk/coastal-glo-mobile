import { db } from "../lib/firebase";
import { WorkingHours } from "../lib/schemas";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IWorkingHoursRepository } from "./IWorkingHoursRepository";

// FIXME: update the AWS API
// FIXME: update google company account hours

class WorkingHoursRepository implements IWorkingHoursRepository {
  private readonly collection: CollectionReference;
  private readonly docRef: DocumentReference;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
    this.docRef = doc(this.collection, "default");
  }

  async getWorkingHours(): Promise<WorkingHours> {
    try {
      const docSnap = await getDoc(this.docRef);
      if (docSnap.exists()) {
        return docSnap.data() as WorkingHours;
      } else {
        throw new Error("No working hours found");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch working hours: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching working hours.",
        );
      }
    }
  }

  async getWorkingHoursByDay(day: keyof WorkingHours): Promise<string> {
    try {
      const docSnap = await getDoc(this.docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as WorkingHours;
        return data[day];
      } else {
        throw new Error("No working hours found");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch working hours: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching working hours.",
        );
      }
    }
  }

  async createWorkingHours(workingHours: WorkingHours): Promise<void> {
    try {
      await setDoc(this.docRef, workingHours);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to create default working hours: ${error.message}`,
        );
      } else {
        throw new Error(
          "An unknown error occurred while creating default working hours.",
        );
      }
    }
  }

  async updateWorkingHours(
    day: keyof WorkingHours,
    updatedHours: string,
  ): Promise<void> {
    try {
      await updateDoc(this.docRef, { [day]: updatedHours });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update working hours: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while updating working hours.",
        );
      }
    }
  }
}

export default WorkingHoursRepository;
