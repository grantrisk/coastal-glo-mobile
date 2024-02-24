import Link from "next/link";
import styles from "../../styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
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
}
