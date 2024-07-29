import { getAvailableTimeSlots } from "../../app/utils/getAvailableTimeSlots";
import WorkingHoursService from "../../app/services/workingHoursService";
import AppointmentService from "../../app/services/appointmentService";
import SpecialClosureService from "../../app/services/specialClosureService";

jest.mock("../../app/services/workingHoursService");
jest.mock("../../app/services/appointmentService");
jest.mock("../../app/services/specialClosureService");

describe("getAvailableTimeSlots", () => {
  const mockDate = new Date("2023-07-19");
  const mockWorkingHours = "09:00 - 17:00";
  const mockAppointments = [
    { appointmentDate: new Date("2023-07-19T10:00:00") },
    { appointmentDate: new Date("2023-07-19T14:00:00") },
  ];
  const mockSpecialClosures = [{ startTime: "12:00", endTime: "13:00" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return available time slots", async () => {
    (
      WorkingHoursService.prototype.fetchWorkingHoursByDate as jest.Mock
    ).mockResolvedValue(mockWorkingHours);
    (
      AppointmentService.prototype.fetchAppointmentsByDate as jest.Mock
    ).mockResolvedValue(mockAppointments);
    (
      SpecialClosureService.prototype.fetchSpecialClosuresByDate as jest.Mock
    ).mockResolvedValue(mockSpecialClosures);

    const serviceDuration = 30;
    const availableSlots = await getAvailableTimeSlots(
      mockDate,
      serviceDuration,
    );

    expect(
      WorkingHoursService.prototype.fetchWorkingHoursByDate,
    ).toHaveBeenCalledWith(mockDate);
    expect(
      AppointmentService.prototype.fetchAppointmentsByDate,
    ).toHaveBeenCalledWith(mockDate);
    expect(
      SpecialClosureService.prototype.fetchSpecialClosuresByDate,
    ).toHaveBeenCalledWith(mockDate);

    expect(availableSlots).toEqual([
      "09:00",
      "09:30",
      "10:30",
      "11:00",
      "11:30",
      "13:00",
      "13:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ]);
  });

  it("should return an empty array if office is closed", async () => {
    (
      WorkingHoursService.prototype.fetchWorkingHoursByDate as jest.Mock
    ).mockResolvedValue("Closed");

    const serviceDuration = 30;
    const availableSlots = await getAvailableTimeSlots(
      mockDate,
      serviceDuration,
    );

    expect(availableSlots).toEqual([]);
  });

  // Add more test cases as needed
});
