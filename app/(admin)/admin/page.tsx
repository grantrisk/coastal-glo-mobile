"use client";

import React, { useState } from "react";
import styles from "../../../styles/AdminDashboard.module.css";
import {
  getAvailableTimeSlots,
  getAvailableDays,
  convertMilitaryTimeToAMPM,
} from "../../utils";

// Admin Dashboard Component
export default function Dashboard() {
  // State to store available time slots
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch available time slots for appointments on July 24th, 2024
  const dateToFetch = new Date(2024, 7, 2);

  // Fetch available days between July 28th and August 3rd, 2024
  /*const startDate = new Date(2024, 6, 28);
  const endDate = new Date(2024, 7, 3);*/
  const startDate = new Date(2024, 6, 29);
  const endDate = new Date(2024, 6, 29);

  const fetchTimeSlots = async () => {
    setLoading(true);
    setError(null);
    try {
      const slots = await getAvailableTimeSlots(dateToFetch, 30);
      setAvailableTimeSlots(slots);
    } catch (err) {
      setError("Failed to fetch available time slots.");
    }
    setLoading(false);
  };

  const fetchDays = async () => {
    setLoading(true);
    setError(null);
    try {
      const days = await getAvailableDays(startDate, endDate);
      setAvailableDays(days);
    } catch (err) {
      setError("Failed to fetch available days.");
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
        <p>Available Time Slots on {dateToFetch.toDateString()}</p>
        <ul>
          {availableTimeSlots.map((slot, index) => (
            <li key={index}>{convertMilitaryTimeToAMPM(slot)}</li>
          ))}
        </ul>
        <button onClick={fetchDays} disabled={loading}>
          {loading ? "Loading..." : "Fetch Available Days"}
        </button>
        <p>
          Available Days between {startDate.toDateString()} and{" "}
          {endDate.toDateString()}
        </p>
        <ul>
          {availableDays.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
