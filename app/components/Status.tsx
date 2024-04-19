"use client";

import React, { useEffect, useState } from "react";
import {
  BsFillMoonStarsFill,
  BsFillSunriseFill,
  BsFillSunsetFill,
  BsSunFill,
} from "react-icons/bs";
import styles from "../../styles/Status.module.css";
import { businessStatus } from "../lib/businessStatus";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

const Status: React.FC = () => {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch("/api/status")
      .then((response) => response.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Error fetching status"));
  }, []);

  const iconSize = "1.5em";

  const getIcon = (currentStatus: string) => {
    switch (currentStatus) {
      case businessStatus.open:
        return <BsSunFill size={iconSize} />;
      case businessStatus.openingSoon:
        return <BsFillSunriseFill size={iconSize} />;
      case businessStatus.closed:
        return <BsFillMoonStarsFill size={iconSize} />;
      case businessStatus.closingSoon:
        return <BsFillSunsetFill size={iconSize} />;
      case businessStatus.vacation:
        return <FaPersonWalkingLuggage size={iconSize} />;
      default:
        return null; // You might want to have a default icon or return null
    }
  };

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case businessStatus.open:
        return "#b6d7a8"; // A greenish color
      case businessStatus.openingSoon:
        return "#ffd966"; // A yellow color
      case businessStatus.closed:
        return "#ea9999"; // A reddish color
      case businessStatus.closingSoon:
        return "#f9cb9c"; // A lighter orange
      case businessStatus.vacation:
        return "#a3c6e6"; // A blue color
      default:
        return "#ccc"; // Grey color for loading or error
    }
  };

  const containerStyle = {
    backgroundColor: getStatusColor(status),
  };

  return (
    <div className={styles.status} style={containerStyle}>
      <p>Status: {status}</p>
      {getIcon(status)}
    </div>
  );
};

export default Status;
