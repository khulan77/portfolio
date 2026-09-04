export type Service = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
};

/**
 * Framed as business outcomes, not technology lists — each one maps to work
 * that already exists in `projects.ts`.
 */
export const services: Service[] = [
  {
    id: "ai-product",
    title: "AI Product Development",
    problem:
      "Санаа нь AI дээр суурилсан ч, түүнийг бодит хэрэглэгчтэй бүтээгдэхүүн болгож чадах хүн олдохгүй.",
    solution:
      "Судалгаанаас эхлээд интерфейс, API, өгөгдлийн сан, AI давхарга хүртэлх бүтэн бүтээгдэхүүнийг барина.",
    outcome:
      "Танилцуулга биш, хэрэглэгч ашиглаж болох ажиллаж байгаа бүтээгдэхүүн.",
    stack: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL"],
  },
  {
    id: "web-app",
    title: "Modern Web Applications",
    problem:
      "Одоо байгаа систем нь удаан, гар утсанд эвгүй, өсөхөөрөө эвдэрдэг.",
    solution:
      "Next.js App Router дээр серверийн талын логик, типтэй өгөгдлийн загвартай апп шинээр барина.",
    outcome: "Хурдан ачаалдаг, өргөжүүлэхэд бэлэн, засварлахад хялбар систем.",
    stack: ["Next.js", "TypeScript", "Prisma", "Vercel"],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    problem:
      "Багийн цагийн ихэнх нь давтагдсан, гар ажиллагаатай урсгалд зарцуулагддаг.",
    solution:
      "Одоо байгаа систем дотор нь AI-г суулгаж, тухайн урсгалыг автоматжуулна.",
    outcome: "Гар ажиллагаа багасаж, ижил багаар илүү их ажил гүйцэтгэнэ.",
    stack: ["OpenAI API", "AI agents", "Webhooks", "Node.js"],
  },
  {
    id: "booking",
    title: "Booking & Commerce Systems",
    problem:
      "Захиалга утсаар, мессежээр ирж, цаг давхцаж, бүртгэл алдагддаг.",
    solution:
      "Бодит цагийн сул цаг, төлбөр, админ панель, эрхийн удирдлагатай захиалгын систем барина.",
    outcome: "Захиалга өөрөө урсаж, эзэн нь зөвхөн хянадаг болно.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Auth"],
  },
  {
    id: "automation",
    title: "AI Automation",
    problem:
      "Контент, тайлан, хариулт бичих ажил өдөр бүр гараар давтагддаг.",
    solution:
      "Тухайн ажлын урсгалыг зурж, AI агент болон автоматжуулалтаар солино.",
    outcome: "Өдөр бүрийн давтагдах ажил цагийн биш, секундын асуудал болно.",
    stack: ["AI agents", "OpenAI API", "Automation"],
  },
  {
    id: "landing",
    title: "High-Converting Interfaces",
    problem:
      "Хүн сайт руу ирдэг ч юу хийхээ ойлгохгүй, үйлдэл хийлгүй гардаг.",
    solution:
      "Мессеж, шатлал, хөдөлгөөн, CTA-г нэг зорилгод чиглүүлсэн интерфейс зохионо.",
    outcome: "Зочин уншигч биш, үйлдэл хийдэг хэрэглэгч болно.",
    stack: ["Next.js", "GSAP", "Framer Motion", "Tailwind CSS"],
  },
];
