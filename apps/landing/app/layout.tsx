import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tui-typer",
  description: "A terminal typing race game for multiplayer practice from the command line.",
  openGraph: {
    title: "tui-typer",
    description: "Create a room, share the code, and race friends from your terminal.",
    url: "https://www.npmjs.com/package/tui-typer",
    siteName: "tui-typer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
