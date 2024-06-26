"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminDashboard.module.css";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCalendarAlt,
  faClock,
  faUsers,
  faConciergeBell,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigation.push("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return <p style={{ color: "gold" }}>Loading...</p>;
  }

  return user ? (
    <>
      <main className={styles.dashboardMain}>
        <nav className={styles.dashboardNav}>
          <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
          <ul>
            <Link href={"/admin"} prefetch>
              <li>
                <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
              </li>
            </Link>
            <Link href={"/admin/appointments"} prefetch>
              <li>
                <FontAwesomeIcon icon={faCalendarAlt} /> Manage Appointments
              </li>
            </Link>
            <Link href={"/admin/workinghours"} prefetch>
              <li>
                <FontAwesomeIcon icon={faClock} /> Working Hours
              </li>
            </Link>
            <Link href={"/admin/clients"} prefetch>
              <li>
                <FontAwesomeIcon icon={faUsers} /> Clients
              </li>
            </Link>
            <Link href={"/admin/services"} prefetch>
              <li>
                <FontAwesomeIcon icon={faConciergeBell} /> Services
              </li>
            </Link>
          </ul>
          <button onClick={handleSignOut} className={styles.button}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
          </button>
        </nav>
        <section className={styles.dashboardContent}>{children}</section>
      </main>
    </>
  ) : null;
}
