import { SpecialClosure } from "../lib/schemas";

export interface ISpecialClosureRepository {
  getAllSpecialClosures(): Promise<SpecialClosure[]>;

  getSpecialClosuresByDate(date: Date): Promise<SpecialClosure[]>;

  getSpecialClosuresByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<SpecialClosure[]>;

  createSpecialClosure(
    specialClosure: Omit<SpecialClosure, "id">,
  ): Promise<SpecialClosure>;

  updateSpecialClosure(
    id: string,
    specialClosure: SpecialClosure,
  ): Promise<void>;

  removeSpecialClosure(id: string): Promise<void>;
}
