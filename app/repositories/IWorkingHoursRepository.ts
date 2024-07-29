import { WorkingHours } from "../lib/schemas";

export interface IWorkingHoursRepository {
  getWorkingHours(): Promise<WorkingHours>;

  getWorkingHoursByDay(day: keyof WorkingHours): Promise<string>;

  createWorkingHours(defaultWorkingHours: WorkingHours): Promise<void>;

  updateWorkingHours(
    day: keyof WorkingHours,
    updatedHours: string,
  ): Promise<void>;
}
