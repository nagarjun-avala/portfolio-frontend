import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/CommandPalette";
import { Analytics } from "@vercel/analytics/react";
import VisitorTracker from "@/components/VisitorTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nagarjun Avala | Portfolio",
  description: "Full-stack developer and technical entrepreneur building scalable products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="8P0bEplteluIGRQDHpdlco0PBnSGR1qOW-O0kY_4uRo"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <VisitorTracker />
          <Toaster richColors position="top-right" />
          <CommandPalette />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

