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
