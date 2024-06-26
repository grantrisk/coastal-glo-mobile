"use client";

import React, { useState } from "react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { z } from "zod";
import { workingHoursSchema } from "../../../lib/schemas";

// Type inference from schema
type WorkingHours = z.infer<typeof workingHoursSchema>;

// Admin Dashboard Component for Managing Working Hours
export default function WorkingHoursPage() {
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM",
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed",
  });

  const updateWorkingHours = (
    day: keyof WorkingHours,
    updatedHours: string,
  ) => {
    setWorkingHours({ ...workingHours, [day]: updatedHours });
  };

  const deleteWorkingHours = (day: keyof WorkingHours) => {
    const { [day]: _, ...remainingHours } = workingHours;
    setWorkingHours(remainingHours as WorkingHours);
  };

  return (
    <>
      <div className={styles.section}>
        <h2>Working Hours</h2>
        <ul className={styles.list}>
          {Object.entries(workingHours).map(([day, hours]) => (
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
                  onClick={() => deleteWorkingHours(day as keyof WorkingHours)}
                  className={styles.button}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
