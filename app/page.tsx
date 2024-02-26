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
            <h4>Wilmington, NC.</h4>
            <h4>Mobile Spray Tans</h4>
          </div>

          {/* This adds a dark tink to the background image */}
          <div className={styles.imageTint}></div>

          {/* V1 */}
          {/*<button className={styles.bookNowButton}>
            <p>Book</p>
            <p>Now</p>
          </button>*/}

          {/* V2 */}
          <button className={styles.bookNowButton}>Book Now</button>

          {/* Need this container to position the Nav on top of the background image */}
          <div className={styles.navContainer}>
            <Nav />
          </div>
        </div>
      </header>
      <main>
        {/* Welcome Section */}
        <section className={styles.hero}>
          <h1>TBD</h1>
          <h2>TBD</h2>
          <h3>TBD</h3>
          <h4>TBD</h4>
          <h5>TBD</h5>
          <h6>TBD</h6>
          <p>Something here...</p>
        </section>
      </main>
    </>
  );
}
