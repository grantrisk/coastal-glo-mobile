import "../globals.css";
import Footer from "../components/Footer/Footer";
import React from "react";

export default function StaticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
