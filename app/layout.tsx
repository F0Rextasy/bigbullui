import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bigbullui.com"),
  title: {
    default: "bigbullui — Animated React components you own",
    template: "%s — bigbullui",
  },
  description:
    "An open-source library of animated, accessible, fully typed React components. Copy the code, own it.",
  keywords: [
    "react",
    "react 19",
    "components",
    "tailwindcss",
    "tailwind v4",
    "ui library",
    "ticket stub",
    "retro ui",
    "design tokens",
    "accessible",
  ],
  authors: [{ name: "F0Rextasy", url: "https://github.com/F0Rextasy" }],
  creator: "F0Rextasy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bigbullui.com",
    siteName: "bigbullui",
    title: "bigbullui — Animated React components you own",
    description:
      "An open-source library of 460+ animated, accessible, fully typed React 19 components with Tailwind CSS 4 tokens.",
  },
  twitter: {
    card: "summary_large_image",
    title: "bigbullui — Animated React components you own",
    description:
      "An open-source library of 460+ animated, accessible, fully typed React 19 components with Tailwind CSS 4 tokens.",
    creator: "@F0Rextasy",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("bigbullui-theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${interTight.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
