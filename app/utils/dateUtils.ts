/**
 * Creates a Date object from a given date string.
 * The date string should be in the format "YYYY-MM-DD".
 * If the date string is empty or not provided, returns the current date.
 *
 * @param {string} dateString - The date string in "YYYY-MM-DD" format.
 * @returns {Date} A Date object corresponding to the given date string, or the current date if the string is empty.
 */
export const createDateObject = (dateString: string): Date => {
  if (!dateString) {
    return new Date();
  }
  const [year, month, day] = dateString.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

/**
 * Formats a Date object into a string in "YYYY-MM-DD" format.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} A string representing the formatted date in "YYYY-MM-DD" format.
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Creates a Date object from a given datetime string.
 * The datetime string should be in the format "YYYY-MM-DDTHH:MM".
 * If the datetime string is empty or not provided, returns the current date.
 *
 * @param {string} dateTimeString - The datetime string in "YYYY-MM-DDTHH:MM" format.
 * @returns {Date} A Date object corresponding to the given datetime string, or the current date if the string is empty.
 */
export const createDateTimeObject = (dateTimeString: string): Date => {
  if (!dateTimeString) {
    return new Date();
  }
  return new Date(dateTimeString);
};

/**
 * Formats a Date object into a string in "YYYY-MM-DDTHH:MM" format.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} A string representing the formatted datetime in "YYYY-MM-DDTHH:MM" format.
 */
export const formatDateTime = (date: Date): string => {
  const tzOffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

/**
 * Converts a military time string to AM/PM format.
 * The input should be in the format "HH:MM".
 *
 * @param date - The Date object to convert to military time.
 * @returns {string} The input time string in AM/PM format.
 */
export const getMilitaryTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
