import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Hoyoly",
  description: "Automation your dail sign-in Hoyolab",
  openGraph: {
    type: "website",
    url: "https://hoyoly.vercel.app",
    title: "Hoyoly: Automation Your Daily Login In Hoyolab With Hoyoly 📝",
    description: "Hoyoly is stand for hoyo daily, designing to help people automation daily, simply just put your token and we go all setup for you",
    siteName: "Hoyoly",
    images: [
      {
        url: "https://hoyoly.vercel.app/og-image.jpeg", // Replace with your actual image URL
        width: 512,
        height: 512,
        alt: "Hoyoly",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body className={`antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <Toaster expand className='z-[1000]' richColors />
          {modal}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
