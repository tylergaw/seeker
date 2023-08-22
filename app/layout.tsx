import type { Metadata } from "next";

import { Bodoni_Moda } from "next/font/google";

import Nav from "@components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seeker",
  description: "Find your next thing",
};

export const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bodoniModa.className}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
