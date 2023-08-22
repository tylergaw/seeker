import type { Metadata } from "next";

import Nav from "@components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seeker",
  description: "Find your next thing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
