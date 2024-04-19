export interface BusinessHours {
  [key: string]: { start: string; end: string };
}

export interface Vacation {
  start: string;
  end: string;
}

export const businessHours: BusinessHours = {
  monday: { start: "18:00", end: "21:00" },
  tuesday: { start: "18:00", end: "21:00" },
  wednesday: { start: "18:00", end: "21:00" },
  thursday: { start: "18:00", end: "21:00" },
  friday: { start: "08:00", end: "20:00" },
  saturday: { start: "08:00", end: "20:00" },
  sunday: { start: "14:00", end: "18:00" },
};

export const vacations: Vacation[] = [{ start: "2024-4-25", end: "2024-5-6" }];

export const businessStatus = {
  open: "Open",
  openingSoon: "Opening Soon!",
  closed: "Closed",
  closingSoon: "Closing Soon",
  vacation: "On Vacation",
};
