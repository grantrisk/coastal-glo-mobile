import {
  appointmentService,
  specialClosureService,
  workingHoursService,
} from "../lib/dependencyInjector";
import { Appointment, SpecialClosure, WorkingHours } from "../lib/schemas";
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
  // Fetch working hours for the given date
  const workingHours: string =
    await workingHoursService.fetchWorkingHoursByDate(date);

  // Return an empty array if the business is closed on the given date
  if (workingHours === "Closed") {
    return [];
  }

  // Fetch existing appointments and special closures for the given date
  const appointments: Appointment[] =
    await appointmentService.fetchAppointmentsByDate(date);

  const specialClosures: SpecialClosure[] =
    await specialClosureService.fetchSpecialClosuresByDate(date);

  // Generate initial time slots based on working hours
  let availableSlots: string[] = generateTimeSlots(
    workingHours.split(" - ")[0],
    workingHours.split(" - ")[1],
    serviceDuration,
  );

  // Remove time slots that are already booked
  appointments.forEach((appointment) => {
    const bookedSlot = appointment.appointmentDate.toTimeString().slice(0, 5);
    const index = availableSlots.indexOf(bookedSlot);
    if (index !== -1) {
      availableSlots.splice(index, 1);
    }
  });

  // Remove time slots that fall within special closure periods
  specialClosures.forEach((closure) => {
    const closureStart = convertTo24HourFormat(
      getMilitaryTime(closure.startTime),
    );
    const closureEnd = convertTo24HourFormat(getMilitaryTime(closure.endTime));

    availableSlots = availableSlots.filter((slot) => {
      return slot < closureStart || slot >= closureEnd;
    });
  });

  return availableSlots;
};

/**
 * Asynchronously fetches available days for appointments between the given start and end dates.
 *
 * @param {Date} startDate - The start date for which to fetch available days.
 * @param {Date} endDate - The end date for which to fetch available days.
 * @param {number} serviceDuration - The duration of each time slot in minutes.
 * @returns {Promise<string[]>} A promise that resolves to an array of strings, each representing an available
 *                             day in the format "YYYY-MM-DD".
 */
const getAvailableDays = async (
  startDate: Date,
  endDate: Date,
  serviceDuration: number,
): Promise<string[]> => {
  // Fetch working hours for the entire date range
  const workingHours: WorkingHours =
    await workingHoursService.fetchWorkingHours();

  // Fetch special closures within the date range
  const specialClosures: SpecialClosure[] =
    await specialClosureService.fetchSpecialClosuresByDateRange(
      startDate,
      endDate,
    );

  const availableDays: string[] = [];
  const dateIterator = new Date(startDate);

  // Iterate through each day in the date range
  while (dateIterator <= endDate) {
    const dayOfWeek = dateIterator
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();
    const hours = workingHours[dayOfWeek as keyof WorkingHours];

    if (hours !== "Closed") {
      const [startHour, endHour] = hours
        .split(" - ")
        .map((time) => new Date(dateIterator.toDateString() + " " + time));
      let isClosed = false;

      // Generate initial time slots based on working hours
      let availableSlots: string[] = generateTimeSlots(
        hours.split(" - ")[0],
        hours.split(" - ")[1],
        serviceDuration,
      );

      // Adjust availability based on special closures
      specialClosures.forEach((closure) => {
        const closureStart = new Date(closure.startTime);
        const closureEnd = new Date(closure.endTime);

        if (
          (closureStart <= startHour && closureEnd >= startHour) || // Closure starts before working hours and ends after working hours start
          (closureStart <= endHour && closureEnd >= endHour) || // Closure starts before working hours end and ends after working hours end
          (closureStart >= startHour && closureEnd <= endHour) // Closure is completely within working hours
        ) {
          if (closureStart <= startHour && closureEnd >= endHour) {
            isClosed = true; // Full day closure
          } else {
            // Partial closure
            availableSlots = availableSlots.filter((slot) => {
              const slotTime = new Date(
                dateIterator.toDateString() + " " + slot,
              );
              return slotTime < closureStart || slotTime >= closureEnd;
            });
          }
        }
      });

      // Adjust availability based on appointments
      if (!isClosed) {
        const appointments: Appointment[] =
          await appointmentService.fetchAppointmentsByDate(dateIterator);

        const availableSlotsAfterAppointments = availableSlots.filter(
          (slot) => {
            return !appointments.some((appointment) => {
              const appointmentTime = appointment.appointmentDate
                .toTimeString()
                .slice(0, 5);
              return appointmentTime === slot;
            });
          },
        );

        // Add the day to available days if there are any available slots
        if (availableSlotsAfterAppointments.length > 0) {
          availableDays.push(dateIterator.toISOString().split("T")[0]);
        }
      }
    }

    // Move to the next day
    dateIterator.setDate(dateIterator.getDate() + 1);
  }

  return availableDays;
};

// FIXME: This may need to be improved for scenarios where there are 45 minute duration slots and there are
//  existing appointments that are 30 minutes long. Not sure if this is a valid scenario, but it's worth considering.

// FIXME: eventually refactor this file to not duplicate code

export { getAvailableTimeSlots, getAvailableDays };
