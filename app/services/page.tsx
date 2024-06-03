import styles from "../../styles/Services.module.css";
import Nav from "../components/Nav";
import ServiceCard from "../components/ServiceCard";
import Link from "next/link";
import React from "react";

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
            title="Student Tan"
            description="High school and college students enjoy a special discount. Perfect for prom, special events, or just maintaining a summer glow!"
            price="$30"
          />

          <ServiceCard
            title="Classic Mobile Tan"
            description="Enjoy a quick, customizable glow in the comfort of your home. No need to worry about what to wear or how you look."
            price="$40"
          />

          <ServiceCard
            title="Rapid Mobile Tan"
            description="Need a last-minute glow? The rapid tan allows you to shower within 2-5 hours! Ideal if you don’t have time to wait the full 8-10 hours for a classic tan. For a light tan, shower after two hours; wait four to five hours for a deeper, darker tan. The color depth is entirely up to you."
            price="$50"
            recommended={true}
          />

          <ServiceCard
            title="Tanning Parties / Group Rates"
            description="Host a glow party or get tan with your friends! Discounts available for groups of 3 or more. Please message for details."
          />

          <ServiceCard
            title="Coastal Glo Membership"
            description="Become a member and enjoy 2 custom spray tans per month, with your choice of classic or rapid tan. Membership includes priority booking and discounted products."
            price="$80/month"
          />

          <ServiceCard
            title="Coastal Glo Premium Membership"
            description="Upgrade to premium membership for 3 custom spray tans per month, with your choice of classic or rapid tan. Enjoy priority booking and even better discounted products."
            price="$115/month"
          />
        </section>

        <section className={styles.feeSection}>
          <h4>Travel Fees:</h4>
          <p>
            Travel fees may apply depending on distance. If you are 10-15 miles
            outside the Wilmington area, a $10 travel fee applies. For distances
            of 16-20 miles, the travel fee is $20. For distances over 20 miles,
            please contact me for more information. My contact details are at
            the bottom of this page. Thank you!
          </p>
        </section>

        <br />
        <br />
        <br />

        <section className={styles.servicesHeader}>
          <h1 className={styles.servicesTitle}>Add-Ons</h1>
          <p className={styles.servicesSubtitle}>
            Enhance your spray tan experience with our hand-picked products
          </p>
        </section>

        <section className={styles.productSection}>
          <h4 className={styles.productCategory}>
            Scent Drops (Add-Ons to Spray Tan)
          </h4>
          <ServiceCard
            title="Coconut Scent Drops"
            description="Add a tropical escape to your spray tan."
            price="$7"
          />
          <ServiceCard
            title="Pineapple Scent Drops"
            description="Infuse your spray tan with a refreshingly sweet aroma."
            price="$7"
          />
          <ServiceCard
            title="Orange Ginger Scent Drops"
            description="Enhance your spray tan with a zesty and invigorating scent."
            price="$7"
          />
        </section>

        <section className={styles.productSection}>
          <h4 className={styles.productCategory}>Purchasable Products</h4>
          <ServiceCard
            title="Tan Extending Lotion"
            description="Extend your tan with this moisturizing lotion. Purchase and use at home."
            price="$25"
          />
        </section>
      </main>
    </>
  );
}
