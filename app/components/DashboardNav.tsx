"use client";

import React from "react";
import styles from "../../styles/DashboardNav.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faConciergeBell,
  faSignOutAlt,
  faTachometerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const DashboardNav: React.FC = () => {
  const navigation = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className={styles.dashboardNav}>
      <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
      <ul>
        <Link href={"/admin"}>
          <li className={pathname === "/admin" ? styles.activeLink : ""}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </li>
        </Link>
        <Link href={"/admin/appointments"}>
          <li
            className={
              pathname === "/admin/appointments" ? styles.activeLink : ""
            }
          >
            <FontAwesomeIcon icon={faCalendarAlt} /> Manage Appointments
          </li>
        </Link>
        <Link href={"/admin/clients"}>
          <li
            className={pathname === "/admin/clients" ? styles.activeLink : ""}
          >
            <FontAwesomeIcon icon={faUsers} /> Clients
          </li>
        </Link>
        <Link href={"/admin/services"}>
          <li
            className={pathname === "/admin/services" ? styles.activeLink : ""}
          >
            <FontAwesomeIcon icon={faConciergeBell} /> Services
          </li>
        </Link>
        <Link href={"/admin/workinghours"}>
          <li
            className={
              pathname === "/admin/workinghours" ? styles.activeLink : ""
            }
          >
            <FontAwesomeIcon icon={faClock} /> Working Hours
          </li>
        </Link>
      </ul>
      <button onClick={handleSignOut} className={styles.button}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
      </button>
    </nav>
  );
};

export default DashboardNav;
