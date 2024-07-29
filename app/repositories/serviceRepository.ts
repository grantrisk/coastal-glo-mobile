import { db } from "../lib/firebase";
import { Service } from "../lib/schemas";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";
import { IServiceRepository } from "./IServiceRepository";

class ServiceRepository implements IServiceRepository {
  private readonly collectionRef;

  constructor(collectionName: string) {
    this.collectionRef = collection(db, collectionName);
  }

  async getServices(): Promise<Service[]> {
    const q = query(this.collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ serviceId: doc.id, ...doc.data() }) as Service,
    );
  }

  async createService(service: Omit<Service, "serviceId">): Promise<Service> {
    const docRef = await addDoc(this.collectionRef, service);
    await updateDoc(docRef, { serviceId: docRef.id });
    return { serviceId: docRef.id, ...service } as Service;
  }

  async updateService(
    serviceId: string,
    updatedService: Partial<Service>,
  ): Promise<void> {
    const serviceDoc = doc(this.collectionRef, serviceId);
    await updateDoc(serviceDoc, updatedService);
  }

  async deleteService(serviceId: string): Promise<void> {
    const serviceDoc = doc(this.collectionRef, serviceId);
    await deleteDoc(serviceDoc);
  }
}

export default ServiceRepository;
