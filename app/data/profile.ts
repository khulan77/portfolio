/**
 * Brand + contact. There is deliberately no personal name anywhere on the
 * site — the identity is carried by the mark and the positioning line.
 *
 * Anything still written as [ADD ...] is missing data, not a design choice:
 * fill it in and the matching UI appears automatically.
 */

/**
 * The one place the site's own address is defined. Canonical links, the
 * sitemap, robots.txt, Open Graph and JSON-LD all derive from it, so a domain
 * change is a single edit — or, on Vercel, a single environment variable.
 *
 * The fallback is the address the site actually answers on today. Point
 * NEXT_PUBLIC_SITE_URL at the custom domain the moment it resolves.
 */
const FALLBACK_SITE_URL = "https://portfolio-nine-rouge-57.vercel.app";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, "");

export const brand = {
  positioning: "Full-Stack Engineer × AI Product Builder",
  role: "Full-Stack Software Engineer",
  /** The one line the whole site has to earn. */
  statement: "I build AI-powered products and the systems behind them.",
  statementMn:
    "Би AI-д суурилсан бүтээгдэхүүн, түүний ард ажиллах системийг бүтээдэг.",
  school: "Pinecone Academy",
  program: "Software Engineering",
};

export type SocialLink = {
  id: string;
  label: string;
  href: string | null;
};

export const links = {
  email: "devcode549@gmail.com",
  emailHref: "mailto:devcode549@gmail.com",
  emailAlt: "khulan174@gmail.com",
  phone: "+976 8556 3793",
  phoneHref: "tel:+97685563793",
  github: "https://github.com/khulan77",
  /** [ADD LINKEDIN URL] — hidden from the UI until it is a real URL. */
  linkedin: null as string | null,
  /** [ADD INSTAGRAM URL] — hidden from the UI until it is a real URL. */
  instagram: null as string | null,
  /** [ADD CV PDF] — drop the file in /public and set it to e.g. "/cv.pdf". */
  resume: null as string | null,
};

export const socials: SocialLink[] = [
  { id: "github", label: "GitHub", href: links.github },
  { id: "linkedin", label: "LinkedIn", href: links.linkedin },
  { id: "instagram", label: "Instagram", href: links.instagram },
  { id: "email", label: "Email", href: links.emailHref },
];

/** Only the links that actually exist ever reach the page. */
export const activeSocials = socials.filter(
  (social): social is SocialLink & { href: string } => Boolean(social.href),
);
