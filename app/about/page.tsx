import styles from "../../styles/About.module.css";
import Nav from "../components/Nav";
import Image from "next/image";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <header className={styles.header}>
        <Nav />
      </header>
      <main className={styles.aboutMain}>
        <div>
          <div className={styles.gradientOne}></div>
          <div className={styles.gradientOneAlt}></div>
          <div className={styles.gradientTwo}></div>
          <div className={styles.gradientTwoAlt}></div>
        </div>

        <div className={styles.aboutBackground}>
          <h1 className={styles.aboutTitle}>~About~</h1>
          <p className={styles.aboutSubtitle}>Hi! I&apos;m Meghan.</p>

          <section className={styles.aboutSection}>
            <div className={styles.imageWrapper}>
              <Image
                src="/IMG_0719.jpeg"
                alt="Meghan"
                width={1284}
                height={1909}
                className={styles.aboutImage}
              />
            </div>
            <p className={styles.aboutText}>
              Certified spray tan artist and founder of Coastal Glo Mobile, LLC.
              <br />
              <br />
              I moved to Wilmington in 2020 and now live with my husband, Grant
              and our dog Bandit. I love hanging out with my girls on a weekend,
              a cozy night in watching a movie, or just being outside enjoying
              beautiful weather. I&apos;m a beach girl at heart and love living
              by the coast!
              <br />
              <br />
              As a natural redhead with fair skin, I burn so easily and never
              get a natural glow, no matter how hard I try. I was introduced to
              the beauty world of spray tanning in high school which boosted my
              confidence more than anything!
            </p>
          </section>

          <section className={styles.aboutSection}>
            <p className={styles.aboutText}>
              I’m truly grateful for the opportunity to bring out the confidence
              in each of my clients, helping them feel their absolute best
              inside and out.
              <br />
              <br />
              With a passion for beauty and a dedication to delivering flawless
              results, I’m committed to helping you achieve a natural,
              healthy-looking glo without the harmful effects of UV exposure.
            </p>
            <div className={styles.imageWrapper}>
              <Image
                src="/IMG_0722.jpeg"
                alt="Meghan"
                width={1284}
                height={1906}
                className={styles.aboutImage}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
