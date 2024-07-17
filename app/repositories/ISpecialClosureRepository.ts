import { SpecialClosure } from "../lib/schemas";

export interface ISpecialClosureRepository {
  getSpecialClosures(): Promise<SpecialClosure[]>;

  createSpecialClosure(
    specialClosure: Omit<SpecialClosure, "id">,
  ): Promise<SpecialClosure>;

  updateSpecialClosure(
    id: string,
    specialClosure: SpecialClosure,
  ): Promise<void>;

  removeSpecialClosure(id: string): Promise<void>;
}
