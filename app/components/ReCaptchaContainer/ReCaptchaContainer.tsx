"use client";

import { useRef } from "react";

const ReCaptchaContainer = () => {
  const recaptchaRef = useRef<HTMLDivElement>(null);

  // The ref is used to attach the reCAPTCHA container to the DOM.
  return <div ref={recaptchaRef} id="recaptcha-container"></div>;
};

export default ReCaptchaContainer;
