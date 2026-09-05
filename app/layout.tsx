import type { Metadata, Viewport } from "next";
import { Alumni_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, brand } from "./data/profile";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";

/**
 * A condensed grotesque carries the display type. Anton and Archivo were the
 * first choices but neither ships Cyrillic, and the headings on this site are
 * Mongolian — Alumni Sans covers both scripts at display weight.
 */
const alumni = Alumni_Sans({
  variable: "--font-display-face",
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
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

/** The page opens on Act I, so the browser chrome matches chalk. */
export const viewport: Viewport = {
  themeColor: "#e9e6df",
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
      className={`${alumni.variable} ${inter.variable}`}
    >
      <body className="antialiased">
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
        <div className="noise" aria-hidden />

        {children}
      </body>
    </html>
  );
}
