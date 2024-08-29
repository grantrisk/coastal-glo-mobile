import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>404 - Not Found</h2>
      <p className={styles.message}>
        The page you are looking for could not be found.
      </p>
      <Link href="/" className={styles.link}>
        Return Home
      </Link>
    </div>
  );
}
