import type { Metadata, Viewport } from "next";
import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { THEME_BOOT_SCRIPT } from "./lib/theme-script";
import { SITE_URL, brand } from "./data/profile";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Ambient from "./components/Ambient";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const description =
  "AI-д суурилсан бүтээгдэхүүн, тэдгээрийн ард ажиллах системийг санаанаас deploy хүртэл бүтээдэг Full-Stack Software Engineer. Next.js, TypeScript, PostgreSQL, OpenAI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${brand.positioning}`,
    template: `%s — ${brand.positioning}`,
  },
  description,
  keywords: [
    "Full-Stack Software Engineer",
    "AI Product Builder",
    "Creative Developer",
    "Next.js",
    "TypeScript",
    "AI integration",
    "Mongolia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: brand.positioning,
    description,
    locale: "mn_MN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.positioning,
    description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0eb" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
};

/** Structured data: a person's professional practice, no fabricated claims. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: brand.positioning,
  description,
  url: SITE_URL,
  knowsAbout: [
    "Full-stack development",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "AI integration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="mn"
      className={`${unbounded.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* Sets data-theme before first paint — must stay first in <body>. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Site-wide chrome, so sub-pages behave exactly like the home page. */}
        <SmoothScroll />
        <Cursor />
        <Ambient />
        <div className="noise" aria-hidden />

        {children}
      </body>
    </html>
  );
}
