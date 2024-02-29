import styles from "../../styles/Services.module.css";
import Nav from "../components/Nav";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  return (
    <>
      <header className={styles.header}>
        <Nav />
      </header>
      <main className={styles.servicesMain}>
        <section className={styles.servicesHeader}>
          <h1 className={styles.servicesTitle}>Our Services</h1>
          <p className={styles.servicesSubtitle}>
            Discover the perfect tan tailored to your skin type and preferences.
          </p>
        </section>

        {/*TODO: add information about travel fees*/}

        <section className={styles.serviceSection}>
          <ServiceCard
            title="Classic Mobile Tan"
            description="A quick, customizable glo in the comfort of your own home. No need to worry about what you look like or what to wear. *Travel fees may apply depending on distance."
            price="$65+"
            buttonText="Select"
          />

          <ServiceCard
            title="Mobile Rapid Tan"
            description="Need a quick, last minute glo? The rapid tan allows you to shower within 2-5 hours! Perfect if you don’t have time to wait the full 8-10 hours for a classic tan. For light tans, shower after two hours – wait four to five hours for that extra dark look! The depth of color is entirely up to you."
            price="$75+"
            buttonText="Select"
            recommended={true}
          />

          <ServiceCard
            title="Tanning Parties / Group Rates"
            description="Want to have a glo party, or just get tan with your friends? Get your tan discounted with a group of 3 or more! Please message me so we can talk about the details."
            buttonText="Request"
          />

          <ServiceCard
            title="Coastal Glo Membership"
            description="Becoming a member includes 2 custom spray tans a month, with your choice of classic or rapid! This package also includes priority booking over non-members and discounted rates per session."
            price="$100"
            buttonText="Select"
          />
        </section>
      </main>
    </>
  );
}
