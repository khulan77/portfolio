import { projects, type Project } from "./projects";

export type StackGroup = {
  id: string;
  title: string;
  /** One opinionated line about what this layer is actually for. */
  note: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    id: "languages",
    title: "Languages",
    note: "Бүх давхаргын суурь. Типтэй байх нь том системд алдааг эрт барих хамгийн хямд арга.",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    note: "Хэрэглэгчийн хардаг, мэдэрдэг тал. Хурд, хөдөлгөөн, хэлбэр энд шийдэгдэнэ.",
    items: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    id: "backend",
    title: "Backend & API",
    note: "Хэн юу хийж болохыг тогтоох давхарга — эрх, дүрэм, өгөгдлийн урсгал.",
    items: [
      "Node.js",
      "Express.js",
      "Hono",
      "REST API",
      "GraphQL",
      "Clerk",
      "Middleware",
    ],
  },
  {
    id: "data",
    title: "Data & Storage",
    note: "Өгөгдөл хаана амьдарч, хэрхэн индекслэгдэх вэ. Схем буруу бол дээрх давхаргууд нөхөж чадахгүй.",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Drizzle ORM",
      "Supabase",
      "Neon",
      "Cloudflare D1",
      "Cloudflare R2",
    ],
  },
  {
    id: "ai",
    title: "AI",
    note: "Загвар дуудах нь хялбар, зөв контекст өгөх нь хэцүү. RAG яг тэнд хэрэгтэй болдог.",
    items: ["OpenAI", "Groq", "RAG"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    note: "Локал дээр ажилласан зүйл production дээр ч ажиллах ёстой.",
    items: ["Vercel", "Cloudflare", "Git / GitHub", "Docker", "Nx Monorepo"],
  },
  {
    id: "testing",
    title: "Testing & Quality",
    note: "Эвдэрснийг хэрэглэгчээс өмнө мэдэх.",
    items: ["Jest", "Cypress"],
  },
];

export const stackTotal = stack.reduce(
  (total, group) => total + group.items.length,
  0,
);

/**
 * The same technology is written slightly differently in the project records
 * ("OpenAI API") and in this list ("OpenAI"), so a few names are reconciled
 * explicitly rather than by fuzzy matching, which would produce silent
 * false positives like React Hook Form counting as React.
 */
const ALIASES: Record<string, string[]> = {
  openai: ["openai api"],
  neon: ["neon sql"],
  clerk: ["clerk webhooks"],
  "git / github": ["git / github", "github", "github workflows"],
  "rest api": ["app router", "server actions"],
};

const normalise = (value: string) => value.trim().toLowerCase();

/** The shipped projects that actually use this technology. Never asserted here. */
export function projectsWith(tech: string): Project[] {
  const key = normalise(tech);
  const accepted = new Set([key, ...(ALIASES[key] ?? [])]);
  return projects.filter((project) =>
    project.technologies.some((entry) => accepted.has(normalise(entry))),
  );
}

export function projectsUsing(tech: string): number {
  return projectsWith(tech).length;
}

export type TechEntry = {
  name: string;
  groupId: string;
  groupTitle: string;
  used: number;
};

/** One flat list so the whole stack can be drawn as a single grid. */
export const allTech: TechEntry[] = stack.flatMap((group) =>
  group.items.map((name) => ({
    name,
    groupId: group.id,
    groupTitle: group.title,
    used: projectsWith(name).length,
  })),
);

export const shippedCount = allTech.filter((tech) => tech.used > 0).length;
