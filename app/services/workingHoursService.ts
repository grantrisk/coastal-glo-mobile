import { WorkingHours } from "../lib/schemas";
import { IWorkingHoursRepository } from "../repositories/IWorkingHoursRepository";

class WorkingHoursService {
  private workingHoursRepository: IWorkingHoursRepository;

  constructor(workingHoursRepository: IWorkingHoursRepository) {
    this.workingHoursRepository = workingHoursRepository;
  }

  async fetchWorkingHours(): Promise<WorkingHours> {
    try {
      return await this.workingHoursRepository.getWorkingHours();
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

  async createDefaultWorkingHours(): Promise<void> {
    try {
      const defaultWorkingHours: WorkingHours = {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed",
      };
      await this.workingHoursRepository.createWorkingHours(defaultWorkingHours);
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
    if (!day || !updatedHours) {
      throw new Error("Day and updated hours are required");
    }
    try {
      await this.workingHoursRepository.updateWorkingHours(day, updatedHours);
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

export default WorkingHoursService;
