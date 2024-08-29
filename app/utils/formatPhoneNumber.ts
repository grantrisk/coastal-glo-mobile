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
