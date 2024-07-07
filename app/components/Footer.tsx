"use client";

import styles from "../../styles/Footer.module.css";
import Image from "next/image";
import NextLink from "next/link";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import Status from "./Status";
import React, { useEffect, useState } from "react";
import { FiCornerDownRight } from "react-icons/fi";
import { workingHoursService } from "../lib/dependencyInjector";
import { WorkingHours } from "../lib/schemas";
import { groupWorkingHours } from "../utils";

export default function Footer() {
  const [workingHours, setWorkingHours] = useState<WorkingHours | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const hours = await workingHoursService.fetchWorkingHours();
        setWorkingHours(hours);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while fetching working hours.");
        }
      }
    };

    fetchWorkingHours();
  }, []);

  const renderWorkingHours = () => {
    if (!workingHours) {
      return <p>Loading...</p>;
    }

    const groupedHours = groupWorkingHours(workingHours);

    return groupedHours.map((group, index) => (
      <p key={index}>
        {group.days}: {group.hours}
        <br />
      </p>
    ));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <h3>Coastal Glo Mobile</h3>
          <h4>Wilmington, NC</h4>
          <div className={styles.emergency}>
            <p>After Hours Emergency Number:</p>
            <p>
              <a href="tel:910-633-7352">
                (910) 633-7352 <FaArrowUpFromBracket />
              </a>
            </p>
          </div>
          <div className={styles.nonEmergency}>
            <p>For questions, please contact me at:</p>
            <p>
              <a href="mailto:coastalglomobile@gmail.com?subject=Question&amp;body=Dear%20Meghan,%0D%0A%0D%0A[Your%20question%20here]%0D%0A%0D%0AThank%20you.">
                coastalglomobile@gmail.com <FaArrowUpFromBracket />
              </a>
            </p>
          </div>
          <div className={styles.hours}>
            <h5>Hours of Operation:</h5>
            {error ? <p>{error}</p> : renderWorkingHours()}
            <br />
            <div className={styles.status}>
              <FiCornerDownRight />
              <Status />
            </div>
          </div>
          <div className={styles.copyright}>
            <p>
              &copy; {new Date().getFullYear()} Coastal Glo Mobile. All Rights
              Reserved.
            </p>
          </div>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.social}>
            <NextLink
              href="https://www.instagram.com/coastalglomobile/"
              passHref
              target="_blank"
            >
              <Image
                src="/instagram_logo.svg"
                alt="Coastal Glo Mobile Instagram"
                height={50}
                width={50}
              />
            </NextLink>
            <NextLink
              href="https://www.tiktok.com/@coastalglomobile?_t=8kIBEs54S9S&_r=1"
              passHref
              target="_blank"
            >
              <Image
                src="/tiktok_logo.svg"
                alt="Coastal Glo Mobile TikTok"
                height={50}
                width={50}
              />
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
