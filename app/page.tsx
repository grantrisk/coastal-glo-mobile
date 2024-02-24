import styles from "../styles/Home.module.css";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <>
      <header>
        <div className={styles.headerContainer}>
          {/* Parallax Background Container */}
          <div className={styles.parallaxBackground}></div>

          <div className={styles.overlayText}>
            <h1>Coastal Glo</h1>
            <h1>Mobile</h1>
          </div>
          <div className={styles.overlayText2}>
            <p>Wilmington, NC.</p>
            <p>Mobile Spray Tans</p>
          </div>

          {/* This is the new tint layer */}
          <div className={styles.imageTint}></div>
        </div>

        {/* Need this container to position the Nav on top of the background image */}
        <div className={styles.navContainer}>
          <Nav />
        </div>
      </header>
      <main>
        {/* Welcome Section */}
        <section className={styles.hero}>
          <h1>TBD</h1>
          <p>Something here...</p>
        </section>
      </main>
    </>
  );
}
