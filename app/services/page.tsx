import styles from "../../styles/Services.module.css";
import Nav from "../components/Nav";
import ServiceCard from "../components/ServiceCard";
import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";
export default function Services() {
  return (
    <>
      <header className={styles.header}>
        <Nav />
      </header>
      <main className={styles.servicesMain}>
        <section className={styles.servicesHeader}>
          <h1 className={styles.servicesTitle}>Services</h1>
          <p className={styles.servicesSubtitle}>
            Discover the perfect tan tailored to your skin type and preferences.
          </p>
        </section>

        <section className={styles.bookingSection}>
          <Link
            href={"https://coastalglomobile.glossgenius.com/services"}
            prefetch
            target={"_blank"}
          >
            <p className={styles.bookNowButton}>Book Now</p>
          </Link>
        </section>

        <section className={styles.serviceSection}>
          <ServiceCard
            title="Classic Mobile Tan"
            description="A quick, customizable glo in the comfort of your own home. No need to worry about what you
            look like or what to wear."
            price="$65+"
          />

          <ServiceCard
            title="Mobile Rapid Tan"
            description="Need a quick, last minute glo? The rapid tan allows you to shower within 2-5 hours! Perfect if
            you don’t have time to wait the full 8-10 hours for a classic tan. For light tans, shower after two hours –
            wait four to five hours for that extra dark look! The depth of color is entirely up to you."
            price="$75+"
            recommended={true}
          />

          <ServiceCard
            title="Tanning Parties / Group Rates"
            description="Want to have a glo party, or just get tan with your friends? Get your tan discounted with a
            group of 3 or more! Please message me so we can talk about the details."
          />

          <ServiceCard
            title="Coastal Glo Membership"
            description="Becoming a member includes 2 custom spray tans a month, with your choice of classic or rapid!
            This package also includes priority booking over non-members and discounted rates per session."
            price="$100"
          />
        </section>

        <section className={styles.addonsSection}>
          <h4 className={styles.addonsTitle}>Enhance Your Experience:</h4>
          <p className={styles.addonsDescription}>
            Elevate your tan with our exclusive scent add-ons. For just an
            additional $10, you can personalize your tanning experience with our
            signature scents. Choose your favorite:
          </p>
          <ul className={styles.addonsList}>
            <li className={styles.addonItem}>
              Coconut Scent Drops (A tropical escape)
            </li>
            <li className={styles.addonItem}>
              Pineapple Scent Drops (Refreshingly sweet)
            </li>
            <li className={styles.addonItem}>
              Orange Ginger Scent Drops (Zesty and invigorating)
            </li>
          </ul>
        </section>

        <section className={styles.feeSection}>
          <h4>Travel Fees:</h4>
          <p>
            Travel fees may apply depending on distance. If you are outside of
            the Wilmington area by 10-15 miles, there will be a $10 travel fee.
            If you are outside of the Wilmington area by 16-20 miles, there will
            be a $20 travel fee. If you are outside of the Wilmington area by
            20+ miles, please contact me for more information. My contact
            information can be found at the bottom of this page. Thank you!
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
