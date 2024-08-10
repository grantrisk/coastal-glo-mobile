import { getAvailableDays, getAvailableTimeSlots } from "../../app/utils";
import {
  appointmentService,
  specialClosureService,
  workingHoursService,
} from "../../app/lib/dependencyInjector";
import { WorkingHours } from "../../app/lib/schemas";

// Mock the services
jest.mock("../../app/lib/dependencyInjector", () => ({
  appointmentService: {
    fetchAppointmentsByDate: jest.fn(),
  },
  specialClosureService: {
    fetchSpecialClosuresByDate: jest.fn(),
    fetchSpecialClosuresByDateRange: jest.fn(),
  },
  workingHoursService: {
    fetchWorkingHoursByDate: jest.fn(),
    fetchWorkingHours: jest.fn(),
  },
}));

describe("Get Available Time Slots Tests", () => {
  beforeAll(() => {
    // Use fake timers
    jest.useFakeTimers();

    // Set the current time to a specific date and time
    jest.setSystemTime(new Date("2024-8-5 9:00:00"));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore real timers after tests
    jest.useRealTimers();
  });

  test("should exclude time slots overlapping with existing appointments", async () => {
    // Set up the mock return values
    const mockDate = new Date();

    (
      workingHoursService.fetchWorkingHoursByDate as jest.Mock
    ).mockResolvedValue("08:00 - 18:00");

    (appointmentService.fetchAppointmentsByDate as jest.Mock).mockResolvedValue(
      [
        {
          appointmentId: "1",
          userId: "user123",
          service: {
            serviceId: "service123",
            name: "Test Service",
            description: "A test service",
            price: 100,
            duration: 45, // Ensure duration is set
            listOrder: 1,
            recommended: true,
            isMonthly: false,
          },
          appointmentDate: new Date(mockDate.setHours(11, 0, 0, 0)),
          status: "scheduled",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );

    (
      specialClosureService.fetchSpecialClosuresByDate as jest.Mock
    ).mockResolvedValue([]);

    const result = await getAvailableTimeSlots(mockDate, 30);

    const expectedResult = [
      "09:30",
      "10:00",
      "10:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ];
    expect(result).toEqual(expectedResult);

    // Expect the 11:30 slot to be unavailable due to overlapping appointment
    expect(result).not.toContain("11:30");
  });

  test("should return available days within a date range excluding closed days", async () => {
    // Set up the mock return values
    const monday = new Date("2024-08-05T00:00:00.000Z"); // Monday, August 5, 2024
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // Sunday, August 11, 2024

    const mockWorkingHours: WorkingHours = {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "Closed",
      sunday: "Closed",
    };

    (workingHoursService.fetchWorkingHours as jest.Mock).mockResolvedValue(
      mockWorkingHours,
    );

    // Assume there are some appointments on Monday, but it shouldn't affect the test
    (appointmentService.fetchAppointmentsByDate as jest.Mock).mockResolvedValue(
      [
        {
          appointmentId: "2",
          userId: "user456",
          service: {
            serviceId: "service456",
            name: "Another Service",
            description: "Another test service",
            price: 150,
            duration: 60, // Ensure duration is set
            listOrder: 2,
            recommended: false,
            isMonthly: false,
          },
          appointmentDate: new Date(monday.setHours(10, 0, 0, 0)),
          status: "scheduled",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );

    (
      specialClosureService.fetchSpecialClosuresByDateRange as jest.Mock
    ).mockResolvedValue([]);

    const result = await getAvailableDays(monday, sunday, 30);

    // Check that all the expected open days are included
    expect(result).toContain("2024-08-05"); // Monday should be available
    expect(result).toContain("2024-08-06"); // Tuesday should be available
    expect(result).toContain("2024-08-07"); // Wednesday should be available
    expect(result).toContain("2024-08-08"); // Thursday should be available
    expect(result).toContain("2024-08-09"); // Friday should be available

    // Check that closed days (Saturday and Sunday) are not included
    expect(result).not.toContain("2024-08-10"); // Saturday should be closed
    expect(result).not.toContain("2024-08-11"); // Sunday should be closed

    // Ensure that the correct number of days is returned
    expect(result.length).toBe(5); // Only Monday through Friday should be returned
  });

  test("should return available days within a date range excluding days impacted by special closures", async () => {
    // Set up the mock return values
    const monday = new Date("2024-08-05T00:00:00.000Z"); // Monday, August 5, 2024
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // Sunday, August 11, 2024

    const mockWorkingHours: WorkingHours = {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "Closed",
      sunday: "Closed",
    };

    (workingHoursService.fetchWorkingHours as jest.Mock).mockResolvedValue(
      mockWorkingHours,
    );

    // Assume there are some appointments on Monday, but it shouldn't affect the test
    (appointmentService.fetchAppointmentsByDate as jest.Mock).mockResolvedValue(
      [
        {
          appointmentId: "2",
          userId: "user456",
          service: {
            serviceId: "service456",
            name: "Another Service",
            description: "Another test service",
            price: 150,
            duration: 60, // Ensure duration is set
            listOrder: 2,
            recommended: false,
            isMonthly: false,
          },
          appointmentDate: new Date(monday.setHours(10, 0, 0, 0)),
          status: "scheduled",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );

    // Special closures, including partial-day closures and multi-day closures
    (
      specialClosureService.fetchSpecialClosuresByDateRange as jest.Mock
    ).mockResolvedValue([
      {
        closureId: "1",
        startTime: new Date("2024-08-05T12:00:00.000Z"), // Partial closure on Monday, August 5, 2024
        endTime: new Date("2024-08-05T14:00:00.000Z"),
      },
      {
        closureId: "2",
        startTime: new Date("2024-08-07T00:00:00.000Z"), // Multi-day closure starting on Wednesday, August 7, 2024
        endTime: new Date("2024-08-09T23:59:59.999Z"), // Ending on Friday, August 9, 2024
      },
    ]);

    const result = await getAvailableDays(monday, sunday, 30);

    // Check that all the expected open days are included
    expect(result).toContain("2024-08-06"); // Tuesday should be available
    expect(result).not.toContain("2024-08-07"); // Wednesday should not be available
    expect(result).not.toContain("2024-08-08"); // Thursday should not be available
    expect(result).not.toContain("2024-08-09"); // Friday should not be available

    // Check that Monday is included, since it's only partially closed
    expect(result).toContain("2024-08-05"); // Monday should still be available

    // Check that closed days (Saturday and Sunday) are not included
    expect(result).not.toContain("2024-08-10"); // Saturday should be closed
    expect(result).not.toContain("2024-08-11"); // Sunday should be closed

    // Ensure that the correct number of days is returned
    expect(result.length).toBe(2); // Only Monday and Tuesday should be returned
  });

  test("should return available days within a date range excluding fully booked days", async () => {
    // Set up the mock return values
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 2); // 2 days later

    const mockWorkingHours: WorkingHours = {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "08:00 - 18:00",
      sunday: "08:00 - 18:00",
    };

    (workingHoursService.fetchWorkingHours as jest.Mock).mockResolvedValue(
      mockWorkingHours,
    );

    // Mock implementation to return different appointments based on the date
    (
      appointmentService.fetchAppointmentsByDate as jest.Mock
    ).mockImplementation((date) => {
      const day = date.getDay();
      if (day === startDate.getDay()) {
        // Fully booked on startDate
        return [
          {
            appointmentId: "3",
            userId: "user789",
            service: {
              serviceId: "service789",
              name: "Yet Another Service",
              description: "Yet another test service",
              price: 200,
              duration: 600, // Ensure duration covers entire working hours
              listOrder: 3,
              recommended: false,
              isMonthly: false,
            },
            appointmentDate: new Date(date.setHours(8, 0, 0, 0)),
            status: "scheduled",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      } else {
        // No appointments on other days
        return [];
      }
    });

    (
      specialClosureService.fetchSpecialClosuresByDateRange as jest.Mock
    ).mockResolvedValue([]);

    const result = await getAvailableDays(startDate, endDate, 30);

    const expectedResult = ["2024-08-06", "2024-08-07"];
    expect(result).toEqual(expectedResult);

    // expect not to have the first day
    expect(result).not.toContain("2024-08-05");
  });

  test("should return empty array if the facility is closed on the selected date", async () => {
    const mockDate = new Date();
    (
      workingHoursService.fetchWorkingHoursByDate as jest.Mock
    ).mockResolvedValue("Closed");

    const result = await getAvailableTimeSlots(mockDate, 30);

    expect(result).toEqual([]);
  });

  test("should return available time slots excluding slots during special closures", async () => {
    const mockDate = new Date();
    (
      workingHoursService.fetchWorkingHoursByDate as jest.Mock
    ).mockResolvedValue("08:00 - 18:00");

    (appointmentService.fetchAppointmentsByDate as jest.Mock).mockResolvedValue(
      [],
    );

    (
      specialClosureService.fetchSpecialClosuresByDate as jest.Mock
    ).mockResolvedValue([
      {
        closureId: "1",
        startTime: new Date(mockDate.setHours(12, 0, 0, 0)),
        endTime: new Date(mockDate.setHours(13, 0, 0, 0)),
      },
    ]);

    const result = await getAvailableTimeSlots(mockDate, 30);

    // Expected result based on the mocked data
    const expectedResult = [
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ];

    // Check that the expected result matches the actual result
    expect(result).toEqual(expectedResult);

    // Additional checks to ensure specific times are not included
    expect(result).not.toContain("12:00");
    expect(result).not.toContain("12:30");
  });

  test("should return available time slots excluding past slots for the current day", async () => {
    jest.setSystemTime(new Date("2024-8-5 14:00:00"));
    const mockDate = new Date();

    (
      workingHoursService.fetchWorkingHoursByDate as jest.Mock
    ).mockResolvedValue("08:00 - 18:00");

    (appointmentService.fetchAppointmentsByDate as jest.Mock).mockResolvedValue(
      [],
    );

    (
      specialClosureService.fetchSpecialClosuresByDate as jest.Mock
    ).mockResolvedValue([]);

    const result = await getAvailableTimeSlots(mockDate, 30);

    const expectedResult = [
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ];
    expect(result).toEqual(expectedResult);

    const notExpectedResult = [
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
    ];
    expect(result).not.toEqual(notExpectedResult);
  });

  test("should return empty array if all days in the range are closed", async () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 2); // 2 days later

    const mockWorkingHours: WorkingHours = {
      monday: "Closed",
      tuesday: "Closed",
      wednesday: "Closed",
      thursday: "Closed",
      friday: "Closed",
      saturday: "Closed",
      sunday: "Closed",
    };

    (workingHoursService.fetchWorkingHours as jest.Mock).mockResolvedValue(
      mockWorkingHours,
    );

    (
      specialClosureService.fetchSpecialClosuresByDateRange as jest.Mock
    ).mockResolvedValue([]);

    const result = await getAvailableDays(startDate, endDate, 30);

    expect(result).toEqual([]);
  });
});
