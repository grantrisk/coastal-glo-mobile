import React from "react";
import Image from "next/image";
import styles from "../../styles/InfoCard.module.css";

interface InfoCardProps {
  imageSrc: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ imageSrc, text }) => {
  return (
    <div className={styles.infoCard}>
      <Image src={imageSrc} alt={"Info Card Image"} height={100} width={100} />
      <p>{text}</p>
    </div>
  );
};

export default InfoCard;
