import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { Providers } from "./providers";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Foody — Order food from your favorite restaurants",
  description:
    "Explore restaurants, browse menus, and order your favorite meals with Foody.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <body className="min-h-dvh bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
