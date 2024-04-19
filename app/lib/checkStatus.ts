import { businessHours, businessStatus, vacations } from "./businessStatus";

function checkStatus(currentTime: Date): string {
  const today = currentTime
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  // Check vacation
  for (const vacation of vacations) {
    const start = new Date(vacation.start);
    const end = new Date(vacation.end);
    if (currentTime >= start && currentTime <= end) {
      return businessStatus.vacation;
    }
  }

  // Check business hours
  const hours = businessHours[today];
  if (hours) {
    const openingTime = new Date(
      currentTime.toDateString() + " " + hours.start,
    );
    const closingTime = new Date(currentTime.toDateString() + " " + hours.end);
    const openingSoonTime = new Date(openingTime.getTime() - 30 * 60 * 1000); // 30 minutes before opening
    const closingSoonTime = new Date(closingTime.getTime() - 30 * 60 * 1000); // 30 minutes before closing

    if (currentTime >= openingSoonTime && currentTime < openingTime) {
      return businessStatus.openingSoon;
    } else if (currentTime >= closingSoonTime && currentTime < closingTime) {
      return businessStatus.closingSoon;
    } else if (currentTime >= openingTime && currentTime < closingTime) {
      return businessStatus.open;
    }
  }

  return businessStatus.closed;
}

export default checkStatus;
