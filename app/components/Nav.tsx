"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "../../styles/Nav.module.css";
import { usePathname } from "next/navigation";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={styles.nav}>
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul
        className={`${styles.navList} ${isMenuOpen ? styles.menuVisible : ""}`}
      >
        <li
          className={`${
            pathname == "/"
              ? `${styles.activeNavItem} ${styles.navItem}`
              : styles.navItem
          }`}
        >
          <Link href="/">Home</Link>
        </li>

        <li
          className={
            pathname == "/services"
              ? `${styles.activeNavItem} ${styles.navItem}`
              : styles.navItem
          }
        >
          <Link href="/services">Services</Link>
        </li>
        <li
          className={
            pathname == "/about"
              ? `${styles.activeNavItem} ${styles.navItem}`
              : styles.navItem
          }
        >
          <Link href="/about">About</Link>
        </li>
        {/*  NOTE: TO BE ADDED IN THE FUTURE  */}
        {/*<li className={pathname == "/gallery" ? `${styles.activeNavItem} ${styles.navItem}` : styles.navItem}>
          <Link href="/gallery">Gallery</Link>
        </li>*/}
        <li
          className={
            pathname == "/faq"
              ? `${styles.activeNavItem} ${styles.navItem}`
              : styles.navItem
          }
        >
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
