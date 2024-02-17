import type { Metadata } from "next";
import { Inter, Merriweather, Dancing_Script } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const merriWeather = Merriweather({ subsets: ["latin"], weight: ["400"] });

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
    <html lang="en">
      <body className={`${inter.className} ${merriWeather.className}`}>
        {children}
      </body>
    </html>
  );
}
