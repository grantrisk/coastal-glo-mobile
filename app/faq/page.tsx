import styles from "../../styles/FAQ.module.css";
import Nav from "../components/Nav";
import FAQCard from "../components/FAQCard";
import Footer from "../components/Footer";

export default function FAQ() {
  return (
    <>
      <header className={styles.header}>
        <Nav />
      </header>
      <main className={styles.aboutMain}>
        <h1 className={styles.aboutTitle}>Frequently Asked Questions</h1>
        <div className={styles.faqSection}>
          <FAQCard
            question="Should I get my mani/pedi before or after my spray tan?"
            answer="Definitely get your mani/pedi done before your spray tan appointment. Make sure all oils and lotions
          are wiped off your hands and feet. If you must get a mani/ pedi after your tan, make sure to wait until after
          your first shower. Also avoid the massage portion, as their products may rub off your tan."
          />
          <FAQCard
            question="Should I get my facial/massage before or after my spray tan?"
            answer="It’s recommended to get all facial and massage services before your tan. The products and lotion will
          rub off your tan otherwise."
          />
          <FAQCard
            question="How many days before an event should I book my tan?"
            answer="For an event, book tan 1-2 days prior."
          />
          <FAQCard
            question="Are spray tans safe when your pregnant or breastfeeding?"
            answer="DHA (spray tan solution) is FDA approved and only penetrates the outermost layer of the skin. Just
           make sure to talk to your doctor to get the go-ahead."
          />
          <FAQCard
            question="What do I wear before and after my spray tan?"
            answer="Try your best to wear loose fitting dark clothing. Your skin needs to breathe and your tan has a
          better environment to set in properly. If you don’t want bra lines I would suggest to not even wear a bra
          that day so you don’t risk those outlines. If you do get bronzer on your clothes it will come out in the wash."
          />
          <FAQCard
            question="How soon can I workout after my tan?"
            answer="Try your best to avoid sweating within the first 24 hours while your tan is still developing. You
          can workout after that 24 hour period, after your first shower/rinse."
          />
          <FAQCard
            question="How long will my tan last?"
            answer="Depending on how well you take care of your skin after, your tan will last on average about 7-10 days."
          />
          <FAQCard
            question="What do I wear during the spray tan?"
            answer="I want you to feel as comfortable as possible. So dress down to your comfort level. Most clients
          go fully nude to avoid tan lines, or usually just wear old underwear. I provide disposable thongs and bras
          if needed."
          />
          <FAQCard
            question="What will remove my tan?"
            answer="Chlorinated pools and hot tubs are the big ones unfortunately. Other things include exfoliating,
          waxing, shaving, and non-natural soaps like Dove. Staying hydrated and moisturizing everyday are vital for
          your tan to last. If you are intentionally trying to scrub your tan off, you can make a paste of baking
          soda,water,and lemon juice to rub on your body for a few minutes before rinsing."
          />
          <FAQCard
            question="How long does the appointment take?"
            answer="The appointment takes around 15-30 min including setting up,spraying,and breaking down."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
