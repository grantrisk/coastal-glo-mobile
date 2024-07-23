import {
  appointmentService,
  workingHoursService,
  specialClosureService,
} from "../lib/dependencyInjector";
import { WorkingHours, Appointment, SpecialClosure } from "../lib/schemas";
import { getMilitaryTime } from "./dateUtils";

/**
 * Converts a time from 12-hour format to 24-hour format.
 *
 * @param {string} time - The time in 12-hour format (e.g., "9:00 AM").
 * @returns {string} The time in 24-hour format (e.g., "09:00").
 */
const convertTo24HourFormat = (time: string): string => {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

/**
 * Generates time slots between the given start and end time in 24-hour format.
 * This function converts the start and end times to 24-hour format, then iterates
 * through the time range in increments of `TIME_SLOT_INTERVAL` minutes to generate
 * a list of time slots.
 *
 * @param {string} startTime - The start time in 12-hour format (e.g., "9:00 AM").
 * @param {string} endTime - The end time in 12-hour format (e.g., "5:00 PM").
 * @param {number} duration - The duration of each time slot in minutes.
 * @returns {string[]} An array of time slots in 24-hour format (e.g., ["09:00", "09:30", ..., "16:30"]).
 */
const generateTimeSlots = (
  startTime: string,
  endTime: string,
  duration: number,
): string[] => {
  const slots: string[] = [];
  const [startHour, startMinute] = convertTo24HourFormat(startTime)
    .split(":")
    .map(Number);
  const [endHour, endMinute] = convertTo24HourFormat(endTime)
    .split(":")
    .map(Number);

  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute < endMinute)
  ) {
    slots.push(
      `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`,
    );
    currentMinute += duration;
    if (currentMinute >= 60) {
      currentHour += 1;
      currentMinute -= 60;
    }
  }

  return slots;
};

/**
 * Asynchronously fetches available time slots for appointments on a given date.
 *
 * @param {Date} date - The date for which to fetch available time slots.
 * @param {number} serviceDuration - The duration of each time slot in minutes.
 * @returns {Promise<string[]>} A promise that resolves to an array of strings, each representing an available
 *                              time slot in 24-hour format (e.g., "09:00").
 */
const getAvailableTimeSlots = async (
  date: Date,
  serviceDuration: number,
): Promise<string[]> => {
  // FIXME: this is still not working for partial closure days
  const workingHours: string =
    await workingHoursService.fetchWorkingHoursByDate(date);

  if (workingHours === "Closed") {
    return [];
  }

  const appointments: Appointment[] =
    await appointmentService.fetchAppointmentsByDate(date);

  const specialClosures: SpecialClosure[] =
    await specialClosureService.fetchSpecialClosuresByDate(date);

  // Generate initial available time slots based on working hours
  let availableSlots: string[] = generateTimeSlots(
    workingHours.split(" - ")[0],
    workingHours.split(" - ")[1],
    serviceDuration,
  );

  // Remove slots that are already booked
  appointments.forEach((appointment) => {
    const bookedSlot = appointment.appointmentDate.toTimeString().slice(0, 5);
    const index = availableSlots.indexOf(bookedSlot);
    if (index !== -1) {
      availableSlots.splice(index, 1);
    }
  });

  // Adjust available slots based on special closures
  specialClosures.forEach((closure) => {
    const closureStart = convertTo24HourFormat(
      getMilitaryTime(closure.startTime),
    );
    const closureEnd = convertTo24HourFormat(getMilitaryTime(closure.endTime));

    // Filter out slots that fall within the closure period
    availableSlots = availableSlots.filter((slot) => {
      return slot < closureStart || slot >= closureEnd;
    });

    // Handle edge cases where closures span over the slots
    const startHour = workingHours.split(" - ")[0];
    const endHour = workingHours.split(" - ")[1];

    if (closureStart > startHour && closureEnd < endHour) {
      // Split available slots into two parts: before and after the closure period
      const beforeClosure = generateTimeSlots(
        startHour,
        closureStart,
        serviceDuration,
      );
      const afterClosure = generateTimeSlots(
        closureEnd,
        endHour,
        serviceDuration,
      );

      // Combine both parts into available slots
      availableSlots = beforeClosure.concat(afterClosure);
    }
  });

  return availableSlots;
};

/**
 * Asynchronously fetches available days for appointments between the given start and end dates.
 *
 * @param {Date} startDate - The start date for which to fetch available days.
 * @param {Date} endDate - The end date for which to fetch available days.
 * @returns {Promise<string[]>} A promise that resolves to an array of strings, each representing an available
 *                             day in the format "YYYY-MM-DD".
 */
const getAvailableDays = async (
  startDate: Date,
  endDate: Date,
): Promise<string[]> => {
  console.log(`Fetching working hours for range: ${startDate} to ${endDate}`);
  const workingHours: WorkingHours =
    await workingHoursService.fetchWorkingHours();
  console.log(`Working hours: ${workingHours}`);

  console.log(
    `Fetching special closures for range: ${startDate} to ${endDate}`,
  );
  let specialClosures: SpecialClosure[] = [];
  try {
    specialClosures =
      await specialClosureService.fetchSpecialClosuresByDateRange(
        startDate,
        endDate,
      );
    console.log(`Special closures: ${specialClosures}`);
  } catch (error) {
    console.error(`Failed to fetch special closures: ${error.message}`);
    return [];
  }

  const availableDays: string[] = [];
  const dateIterator = new Date(startDate);

  while (dateIterator <= endDate) {
    console.log(`Checking date: ${dateIterator}`);
    const dayOfWeek = dateIterator
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();
    const hours = workingHours[dayOfWeek as keyof WorkingHours];
    console.log(`Working hours for ${dayOfWeek}: ${hours}`);

    if (hours !== "Closed") {
      const [startHour, endHour] = hours
        .split(" - ")
        .map((time) => new Date(dateIterator.toDateString() + " " + time));
      let isClosed = false;

      specialClosures.forEach((closure) => {
        const closureStart = new Date(closure.startTime);
        const closureEnd = new Date(closure.endTime);

        if (
          (closureStart <= startHour && closureEnd >= startHour) || // Closure starts before working hours end after working hours start
          (closureStart <= endHour && closureEnd >= endHour) || // Closure starts before working hours end after working hours end
          (closureStart >= startHour && closureEnd <= endHour) // Closure is completely within working hours
        ) {
          if (closureStart <= startHour && closureEnd >= endHour) {
            isClosed = true; // Full day closure
          } else {
            // Partial closure
            const remainingHours = [
              { start: startHour, end: closureStart },
              { start: closureEnd, end: endHour },
            ].filter(({ start, end }) => start < end); // Filter valid remaining hours

            // Check if any remaining hours are available
            isClosed = remainingHours.length === 0;
          }
        }
      });

      if (!isClosed) {
        console.log(
          `Adding available day: ${dateIterator.toISOString().split("T")[0]}`,
        );
        availableDays.push(dateIterator.toISOString().split("T")[0]);
      } else {
        console.log(`Day closed: ${dateIterator.toISOString().split("T")[0]}`);
      }
    } else {
      console.log(`Day closed: ${dateIterator.toISOString().split("T")[0]}`);
    }

    dateIterator.setDate(dateIterator.getDate() + 1);
  }

  console.log(`Available days: ${availableDays}`);
  return availableDays;
};

export { getAvailableTimeSlots, getAvailableDays };
