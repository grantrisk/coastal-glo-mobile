"use client";

import React, { useState, useEffect } from "react";

interface CycleTextProps {
  textArray: string[];
}

const CycleText: React.FC<CycleTextProps> = ({ textArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up a timer to advance the currentIndex every 2 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 2000); // The % operator ensures the index loops back to 0 when it reaches the end of the array

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [textArray.length]); // Dependency array ensures effect is rerun if textArray.length changes

  return (
    <>
      <h3>{textArray[currentIndex]}</h3>
    </>
  );
};

export default CycleText;
