import workingHoursRepository from "../repositories/workingHoursRepository";
import { WorkingHours } from "../lib/schemas";

class WorkingHoursService {
  async fetchWorkingHours(): Promise<WorkingHours> {
    return await workingHoursRepository.getWorkingHours();
  }

  async createDefaultWorkingHours(): Promise<void> {
    return await workingHoursRepository.createDefaultWorkingHours();
  }

  async updateWorkingHours(
    day: keyof WorkingHours,
    updatedHours: string,
  ): Promise<void> {
    return await workingHoursRepository.updateWorkingHours(day, updatedHours);
  }
}

export default new WorkingHoursService();
