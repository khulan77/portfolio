/** The AI x Software pipeline — what actually happens between an idea and a product. */
export type PipelineStage = {
  id: string;
  label: string;
  body: string;
};

export const pipeline: PipelineStage[] = [
  { id: "idea", label: "Idea", body: "Шийдэх ёстой бодит асуудал" },
  { id: "research", label: "Research", body: "Хэрэглэгч, өгөгдөл, хязгаарлалт" },
  { id: "ai", label: "AI", body: "Загвар, prompt, агентын логик" },
  { id: "software", label: "Software", body: "Интерфейс, API, өгөгдлийн сан" },
  { id: "automation", label: "Automation", body: "Гар ажиллагааг арилгах урсгал" },
  { id: "product", label: "Product", body: "Хэрэглэгчийн гар дээрх бүтээгдэхүүн" },
];

/** The layers a request passes through — used by the interactive diagram. */
export type ArchLayer = {
  id: string;
  name: string;
  role: string;
  detail: string;
  tech: string[];
};

export const architecture: ArchLayer[] = [
  {
    id: "user",
    name: "User",
    role: "Хүсэлт эндээс эхэлнэ",
    detail:
      "Хөтөч, гар утас, дуут команд. Хурд, хүртээмж, ойлгомжтой байдал энэ давхаргад шийдэгдэнэ.",
    tech: ["Browser", "Mobile", "Voice"],
  },
  {
    id: "interface",
    name: "Interface",
    role: "Харагдах давхарга",
    detail:
      "Next.js App Router дээр серверийн талд render хийж, зөвхөн шаардлагатай JavaScript-ийг л хэрэглэгч рүү илгээнэ.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    id: "api",
    name: "API",
    role: "Гэрээ",
    detail:
      "Frontend болон backend хоорондоо типтэй, урьдчилан таамаглах боломжтой өгөгдлийн загвараар харилцана — бүтэц нь баримт болж ажиллана.",
    tech: ["GraphQL", "REST", "Server Actions"],
  },
  {
    id: "logic",
    name: "Business logic",
    role: "Дүрэм",
    detail:
      "Хэн юу хийж болох, юу болохгүй. Эрхийн шалгалт, төлөв, гүйлгээний бүрэн бүтэн байдал энд хамгаалагдана.",
    tech: ["Node.js", "Express", "Middleware", "Auth"],
  },
  {
    id: "data",
    name: "Data",
    role: "Санах ой",
    detail:
      "Хамаарал бүхий загварчлал, migration, индекс. Өгөгдлийн бүтэц буруу бол дээрх бүх давхарга нөхөж чадахгүй.",
    tech: ["PostgreSQL", "Prisma", "Supabase", "Neon"],
  },
  {
    id: "ai",
    name: "AI layer",
    role: "Шийдвэр",
    detail:
      "Загвар руу дамжуулах контекст, prompt, хариуг шалгах алхам. AI нь тусдаа функц биш, урсгалын нэг хэсэг.",
    tech: ["OpenAI API", "Agents", "Chimege"],
  },
  {
    id: "delivery",
    name: "Delivery",
    role: "Ажиллагаа",
    detail:
      "Build, орчны хувьсагч, домэйн, хяналт. Deploy бол төгсгөл биш, давталтын эхлэл.",
    tech: ["Vercel", "Render", "CI/CD"],
  },
];
