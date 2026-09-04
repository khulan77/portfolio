/**
 * Brand + contact. There is deliberately no personal name anywhere on the
 * site — the identity is carried by the mark and the positioning line.
 *
 * Anything still written as [ADD ...] is missing data, not a design choice:
 * fill it in and the matching UI appears automatically.
 */

/** [ADD DOMAIN] — used for canonical URLs, sitemap and Open Graph. */
export const SITE_URL = "https://khulan.dev";

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
