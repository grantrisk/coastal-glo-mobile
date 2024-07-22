import { db } from "../lib/firebase";
import { SpecialClosure, specialClosureSchema } from "../lib/schemas";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ISpecialClosureRepository } from "./ISpecialClosureRepository";
import { convertTimestamp } from "../utils";

class SpecialClosureRepository implements ISpecialClosureRepository {
  private readonly collection: CollectionReference;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
  }

  async getAllSpecialClosures(): Promise<SpecialClosure[]> {
    try {
      const snapshot = await getDocs(this.collection);
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const transformedData = {
          ...data,
          startTime: convertTimestamp(data.startTime),
          endTime: convertTimestamp(data.endTime),
        };
        return specialClosureSchema.parse({ id: doc.id, ...transformedData });
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch special closures: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching special closures.",
        );
      }
    }
  }

  async getSpecialClosuresByDate(date: Date): Promise<SpecialClosure[]> {
    try {
      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);

      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);

      // FIXME: this can get wrong with ranges of dates
      const q = query(
        this.collection,
        where("startTime", ">=", dateStart),
        where("startTime", "<=", dateEnd),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const transformedData = {
          ...data,
          startTime: convertTimestamp(data.startTime),
          endTime: convertTimestamp(data.endTime),
        };
        return specialClosureSchema.parse({ id: doc.id, ...transformedData });
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch special closures: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching special closures.",
        );
      }
    }
  }

  async getSpecialClosuresByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<SpecialClosure[]> {
    try {
      const dateStart = new Date(startDate);
      dateStart.setHours(0, 0, 0, 0);

      const dateEnd = new Date(endDate);
      dateEnd.setHours(23, 59, 59, 999);

      const q = query(
        this.collection,
        where("startTime", ">=", dateStart),
        where("startTime", "<=", dateEnd),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const transformedData = {
          ...data,
          startTime: convertTimestamp(data.startTime),
          endTime: convertTimestamp(data.endTime),
        };
        return specialClosureSchema.parse({ id: doc.id, ...transformedData });
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch special closures: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching special closures.",
        );
      }
    }
  }

  async createSpecialClosure(
    specialClosure: Omit<SpecialClosure, "id">,
  ): Promise<SpecialClosure> {
    try {
      const docRef = await addDoc(this.collection, specialClosure);
      await updateDoc(docRef, { id: docRef.id });
      return specialClosureSchema.parse({ id: docRef.id, ...specialClosure });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create special closure: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while creating special closure.",
        );
      }
    }
  }

  async updateSpecialClosure(
    id: string,
    specialClosure: Partial<Omit<SpecialClosure, "id">>,
  ): Promise<void> {
    try {
      const closureRef = doc(this.collection, id);
      await updateDoc(closureRef, specialClosure);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update special closure: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while updating special closure.",
        );
      }
    }
  }

  async removeSpecialClosure(id: string): Promise<void> {
    try {
      const closureRef = doc(this.collection, id);
      await deleteDoc(closureRef);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete special closure: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while deleting special closure.",
        );
      }
    }
  }
}

export default SpecialClosureRepository;
