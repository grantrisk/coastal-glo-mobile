"use client";

import React from "react";
import styles from "../../styles/FAQCard.module.css";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

interface FAQCardProps {
  question: string;
  answer: string;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${isOpen ? styles.cardOpen : styles.cardClosed}`}>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.questionButton}
        >
          {isOpen ? <FaAngleDown /> : <FaAngleRight />}
        </button>
      </div>
      <div className={styles.content}>
        <h4 className={styles.question}>{question}</h4>
        {isOpen && <p className={styles.answer}>{answer}</p>}
      </div>
    </div>
  );
};

export default FAQCard;
