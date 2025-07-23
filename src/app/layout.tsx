import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import DarkVeil from "@/components/DarkVeil/DarkVeil";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const parryHotter = localFont({
  src: "../../public/parry-hotter/ParryHotter.ttf",
  variable: "--font-parry-hotter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paw Alert",
  description: "A simple app to alert you when your pet is in danger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${parryHotter.variable} antialiased dark`}
      >
       
        {children}
         <div className="fixed inset-0 -z-50 pointer-events-none">
          <DarkVeil />
        </div>
      </body>
    </html>
  );
}
