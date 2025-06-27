import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hoyda",
  description: "Automation your daily Hoyolab",
  openGraph: {
    type: "website",
    url: "https://hoyodaily.vercel.app",
    title: "Hoyda: Automation Your Daily Login In Hoyolab With Hoyda 📝",
    description: "Hoyda is stand for hoyo daily, designing to help people automation daily, simply just put your token and we go all setup for you",
    siteName: "Hoyda",
    images: [
      {
        url: "https://hoyodaily.vercel.app/og-image.jpeg", // Replace with your actual image URL
        width: 512,
        height: 512,
        alt: "hoyda"
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme='cupcake' lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster expand className="z-[1000]" richColors />
        {children}
      </body>
    </html>
  );
}
