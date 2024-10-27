import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movielation - Discover Telugu Cinema Connections",
  description: "Explore the fascinating world of Telugu cinema connections with Movielation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} bg-gradient-tech min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
