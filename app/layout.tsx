import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
