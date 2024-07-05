import { db } from "../lib/firebase";
import { WorkingHours } from "../lib/schemas";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const defaultWorkingHours: WorkingHours = {
  monday: "9:00 AM - 5:00 PM",
  tuesday: "9:00 AM - 5:00 PM",
  wednesday: "9:00 AM - 5:00 PM",
  thursday: "9:00 AM - 5:00 PM",
  friday: "9:00 AM - 5:00 PM",
  saturday: "10:00 AM - 4:00 PM",
  sunday: "Closed",
};

class WorkingHoursRepository {
  private docRef = doc(db, "workingHours", "default");

  async getWorkingHours(): Promise<WorkingHours> {
    try {
      const docSnap = await getDoc(this.docRef);
      if (docSnap.exists()) {
        return docSnap.data() as WorkingHours;
      } else {
        throw new Error("No working hours found");
      }
    } catch (error) {
      console.error("Error fetching working hours:", error);
      throw error;
    }
  }

  async createDefaultWorkingHours(): Promise<void> {
    try {
      await setDoc(this.docRef, defaultWorkingHours);
    } catch (error) {
      console.error("Error creating default working hours:", error);
      throw error;
    }
  }

  async updateWorkingHours(
    day: keyof WorkingHours,
    updatedHours: string,
  ): Promise<void> {
    try {
      await updateDoc(this.docRef, { [day]: updatedHours });
    } catch (error) {
      console.error("Error updating working hours:", error);
      throw error;
    }
  }
}

export default new WorkingHoursRepository();
