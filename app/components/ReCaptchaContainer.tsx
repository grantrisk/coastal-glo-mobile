"use client";

import { useEffect, useRef } from "react";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { firebaseApp } from "../lib/firebase";

const ReCaptchaContainer = () => {
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recaptchaRef.current && typeof window !== "undefined") {
      initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaEnterpriseProvider(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        ),
        isTokenAutoRefreshEnabled: true,
      });
    }
  }, [recaptchaRef]);

  // The ref is used to attach the reCAPTCHA container to the DOM.
  return <div ref={recaptchaRef} id="recaptcha-container"></div>;
};

export default ReCaptchaContainer;
