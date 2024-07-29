import React from "react";
import styles from "../../../styles/Services.module.css";
import Nav from "../../components/Nav";
import ServiceFetcher from "../../components/ServiceFetcher";
import PricingCard from "../../components/PricingCard";

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

        {/*TODO: need to account for the different types of services she will display*/}
        <section className={styles.serviceSection}>
          <ServiceFetcher />
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
          <PricingCard
            title="Coconut Scent Drops"
            description="Add a tropical escape to your spray tan."
            price={5}
          />
          <PricingCard
            title="Pineapple Scent Drops"
            description="Infuse your spray tan with a refreshingly sweet aroma."
            price={5}
          />
          <PricingCard
            title="Orange Ginger Scent Drops"
            description="Enhance your spray tan with a zesty and invigorating scent."
            price={5}
          />
        </section>

        <section className={styles.productSection}>
          <h4 className={styles.productCategory}>Purchasable Products</h4>
          <PricingCard
            title="Tan Extending Lotion"
            description="Extend your tan with this moisturizing lotion. Purchase and use at home."
            price={25}
          />
        </section>
      </main>
    </>
  );
}
