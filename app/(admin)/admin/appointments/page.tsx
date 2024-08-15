"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./AdminAppointments.module.css";
import { Appointment } from "../../../lib/schemas";
import { appointmentService } from "../../../lib/dependencyInjector";
import useModal from "../../../hooks/useModal";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AppointmentDetailsModal from "../../../components/AppointmentDetailsModal/AppointmentDetailsModal";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const detailsModal = useModal();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const fetchedAppointments =
        await appointmentService.fetchAllAppointments();
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to fetch appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (info: { event: { id: string } }) => {
    const clickedAppointment = appointments.find(
      (appointment) => appointment.appointmentId === info.event.id,
    );
    if (clickedAppointment) {
      setSelectedAppointment(clickedAppointment);
      detailsModal.openModal();
    }
  };

  const handleAppointmentUpdated = (updatedAppointment: Appointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.appointmentId === updatedAppointment.appointmentId
          ? updatedAppointment
          : appointment,
      ),
    );
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className={styles.section}>
        <p>{error}</p>
      </div>
    );
  }

  const events = appointments.map((appointment) => ({
    id: appointment.appointmentId,
    title: `${appointment.guestInfo?.firstName} ${appointment.guestInfo?.lastName}`,
    start: appointment.appointmentDate,
    end: new Date(
      appointment.appointmentDate.getTime() +
        appointment.service.duration! * 60000,
    ),
  }));

  return (
    <>
      <div className={styles.section}>
        <AdminHeader title={"Manage Appointments"} />
        <br />
        <div className={styles.calendarContainer}>
          <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            nowIndicator={true}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            height="100%"
            editable={true}
            eventClick={handleEventClick}
          />
        </div>
        <br />
      </div>
      {detailsModal.isOpen && selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => detailsModal.closeModal()}
          isClosing={detailsModal.isClosing}
          onAppointmentDeleted={(deletedAppointmentId) => {
            setAppointments((prevAppointments) =>
              prevAppointments.filter(
                (appointment) =>
                  appointment.appointmentId !== deletedAppointmentId,
              ),
            );
          }}
          onAppointmentUpdated={handleAppointmentUpdated} // Pass the new prop
        />
      )}
    </>
  );
}
