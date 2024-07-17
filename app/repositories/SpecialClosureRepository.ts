import { db } from "../lib/firebase";
import { SpecialClosure, specialClosureSchema } from "../lib/schemas";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ISpecialClosureRepository } from "./ISpecialClosureRepository";
import { convertTimestamp } from "../utils";

class SpecialClosureRepository implements ISpecialClosureRepository {
  private readonly collection: CollectionReference;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
  }

  async getSpecialClosures(): Promise<SpecialClosure[]> {
    try {
      const snapshot = await getDocs(this.collection);
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        const transformedData = {
          ...data,
          date: convertTimestamp(data.date),
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

  async getSpecialClosureById(id: string): Promise<SpecialClosure> {
    try {
      const closureDoc = await getDoc(doc(this.collection, id));
      if (!closureDoc.exists()) {
        throw new Error("Special closure not found");
      }
      const data = closureDoc.data();
      const transformedData = {
        ...data,
        date: convertTimestamp(data.date),
      };
      return specialClosureSchema.parse({
        id: closureDoc.id,
        ...transformedData,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch special closure: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching special closure.",
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
