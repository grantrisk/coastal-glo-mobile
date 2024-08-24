import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import ReCaptchaContainer from "./components/ReCaptchaContainer/ReCaptchaContainer";
import { PrefetchProvider } from "./providers/PrefetchProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "700"],
  display: "swap",
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-special",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coastal Glo Mobile",
  description:
    "Wilmington based mobile spray tans in the comfort of your own home!",
  openGraph: {
    title: "Coastal Glo Mobile",
    description:
      "Wilmington based mobile spray tans in the comfort of your own home!",
    url: "https://www.coastalglomobile.info",
    siteName: "Coastal Glo Mobile",
    images: [
      {
        url: "https://www.coastalglomobile.info/coastal_glo_mobile_logo.jpg", // Absolute URL to the logo image.
        width: 1024,
        height: 1024,
        alt: "Coastal Glo Mobile Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true, // Allow indexing for this page to be discoverable via search engines.
    follow: true,
    nocache: false, // Allowing caching can help with load times.
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ReCaptchaContainer />
        <PrefetchProvider>{children}</PrefetchProvider>
      </body>
    </html>
  );
}
