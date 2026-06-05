import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ThemeScript from "@/components/providers/ThemeScript";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hasi Fashion | Style That Speaks You",
  description:
    "Hasi Fashion — luxury clothes, bags, shoes, wall decor, artificial flowers and curated lifestyle pieces. Style that speaks you.",
  keywords: [
    "Hasi Fashion",
    "luxury fashion",
    "bags",
    "clothes",
    "shoes",
    "home decor",
    "artificial flowers",
    "Sri Lanka",
  ],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground"
      >
        <ThemeScript />
        <ThemeProvider>
          <SessionProvider>
            <AnalyticsProvider />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
