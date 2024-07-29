"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminDashboard.module.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import DashboardNav from "../components/DashboardNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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

  if (loading) {
    return <p className={styles.loadingText}>Loading...</p>;
  }

  return user ? (
    <>
      <main className={styles.dashboardMain}>
        <DashboardNav />
        <section className={styles.dashboardContent}>{children}</section>
      </main>
    </>
  ) : null;
};

export default AdminLayout;
