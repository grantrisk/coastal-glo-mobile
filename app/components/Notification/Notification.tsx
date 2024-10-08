"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBell } from "react-icons/fa";
import styles from "./Notification.module.css";

interface NotificationProps {
  topPadding?: string;
}

const Notification: React.FC<NotificationProps> = ({ topPadding }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
    setIsHovered(!isHovered);
  };

  return (
    <div
      className={`${styles.container} ${isMinimized ? styles.minimized : ""}`}
      style={{ top: topPadding || "20px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className={styles.arrow} onClick={handleToggle}>
          {isMinimized ? <FaArrowLeft /> : <FaArrowRight />}
        </div>
      )}
      {!isHovered && (
        <div className={styles.pulsatingBellContainer}>
          <FaBell className={styles.pulsatingBell} />
        </div>
      )}
      {!isMinimized && (
        <span className={styles.text}>
          On maternity leave, returning in Spring 2025
        </span>
      )}
    </div>
  );
};

export default Notification;
