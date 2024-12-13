import "@fontsource-variable/nunito";
import "@fontsource/pacifico";
import "./globals.css";
import { Providers } from "@/redux/providers";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Toaster } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_WEB_CHAQCHAO
  ? `https://${process.env.NEXT_PUBLIC_WEB_CHAQCHAO}`
  : "http://localhost:3001";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const comingSoon = localFont({
  src: "./fonts/ComingSoon.woff",
  variable: "--font-coming-soon",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chaqchao Chocolates | Store",
  description:
    "Welcome to Chaqchao Chocolates, the best chocolates in Peru, made with organic cacao from the Andes.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      nocache: true,
      noimageindex: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}`,
    siteName: "Chaqchao Chocolates",
    title: "Chaqchao Chocolates | Store",
    description:
      "Welcome to Chaqchao Chocolates, the best chocolates in Peru, made with organic cacao from the Andes.",
    images: [
      {
        url: `/images/og-image.jpg`,
        width: 800,
        height: 600,
        alt: "Chaqchao Chocolates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaqchao Chocolates",
    description:
      "Welcome to Chaqchao Chocolates, the best chocolates in Peru, made with organic cacao from the Andes.",
    images: [`/images/og-image.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  viewport: "width=device-width, initial-scale=1",
  keywords: "chocolates, cacao, peru, organic, fair trade, bean to bar",
  generator: "Next.js",
  publisher: "Chaqchao Chocolates",
  referrer: "origin-when-cross-origin",
  classification: "chocolates",
  category: "chocolates",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <ViewTransitions>
      <html lang={locale}>
        <head>
          <link
            rel="stylesheet"
            href="https://api.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic-reset.min.css"
          />
        </head>
        <body
          className={`${comingSoon.variable} ${geistSans.variable} font-nunito`}
        >
          <NextIntlClientProvider messages={messages}>
            <Toaster
              richColors
              closeButton
              toastOptions={{
                style: {
                  backgroundColor: "#fff",
                  borderRadius: "2rem",
                },
              }}
            />
            <Providers>
              <NextTopLoader color="#ffaa40" />
              {children}
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
