"use client";

import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import { getAvailableTimeSlots, convertMilitaryTimeToAMPM } from "../../utils";

// Admin Dashboard Component
export default function Dashboard() {
  // State to store available time slots
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTimeSlots = async () => {
    setLoading(true);
    setError(null);
    try {
      const slots = await getAvailableTimeSlots(new Date(2024, 6, 25), 30);
      setAvailableTimeSlots(slots);
    } catch (err) {
      setError("Failed to fetch available time slots.");
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div className={styles.container}>
        <button onClick={fetchTimeSlots} disabled={loading}>
          {loading ? "Loading..." : "Fetch Available Time Slots"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <p>Available Time Slots:</p>
        <ul>
          {availableTimeSlots.map((slot, index) => (
            <li key={index}>{convertMilitaryTimeToAMPM(slot)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
