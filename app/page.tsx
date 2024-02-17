"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navigateToServices = () => {
    router.push("/services");
  };

  return (
    <main className={styles.main}>
      <div className={styles.headerContainer}>
        {/* Parallax Background Container */}
        <div className={styles.parallaxBackground}></div>

        <div className={styles.overlayText}>
          <h1>Coastal Glo Mobile</h1>
          <p>Your premier mobile spray tanning service in Wilmington, NC.</p>
          <button className={styles.ctaButton} onClick={navigateToServices}>
            Book Your Tan Now
          </button>
        </div>
        {/* This is the new tint layer */}
        <div className={styles.imageTint}></div>
        {/* Other sections remain the same */}
      </div>

      <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
        <nav className={styles.nav}>
          <a onClick={() => scrollToSection("hero")}>Home</a>
          <a onClick={() => scrollToSection("services")}>Services</a>
          <a onClick={() => scrollToSection("testimonials")}>Testimonials</a>
        </nav>
      </header>

      <section id="hero" className={styles.hero}>
        <h1>Welcome to Coastal Glo Mobile</h1>
        <p>Your premier mobile spray tanning service in Wilmington, NC.</p>
        <button className={styles.ctaButton}>Book Your Tan Now</button>
      </section>

      <section id="services" className={styles.services}>
        <h2>Our Services</h2>
        <div className={styles.grid}>
          {/* Example service card */}
          <div className={styles.card}>
            <h3>Signature Glow</h3>
            <p>
              Our signature tan leaves you with a perfect, natural-looking glow.
            </p>
          </div>
          {/* Repeat for other services */}
        </div>
      </section>

      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.grid}>
          {/* Example testimonial card */}
          <div className={styles.card}>
            <p>
              "The best mobile tanning service I've ever used. Professional and
              so convenient!"
            </p>
            <p>- Happy Client</p>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.grid}>
          {/* Example testimonial card */}
          <div className={styles.card}>
            <p>
              "The best mobile tanning service I've ever used. Professional and
              so convenient!"
            </p>
            <p>- Happy Client</p>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.grid}>
          {/* Example testimonial card */}
          <div className={styles.card}>
            <p>
              "The best mobile tanning service I've ever used. Professional and
              so convenient!"
            </p>
            <p>- Happy Client</p>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.grid}>
          {/* Example testimonial card */}
          <div className={styles.card}>
            <p>
              "The best mobile tanning service I've ever used. Professional and
              so convenient!"
            </p>
            <p>- Happy Client</p>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.grid}>
          {/* Example testimonial card */}
          <div className={styles.card}>
            <p>
              "The best mobile tanning service I've ever used. Professional and
              so convenient!"
            </p>
            <p>- Happy Client</p>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.grid}>
          {/* Example testimonial card */}
          <div className={styles.card}>
            <p>
              "The best mobile tanning service I've ever used. Professional and
              so convenient!"
            </p>
            <p>- Happy Client</p>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.grid}>
          {/* Example testimonial card */}
          <div className={styles.card}>
            <p>
              "The best mobile tanning service I've ever used. Professional and
              so convenient!"
            </p>
            <p>- Happy Client</p>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>
      <section id="testimonials" className={styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <div className={styles.grid}>
          {/* Example testimonial card */}
          <div className={styles.card}>
            <p>
              "The best mobile tanning service I've ever used. Professional and
              so convenient!"
            </p>
            <p>- Happy Client</p>
          </div>
          {/* Repeat for other testimonials */}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Contact Us: coastalglomobile@gmail.com | (910) 633-7352</p>
        <p>Follow us on social media</p>
        {/* TODO Add social media links/icons */}
      </footer>
    </main>
  );
}
