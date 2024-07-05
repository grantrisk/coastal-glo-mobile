/**
 * Converts a Firestore timestamp to a JavaScript Date object.
 * @param timestamp The Firestore timestamp to convert.
 * @returns A JavaScript Date object or null if the timestamp is falsy.
 */
export function convertTimestamp(timestamp: any): Date | null {
  if (!timestamp) {
    return null;
  }

  console.log(timestamp);
  console.log(new Date(timestamp.seconds * 1000));
  console.log(new Date(timestamp.seconds * 1000).toISOString());
  console.log(new Date(timestamp.seconds * 1000).toISOString().split("T")[0]);
  return new Date(timestamp.seconds * 1000);
}

/**
 * Formats a phone number string into a more readable format.
 * @param number The phone number string to format.
 * @returns The formatted phone number or the original string if it's falsy.
 */
export function formatPhoneNumber(number: string): string {
  if (!number) return number;
  const phoneNumber = number.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
}
