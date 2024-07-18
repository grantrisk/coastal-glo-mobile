"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { WorkingHours, SpecialClosure } from "../../../lib/schemas";
import {
  workingHoursService,
  specialClosureService,
} from "../../../lib/dependencyInjector";
import WorkingHoursFormModal from "../../../components/WorkingHoursFormModal";
import SpecialClosureFormModal from "../../../components/SpecialClosureFormModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import useModal from "../../../hooks/useModal";
import { convertMilitaryTimeToAMPM as formatTime } from "../../../utils";

const dayOrder = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

// Admin Dashboard Component for Managing Working Hours and Special Closures
const WorkingHoursPage: React.FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHours | null>(null);
  const [specialClosures, setSpecialClosures] = useState<SpecialClosure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<keyof WorkingHours | null>(null);
  const [currentHours, setCurrentHours] = useState<string>("");
  const [currentClosure, setCurrentClosure] = useState<SpecialClosure | null>(
    null,
  );
  const [closureToDelete, setClosureToDelete] = useState<SpecialClosure | null>(
    null,
  );

  const workingHoursFormModal = useModal();
  const specialClosureFormModal = useModal();
  const confirmationModal = useModal();

  useEffect(() => {
    fetchWorkingHours();
    fetchSpecialClosures();
  }, []);

  const fetchWorkingHours = async () => {
    try {
      const fetchedWorkingHours = await workingHoursService.fetchWorkingHours();
      setWorkingHours(fetchedWorkingHours);
    } catch (error) {
      console.error("Error fetching working hours:", error);
      setError("Failed to fetch working hours. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecialClosures = async () => {
    try {
      const fetchedSpecialClosures =
        await specialClosureService.fetchSpecialClosures();
      setSpecialClosures(fetchedSpecialClosures);
    } catch (error) {
      console.error("Error fetching special closures:", error);
      setError("Failed to fetch special closures. Please try again later.");
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

  const addOrUpdateSpecialClosure = async (closure: SpecialClosure) => {
    try {
      if (closure.id) {
        await specialClosureService.updateSpecialClosure(closure.id, closure);
      } else {
        await specialClosureService.createSpecialClosure(closure);
      }
      await fetchSpecialClosures();
      specialClosureFormModal.closeModal();
    } catch (error) {
      console.error("Error saving special closure:", error);
      setError("Failed to save special closure. Please try again later.");
    }
  };

  const deleteSpecialClosure = async (id: string) => {
    try {
      await specialClosureService.removeSpecialClosure(id);
      setSpecialClosures(
        specialClosures.filter((closure) => closure.id !== id),
      );
    } catch (error) {
      console.error("Error deleting special closure:", error);
      setError("Failed to delete special closure. Please try again later.");
    }
  };

  const handleOpenWorkingHoursModal = (
    day: keyof WorkingHours,
    hours: string,
  ) => {
    setCurrentDay(day);
    setCurrentHours(hours);
    workingHoursFormModal.openModal();
  };

  const handleOpenSpecialClosureModal = (closure?: SpecialClosure) => {
    setCurrentClosure(closure || null);
    specialClosureFormModal.openModal();
  };

  const handleOpenConfirmation = (closure: SpecialClosure) => {
    setClosureToDelete(closure);
    confirmationModal.openModal();
  };

  const handleConfirmDelete = () => {
    if (closureToDelete) {
      deleteSpecialClosure(closureToDelete.id);
      confirmationModal.closeModal();
    }
  };

  const handleCloseWorkingHoursModal = () => {
    workingHoursFormModal.closeModal(() => {
      setCurrentDay(null);
      setCurrentHours("");
    });
  };

  const handleCloseSpecialClosureModal = () => {
    specialClosureFormModal.closeModal(() => {
      setCurrentClosure(null);
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
                    handleOpenWorkingHoursModal(
                      day as keyof WorkingHours,
                      hours,
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
      <div className={styles.section}>
        <h2>Special Closures</h2>
        <button
          onClick={() => handleOpenSpecialClosureModal()}
          className={styles.createButton}
        >
          Add Special Closure
        </button>
        {specialClosures.length === 0 ? (
          <p>No special closures found.</p>
        ) : (
          <ul className={styles.list}>
            {specialClosures.map((closure) => (
              <li key={closure.id} className={styles.listItem}>
                {closure.date.toDateString()}: {formatTime(closure.startTime)} -{" "}
                {formatTime(closure.endTime)}
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleOpenSpecialClosureModal(closure)}
                    className={styles.button}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleOpenConfirmation(closure)}
                    className={styles.button}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {workingHoursFormModal.isOpen && currentDay && (
        <WorkingHoursFormModal
          day={currentDay}
          currentHours={currentHours}
          onClose={handleCloseWorkingHoursModal}
          onSave={updateWorkingHours}
          isClosing={workingHoursFormModal.isClosing}
        />
      )}
      {specialClosureFormModal.isOpen && (
        <SpecialClosureFormModal
          closure={currentClosure}
          onClose={handleCloseSpecialClosureModal}
          onSave={addOrUpdateSpecialClosure}
          isClosing={specialClosureFormModal.isClosing}
        />
      )}
      {confirmationModal.isOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this special closure?"
          onConfirm={handleConfirmDelete}
          onClose={() => confirmationModal.closeModal()}
          isClosing={confirmationModal.isClosing}
        />
      )}
    </>
  );
};

export default WorkingHoursPage;
