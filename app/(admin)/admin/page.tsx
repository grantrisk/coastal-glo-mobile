"use client";

import React from "react";
import styles from "./AdminDashboard.module.css";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

// Admin Dashboard Component
export default function Dashboard() {
  return (
    <>
      <AdminHeader title={"Admin Dashboard"} />
      <div className={styles.container}>
        <h2>Ze Dashboard</h2>
        <p>Manage your world!</p>
      </div>
    </>
  );
}
