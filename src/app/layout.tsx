import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const inter = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  display: "swap",
  variable: "--font-inter",
});

const goodHeadlineRegular = localFont({
  src: "../../public/fonts/good-headline-regular.otf",
  display: "swap",
  variable: "--font-good-headline-regular",
  weight: "400",
});

const goodHeadlineMedium = localFont({
  src: "../../public/fonts/good-headline-medium.otf",
  display: "swap",
  variable: "--font-good-headline-medium",
  weight: "500",
});

const goodHeadlineBold = localFont({
  src: "../../public/fonts/good-headline-bold.otf",
  display: "swap",
  variable: "--font-good-headline-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Upshot",
  description: "Rip prediction packs and win prizes",
  icons: {
    icon: "/seo/favicon.ico",
  },
  openGraph: {
    title: "Upshot",
    description: "Rip prediction packs and win prizes",
    siteName: "Upshot",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${inter.variable} ${goodHeadlineRegular.variable} ${goodHeadlineMedium.variable} ${goodHeadlineBold.variable} flex min-h-full flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
