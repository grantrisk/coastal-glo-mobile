import styles from "../../styles/Footer.module.css";
import Image from "next/image";
import NextLink from "next/link";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import Status from "./Status";
import React from "react";
import { FiCornerDownRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <h3>Costal Glo Mobile</h3>
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
            <p>
              Monday - Thursday: 6:00pm - 9:00pm
              <br />
              Friday - Saturday: 8:00am - 8:00pm
              <br />
              Sunday: 2:00pm - 6:00pm
            </p>
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
