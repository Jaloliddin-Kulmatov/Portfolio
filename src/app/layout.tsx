import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jaloliddin Kulmatov · AI / ML Engineer & Full-Stack Developer",
  description: "Portfolio of Jaloliddin Kulmatov: engineering student at Jeonbuk National University, founder of ICOM, AI and web projects.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
