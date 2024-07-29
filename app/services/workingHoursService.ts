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

  /**
   * Fetches working hours for a specific day of the week.
   * This method retrieves the working hours for the given day from the repository.
   * The working hours are returned in a string format, representing the opening and closing times,
   * or "Closed" if the office is not open on that day.
   * For example, it might return "5:00 AM - 6:00 PM" for a specific day, or "Closed" if the office is closed.
   *
   * @param {Date} date - The date for which to fetch the working hours. The day of the week is extracted from this date.
   * @returns {Promise<string>} A promise that resolves to a string representing the working hours for the given day,
   *                            in the format "HH:MM AM/PM - HH:MM AM/PM", or "Closed" if the office is closed that day.
   * @throws {Error} Throws an error if the date is not provided or if there is an issue fetching the working hours.
   */
  async fetchWorkingHoursByDate(date: Date): Promise<string> {
    if (!date) {
      throw new Error("Date is required");
    }
    try {
      const dayOfWeek = this.getDayOfWeek(date);
      return await this.workingHoursRepository.getWorkingHoursByDay(dayOfWeek);
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

  getDayOfWeek = (date: Date): keyof WorkingHours => {
    const daysOfWeek: Array<keyof WorkingHours> = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return daysOfWeek[date.getDay()];
  };
}

export default WorkingHoursService;
