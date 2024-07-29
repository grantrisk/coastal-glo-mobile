import { SpecialClosure } from "../lib/schemas";
import { ISpecialClosureRepository } from "../repositories/ISpecialClosureRepository";

class SpecialClosureService {
  private specialClosureRepository: ISpecialClosureRepository;

  constructor(specialClosureRepository: ISpecialClosureRepository) {
    this.specialClosureRepository = specialClosureRepository;
  }

  async fetchAllSpecialClosures(): Promise<SpecialClosure[]> {
    try {
      return await this.specialClosureRepository.getAllSpecialClosures();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch special closures: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching special closures.",
        );
      }
    }
  }

  async fetchSpecialClosuresByDate(date: Date): Promise<SpecialClosure[]> {
    if (!date) {
      throw new Error("Date is required");
    }
    try {
      return await this.specialClosureRepository.getSpecialClosuresByDate(date);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch special closures: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching special closures.",
        );
      }
    }
  }

  async fetchSpecialClosuresByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<SpecialClosure[]> {
    if (!startDate || !endDate) {
      throw new Error("Start date and end date are required");
    }
    try {
      return await this.specialClosureRepository.getSpecialClosuresByDateRange(
        startDate,
        endDate,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch special closures: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while fetching special closures.",
        );
      }
    }
  }

  async createSpecialClosure(specialClosure: SpecialClosure): Promise<void> {
    try {
      await this.specialClosureRepository.createSpecialClosure(specialClosure);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create special closure: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while creating special closure.",
        );
      }
    }
  }

  async updateSpecialClosure(
    id: string,
    specialClosure: SpecialClosure,
  ): Promise<void> {
    if (!id || !specialClosure) {
      throw new Error("ID and special closure data are required");
    }
    try {
      await this.specialClosureRepository.updateSpecialClosure(
        id,
        specialClosure,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update special closure: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while updating special closure.",
        );
      }
    }
  }

  async removeSpecialClosure(id: string): Promise<void> {
    if (!id) {
      throw new Error("ID is required to delete a special closure");
    }
    try {
      await this.specialClosureRepository.removeSpecialClosure(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete special closure: ${error.message}`);
      } else {
        throw new Error(
          "An unknown error occurred while deleting special closure.",
        );
      }
    }
  }
}

export default SpecialClosureService;
