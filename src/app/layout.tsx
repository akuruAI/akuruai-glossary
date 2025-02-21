import type { Metadata } from "next";
import { Providers } from "@modules/app/components/Providers";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
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
  title: "AkuruAI Trilingual Glossary – English, Sinhala & Tamil",
  description: "Discover fast, intuitive translations and definitions with AkuruAI's trilingual glossary. Easily connect English, Sinhala, and Tamil for seamless language learning and communication.",
  openGraph: {
    images: [
      "/images/og-image.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_UNAMI_WEBSITE_ID && (
        <Script defer src="https://cloud.umami.is/script.js" data-website-id={process.env.NEXT_PUBLIC_UNAMI_WEBSITE_ID}>
        </Script>
      )}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
