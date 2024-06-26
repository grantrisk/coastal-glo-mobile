"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { z } from "zod";
import { workingHoursSchema } from "../../../lib/schemas";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // Ensure you have Firebase initialized in this file

// Type inference from schema
type WorkingHours = z.infer<typeof workingHoursSchema>;

const defaultWorkingHours: WorkingHours = {
  monday: "9:00 AM - 5:00 PM",
  tuesday: "9:00 AM - 5:00 PM",
  wednesday: "9:00 AM - 5:00 PM",
  thursday: "9:00 AM - 5:00 PM",
  friday: "9:00 AM - 5:00 PM",
  saturday: "10:00 AM - 4:00 PM",
  sunday: "Closed",
};

// Admin Dashboard Component for Managing Working Hours
export default function WorkingHoursPage() {
  const [workingHours, setWorkingHours] = useState<WorkingHours | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const docRef = doc(db, "workingHours", "default");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWorkingHours(docSnap.data() as WorkingHours);
        } else {
          console.log("No such document!");
          setError(
            "No working hours found. Please create default working hours.",
          );
        }
      } catch (error) {
        console.error("Error fetching working hours:", error);
        setError("Failed to fetch working hours. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkingHours();
  }, []);

  const createDefaultWorkingHours = async () => {
    try {
      const docRef = doc(db, "workingHours", "default");
      await setDoc(docRef, defaultWorkingHours);
      setWorkingHours(defaultWorkingHours);
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

    const updatedData = { ...workingHours, [day]: updatedHours };
    setWorkingHours(updatedData);

    const docRef = doc(db, "workingHours", "default");
    await updateDoc(docRef, { [day]: updatedHours });
  };

  const deleteWorkingHours = async (day: keyof WorkingHours) => {
    if (!workingHours) return;

    const { [day]: _, ...remainingHours } = workingHours;
    setWorkingHours(remainingHours as WorkingHours);

    const docRef = doc(db, "workingHours", "default");
    await updateDoc(docRef, { [day]: "" });
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

  return (
    <>
      <div className={styles.section}>
        <h2>Working Hours</h2>
        <ul className={styles.list}>
          {workingHours &&
            Object.entries(workingHours).map(([day, hours]) => (
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
                      deleteWorkingHours(day as keyof WorkingHours)
                    }
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
