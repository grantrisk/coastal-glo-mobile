/**
 * Converts a Firestore timestamp to a JavaScript Date object.
 * @param timestamp The Firestore timestamp to convert.
 * @returns A JavaScript Date object or null if the timestamp is falsy.
 */
export function convertTimestamp(timestamp: any): Date | null {
  if (!timestamp) {
    return null;
  }
  return new Date(timestamp.seconds * 1000);
}
