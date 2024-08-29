"use client";

import "../globals.css";
import Footer from "../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import Notification from "../components/Notification/Notification";

export default function StaticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [topPadding, setTopPadding] = useState("70px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setTopPadding("20px");
      } else {
        setTopPadding("70px");
      }
    };

    handleResize(); // Set the initial state based on the current window size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Notification topPadding={topPadding} />
      {children}
      <Footer />
    </>
  );
}
