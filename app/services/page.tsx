import Image from "next/image";
import styles from "../../styles/Services.module.css";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <header>
          <Image
            className={styles.headerImage}
            src="logo.svg"
            alt="Coastal Glo Mobile Logo"
            width={500}
            height={500}
            priority
          />
        </header>

        <section>
          <h1>Services</h1>
        </section>
      </main>
    </>
  );
}
