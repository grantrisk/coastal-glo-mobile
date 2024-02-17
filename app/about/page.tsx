import Image from "next/image";
import styles from "../../styles/Services.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image
          src="logo.svg"
          alt="Coastal Glo Mobile Logo"
          width={500}
          height={500}
          priority
        />
      </header>

      <main>
        <h1>About</h1>
      </main>

      <footer className={styles.footer}>
        <p>Contact Us: coastalglomobile@gmail.com | (910) 633-7352</p>
        <p>Follow us on social media</p>
        {/* TODO Add social media links/icons */}
      </footer>
    </main>
  );
}
