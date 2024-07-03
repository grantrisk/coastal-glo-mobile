import { db } from "../lib/firebase";
import { User } from "../lib/schemas";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function convertFirestoreDateTimeToDateObject(
  data: DocumentData,
): DocumentData {
  if (data.lastSprayDate) {
    data.lastSprayDate = new Date(data.lastSprayDate.seconds * 1000);
  }

  if (data.subscription?.nextBillingDate) {
    data.subscription.nextBillingDate = new Date(
      data.subscription.nextBillingDate.seconds * 1000,
    );
  }

  return data;
}

class ClientRepository {
  private collection: CollectionReference;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
  }

  async getAllClients(): Promise<User[]> {
    try {
      const snapshot = await getDocs(this.collection);
      return snapshot.docs.map((doc) => {
        let data: DocumentData = convertFirestoreDateTimeToDateObject(
          doc.data(),
        );
        console.log(data);
        return { id: doc.id, ...data } as User;
      });
    } catch (error) {
      console.error("Error fetching clients: ", error);
      throw error;
    }
  }

  async getClientById(clientId: string): Promise<User> {
    try {
      const clientDoc = await getDoc(doc(this.collection, clientId));
      if (!clientDoc.exists()) {
        throw new Error("Client not found");
      }
      let data: DocumentData = convertFirestoreDateTimeToDateObject(
        clientDoc.data()!,
      );
      return { id: clientDoc.id, ...data } as User;
    } catch (error) {
      console.error("Error fetching client: ", error);
      throw error;
    }
  }

  async addClient(clientData: Omit<User, "id">): Promise<User> {
    try {
      const docRef = await addDoc(this.collection, clientData);
      await updateDoc(docRef, { id: docRef.id });
      return { id: docRef.id, ...clientData } as User;
    } catch (error) {
      console.error("Error adding client: ", error);
      throw error;
    }
  }

  async updateClient(
    clientId: string,
    clientData: Partial<Omit<User, "id">> | User,
  ): Promise<void> {
    try {
      const clientRef = doc(this.collection, clientId);
      await updateDoc(clientRef, clientData);
    } catch (error) {
      console.error("Error updating client: ", error);
      throw error;
    }
  }

  async deleteClient(clientId: string): Promise<void> {
    try {
      const clientRef = doc(this.collection, clientId);
      await deleteDoc(clientRef);
    } catch (error) {
      console.error("Error deleting client: ", error);
      throw error;
    }
  }
}

export default new ClientRepository("clients");
