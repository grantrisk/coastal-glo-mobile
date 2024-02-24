"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "../../styles/Nav.module.css";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/services">Services</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/gallery">Gallery</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
