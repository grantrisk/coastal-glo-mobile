import { WorkingHours } from "../lib/schemas";

export interface IWorkingHoursRepository {
  getWorkingHours(): Promise<WorkingHours>;

  createWorkingHours(defaultWorkingHours: WorkingHours): Promise<void>;

  updateWorkingHours(
    day: keyof WorkingHours,
    updatedHours: string,
  ): Promise<void>;
}
