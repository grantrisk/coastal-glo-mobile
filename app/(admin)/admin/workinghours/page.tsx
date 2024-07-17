"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { WorkingHours } from "../../../lib/schemas";
import { workingHoursService } from "../../../lib/dependencyInjector";
import WorkingHoursFormModal from "../../../components/WorkingHoursFormModal";
import useModal from "../../../hooks/useModal";

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
  const [currentDay, setCurrentDay] = useState<keyof WorkingHours | null>(null);
  const [currentHours, setCurrentHours] = useState<string>("");

  const workingHoursFormModal = useModal();

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    try {
      const fetchedWorkingHours = await workingHoursService.fetchWorkingHours();
      setWorkingHours(fetchedWorkingHours);
    } catch (error) {
      console.error("Error fetching working hours:", error);
      setError(" ");
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

  const handleOpenModal = (day: keyof WorkingHours, hours: string) => {
    setCurrentDay(day);
    setCurrentHours(hours);
    workingHoursFormModal.openModal();
  };

  const handleCloseModal = () => {
    workingHoursFormModal.closeModal(() => {
      setCurrentDay(null);
      setCurrentHours("");
    });
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
                    handleOpenModal(day as keyof WorkingHours, hours)
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
      {workingHoursFormModal.isOpen && currentDay && (
        <WorkingHoursFormModal
          day={currentDay}
          currentHours={currentHours}
          onClose={handleCloseModal}
          onSave={updateWorkingHours}
          isClosing={workingHoursFormModal.isClosing}
        />
      )}
    </>
  );
};

export default WorkingHoursPage;
