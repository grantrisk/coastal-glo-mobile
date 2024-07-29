/**
 * Converts military time (24-hour format) to 12-hour format with AM/PM.
 *
 * This function takes a time string in "HH:MM" format, converts it to a 12-hour format,
 * and appends "AM" or "PM" as appropriate. It handles the conversion of hours to ensure
 * that "00:XX" is correctly converted to "12:XX AM" and times in the afternoon are
 * represented with "PM".
 *
 * @param {string} time - The time in 24-hour format ("HH:MM").
 * @returns {string} The time in 12-hour format with "AM" or "PM" suffix.
 */
export const convertMilitaryTimeToAMPM = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};
