"use client";

import React, { useEffect, useState } from "react";
import {
  BsFillMoonStarsFill,
  BsFillSunriseFill,
  BsFillSunsetFill,
  BsSunFill,
} from "react-icons/bs";
import styles from "./Status.module.css";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

const Status: React.FC = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    // URL of the AWS Lambda API Gateway endpoint
    const url =
      "https://sz8mehug3g.execute-api.us-east-1.amazonaws.com/checkBusinessStatus";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStatus(data.status);
      })
      .catch((error) => {
        console.error("Failed to fetch status:", error);
        setStatus("");
      });
  }, []);

  const iconSize = "1.5em";
  const businessStatus = {
    open: "Open",
    openingSoon: "Opening Soon!",
    closed: "Closed",
    closingSoon: "Closing Soon",
    vacation: "On Vacation",
  };

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
        return null;
    }
  };

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case businessStatus.open:
        return "#b6d7a8";
      case businessStatus.openingSoon:
        return "#ffd966";
      case businessStatus.closed:
        return "#ea9999";
      case businessStatus.closingSoon:
        return "#f9cb9c";
      case businessStatus.vacation:
        return "#a3c6e6";
      default:
        return "#ccc";
    }
  };

  const containerStyle = {
    backgroundColor: getStatusColor(status),
  };

  return status ? (
    <div className={styles.status} style={containerStyle}>
      <p>{status}</p>
      {getIcon(status)}
    </div>
  ) : (
    <div />
  );
};

export default Status;
