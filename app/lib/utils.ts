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
