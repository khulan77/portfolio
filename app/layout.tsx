import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { THEME_BOOT_SCRIPT } from "./lib/theme-script";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khulan.dev"),
  title: "Хулан — Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer. Санаанаас deploy хүртэл бүхнийг бие даан бүтээдэг. Next.js, TypeScript, Three.js, GSAP.",
  keywords: [
    "Хулан",
    "Full-Stack",
    "Software Engineer",
    "Next.js",
    "React",
    "Portfolio",
    "Frontend Developer",
  ],
  authors: [{ name: "Хулан" }],
  openGraph: {
    title: "Хулан — Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer. Санаанаас deploy хүртэл бүхнийг бие даан бүтээдэг.",
    type: "website",
    locale: "mn_MN",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#07080c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* Sets data-theme before the page paints — must stay first in <body>. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <a href="#main" className="skip-link">
          Үндсэн агуулга руу шилжих
        </a>
        {children}
      </body>
    </html>
  );
}
