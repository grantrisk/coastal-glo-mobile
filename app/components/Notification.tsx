"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "../../styles/Notification.module.css";

const Notification: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
    setIsHovered(!isHovered);
  };

  return (
    <div
      className={`${styles.container} ${isMinimized ? styles.minimized : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className={styles.arrow} onClick={handleToggle}>
          {isMinimized ? <FaArrowLeft /> : <FaArrowRight />}
        </div>
      )}
      {!isHovered && <div className={styles.pulsatingDot}></div>}
      {!isMinimized && (
        <span className={styles.text}>
          On maternity leave, returning in Spring 2025
        </span>
      )}
    </div>
  );
};

export default Notification;
