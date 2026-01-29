
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import {CartProvider} from "@/context/CartContext";
import {Auth0Provider} from "@auth0/nextjs-auth0/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Air Jordan 1 Low SE - Nike",
  description:
    "Stay fresh with every step. This low-top take on the Air Jordan 1 is crafted with leather and suede.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.wallet.cat.earlywarning.io/web/resources/js/digitalwallet-sdk.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Auth0Provider>
          <CartProvider>{children}</CartProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}

