"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { WorkingHours } from "../../../lib/schemas";
import workingHoursService from "../../../services/workingHoursService";

const dayOrder = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

// Admin Dashboard Component for Managing Working Hours
const WorkingHoursPage: React.FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHours | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    try {
      const fetchedWorkingHours = await workingHoursService.fetchWorkingHours();
      setWorkingHours(fetchedWorkingHours);
    } catch (error) {
      console.error("Error fetching working hours:", error);
      setError("No working hours found. Please create default working hours.");
    } finally {
      setLoading(false);
    }
  };

  const createDefaultWorkingHours = async () => {
    try {
      await workingHoursService.createDefaultWorkingHours();
      await fetchWorkingHours();
      setError(null);
    } catch (error) {
      console.error("Error creating default working hours:", error);
      setError(
        "Failed to create default working hours. Please try again later.",
      );
    }
  };

  const updateWorkingHours = async (
    day: keyof WorkingHours,
    updatedHours: string,
  ) => {
    if (!workingHours) return;

    try {
      await workingHoursService.updateWorkingHours(day, updatedHours);
      setWorkingHours({ ...workingHours, [day]: updatedHours });
    } catch (error) {
      console.error("Error updating working hours:", error);
      setError("Failed to update working hours. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className={styles.section}>
        <p>{error}</p>
        <button onClick={createDefaultWorkingHours} className={styles.button}>
          Create Default Working Hours
        </button>
      </div>
    );
  }

  const orderedWorkingHours = dayOrder
    .filter(
      (day) =>
        workingHours && workingHours[day as keyof WorkingHours] !== undefined,
    )
    .map(
      (day) =>
        [day, workingHours![day as keyof WorkingHours]] as [string, string],
    );

  return (
    <>
      <div className={styles.section}>
        <h2>Working Hours</h2>
        <ul className={styles.list}>
          {orderedWorkingHours.map(([day, hours]) => (
            <li key={day} className={styles.listItem}>
              {day.charAt(0).toUpperCase() + day.slice(1)}: {hours}
              <div className={styles.buttonGroup}>
                <button
                  onClick={() =>
                    updateWorkingHours(
                      day as keyof WorkingHours,
                      "8:00 AM - 4:00 PM",
                    )
                  }
                  className={styles.button}
                >
                  Update
                </button>
                <button
                  onClick={() =>
                    updateWorkingHours(day as keyof WorkingHours, "Closed")
                  }
                  className={styles.button}
                >
                  Set Closed
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WorkingHoursPage;
