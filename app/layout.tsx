import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import Footer from "./components/Footer";

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
