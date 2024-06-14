"use client";

import React, { useEffect, useRef } from "react";
import styles from "../../styles/ScrollAnimationWrapper.module.css";

const ScrollAnimationWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.8,
      },
    );

    if (wrapperRef.current) {
      wrapperRef.current.classList.add(styles.hidden);
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ScrollAnimationWrapper;
