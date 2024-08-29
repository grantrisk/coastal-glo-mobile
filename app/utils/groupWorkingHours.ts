import { WorkingHours } from "../lib/schemas";

type GroupedWorkingHours = { days: string; hours: string };

export const groupWorkingHours = (
  workingHours: WorkingHours,
): GroupedWorkingHours[] => {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const days = Object.keys(workingHours) as (keyof WorkingHours)[];
  const sortedDays = days.sort(
    (a, b) =>
      dayNames.indexOf(a.charAt(0).toUpperCase() + a.slice(1)) -
      dayNames.indexOf(b.charAt(0).toUpperCase() + b.slice(1)),
  );

  const groupedHours: GroupedWorkingHours[] = [];
  let currentGroup: GroupedWorkingHours | null = null;
  let startDay = "";

  for (const day of sortedDays) {
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    const hours = workingHours[day];
    if (currentGroup && currentGroup.hours === hours) {
      currentGroup.days = `${startDay} - ${capitalizedDay}`;
    } else {
      if (currentGroup) {
        groupedHours.push(currentGroup);
      }
      startDay = capitalizedDay;
      currentGroup = { days: capitalizedDay, hours };
    }
  }

  if (currentGroup) {
    groupedHours.push(currentGroup);
  }

  return groupedHours;
};
