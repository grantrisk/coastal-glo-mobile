import styles from "../styles/Home.module.css";
import Nav from "./components/Nav";
import Link from "next/link";
import React from "react";
import CycleText from "./components/CycleText";
import InfoCard from "./components/InfoCard";
import Image from "next/image";
import ScrollAnimationWrapper from "./components/ScrollAnimationWrapper";

export default function Home() {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerSection}>
          {/* Parallax Background Container */}
          <div className={styles.parallaxBackground}>
            <Image
              src={"/home_background_image.JPG"}
              alt={"Coastal Glo Mobile"}
              layout={"fill"}
              objectFit={"cover"}
              quality={75}
              priority={true}
            />
          </div>

          <div className={styles.overlayText}>
            <div>
              <h1>Coastal Glo</h1>
              <h1>Mobile</h1>
            </div>
            <div className={styles.overlayTextBottom}>
              <div>
                <h4>Wilmington, NC.</h4>
                <h4>Mobile Spray Tans</h4>
              </div>
              <div className={styles.bookNowButtonContainer}>
                <Link
                  href={"https://coastalglomobile.glossgenius.com/services"}
                  prefetch
                  target={"_blank"}
                >
                  <p className={styles.bookNowButton}>Book Now</p>
                </Link>
              </div>
            </div>
          </div>

          {/* This adds a dark tint to the background image */}
          <div className={styles.imageTint}></div>
        </div>
        {/* Need this container to position the Nav on top of the background image */}
        <div className={styles.navContainer}>
          <Nav />
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.aboutSection}>
          <div className={styles.aboutSectionWrapper}>
            <Image
              src={"/equipment-picture.jpg"}
              alt={"Equipment Picture"}
              className={styles.aboutSectionImage}
              height={401.25}
              width={321}
            />
            <div className={styles.aboutSectionText}>
              <ScrollAnimationWrapper>
                <h2>Professional Mobile Spray Tan Services</h2>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper>
                <p>
                  My mobile spray tanning service brings the glow to your home.
                  Using professional-grade equipment, I set up a dedicated spray
                  tan tent to ensure a mess-free experience. My solutions are
                  tailored to your skin type and desired tan depth. The setup is
                  quick and efficient, allowing you to enjoy a flawless tan
                  without leaving your home.
                </p>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper>
                <p>
                  I bring all necessary equipment, including the spray tan
                  machine, tent, and high-quality tanning solutions. The process
                  is comfortable and convenient, providing you with a beautiful,
                  natural-looking tan.
                </p>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </section>

        <section className={styles.sjolieSection}>
          <h2>Sjolie Tanning Solution is</h2>

          <div className={styles.cycleText}>
            <CycleText
              textArray={[
                "NATURAL INGREDIENTS",
                "VEGAN & CRUELTY FREE",
                "GLUTEN FREE",
                "PARABEN FREE",
                "MINERAL FREE",
              ]}
            />
          </div>

          <ScrollAnimationWrapper>
            <p className={styles.textSection}>
              I use Sjolie products. Their tanning solutions offer customizable
              formulas for all skin types, allowing you to tailor your tan with
              options for color intensity, hydration levels, and your choice of
              personalized scents through spray tan enhancements.
            </p>
          </ScrollAnimationWrapper>
        </section>

        <section className={styles.prepSection}>
          <h2>Preparation</h2>
          <h5>Before Your Appointment</h5>
          <div className={styles.cardSection}>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/prep_1.png"}
                text={
                  "Exfoliate 24 hrs prior to your spray tan appointment using a mitt and oil-free scrub."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/prep_2.png"}
                text={
                  "Shaving and waxing should be done 24 hrs prior to your appointment."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/prep_3.png"}
                text={
                  "Do not apply any oils, makeup, deodorant and perfume before the spray. Your skin should be " +
                  "free from any products."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/prep_4.png"}
                text={
                  "Make sure you schedule all other spa treatments for before your spray tan, including facials, " +
                  "waxing, and mani/pedis."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/prep_5.png"}
                text={
                  "During the session, it's up to you how much you want to undress, and I recommend you go with " +
                  "what makes you feel comfortable!"
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/prep_6.png"}
                text={"Book your appointment 2 days before an event."}
              />
            </ScrollAnimationWrapper>
            <Image
              src={"/sun_image.svg"}
              alt={"Sun Image"}
              height={200}
              width={200}
              className={`${styles.sunImage} ${styles.sunImage1}`}
            />
            <Image
              src={"/sun_image.svg"}
              alt={"Sun Image"}
              height={200}
              width={200}
              className={`${styles.sunImage} ${styles.sunImage2}`}
            />
          </div>
        </section>

        <section className={styles.afterCareSection}>
          <h2>After Care</h2>
          <h5>Tips To Maintain Your Glow</h5>
          <div className={styles.cardSection}>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/aftercare_1.png"}
                text={
                  "To help your tan develop, avoid all moisture for at least 5 hrs after the session."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/aftercare_2.png"}
                text={
                  "Wear loose-fitting, dark clothing so your tan doesn't rub off or look uneven."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/aftercare_3.png"}
                text={
                  "When you shower, be gentle and only use oil-free cleansers. Pat yourself dry instead of rubbing."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/aftercare_4.png"}
                text={
                  "After every shower, I highly recommend using a moisturizer to extend the life of your tan."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/aftercare_5.png"}
                text={
                  "Avoid harsh chemicals such as BHA, salicylic acid, & anti-aging products."
                }
              />
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper>
              <InfoCard
                imageSrc={"/care_pictures/aftercare_6.png"}
                text={
                  "When the tan starts to fade, it's essential to exfoliate the skin in order to remove the old" +
                  " tan residue."
                }
              />
            </ScrollAnimationWrapper>
            <Image
              src={"/sun_image.svg"}
              alt={"Sun Image"}
              height={200}
              width={200}
              className={`${styles.sunImage} ${styles.sunImage3}`}
            />
          </div>
        </section>
      </main>
    </>
  );
}
