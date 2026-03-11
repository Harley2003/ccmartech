import type { Metadata } from "next";
import { Be_Vietnam_Pro, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { ChatWidget, LoadingScreen } from "@/components/ui";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "CCMartech - Giải pháp Marketing cho doanh nghiệp",
  description: "CCMartech - Giải pháp Marketing cho doanh nghiệp"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover" // Important for iOS safe areas
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${beVietnamPro.variable} ${spaceMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LoadingScreen />
        <Header />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
