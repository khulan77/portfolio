export const links = {
  github: "https://github.com/khulan77",
  primaryEmail: "mailto:devcode549@gmail.com",
  displayEmail1: "devcode549@gmail.com",
  displayEmail2: "khulan174@gmail.com",
  phone: "tel:+97685563793",
  phoneDisplay: "+976 8556 3793",
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend & UI Engineering",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
      "shadcn/ui",
      "HTML / CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    items: [
      "Node.js",
      "Express.js",
      "GraphQL",
      "PostgreSQL",
      "Supabase",
      "Neon SQL",
      "MongoDB",
      "Prisma ORM",
      "Middleware",
    ],
  },
  {
    id: "devops",
    title: "Architecture & DevOps",
    items: [
      "Nx Monorepo",
      "Vercel",
      "Cloudflare",
      "Git / GitHub",
      "CI/CD",
      "Clerk Webhooks",
    ],
  },
  {
    id: "design",
    title: "Design & Product",
    items: ["Figma", "UI / UX Design", "Motion Design", "Full-Stack Delivery"],
  },
];

export type Project = {
  title: string;
  year: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
  award?: string;
};

export const projects: Project[] = [
  {
    title: "Joy Learn — Хүүхдийн AI Математик Платформ",
    year: "2026",
    description:
      "Бага ангийн хүүхдэд зориулсан AI суурьтай математикийн сургалтын платформ. Хүүхэд гэрийн даалгавраа оруулахад түүн дээр үндэслэн Chimege API-аар дуут ярианы (voice) тусламжтайгаар AI-тай ярилцаж, бодлогоо алхам алхмаар хамтдаа бодно. Хүүхэд өөрийн дуртай баатраа сонгож, баатар бүрд тохирсон interactive хичээл, урам зоригтой орчин авна. Хамгийн гол нь — эцэг эхчүүд хүүхдийнхээ сурч буй үйл явцыг screen record-оор шууд хянаж, хүүхэд AI-тай хэрхэн ярилцаж, асуулт асууж, хариулж буйг бодит цагт харна. Мөн бодсон бодлогуудаа буцаж дахин харах боломжтой. Зорилго нь зөвхөн хариу олох биш — даалгавраа гүнзгий ойлгож, сэтгэн бодох сорилгоор дамжуулан суралцахад чиглэсэн. Хүүхдэд ээлтэй, амьд хөдөлгөөнт UI-г GSAP болон Three.js-ээр бүтээсэн. PineQuest тэмцээнд 5 компанийн шүүгчдийн өмнө өрсөлдөж, манай баг 2-р байр эзлэн 2,000,000₮-ийн шагнал хүртсэн баг төсөл.",
    tech: [
      "Next.js",
      "TypeScript",
      "AI Agent",
      "OpenAI API",
      "Chimege API",
      "Tailwind CSS",
      "Team Project",
      "Vercel",
      "Render",
      "Supabase",
      "Framer Motion",
      "Gsap",
      "Github",
      
    ],
    github: "https://github.com/pinecone-studio/pinequest-s4-e2-team-5",
    live: "https://client-chi-five-58.vercel.app/",
    image: "/joylearn1.png",
    award: "PineQuest 2-р байр · 2,000,000₮",
  },
  {
    title: "Lumière — Гоо Сайхны Салоны Захиалгын Систем",
    year: "2026",
    description:
      "Гоо сайхны салонд зориулсан онлайн цаг захиалгын  платформ. Хэрэглэгч 5 алхамт wizard-аар салбараа сонгожь үс, хумс, арьс арчилгаа, нүүр будалт, сормуус, гуаша зэрэг үйлчилгээнээс үнэ, үргэлжлэх хугацаатай нь харан сонгоод, дуртай мастераа шилээд, сул цагийг шууд харж хэдхэн товшилтоор захиална. 'Миний захиалга' хэсгээс захиалгаа хянах, мастер/админ талаас нэвтэрч үйлчилгээ, мастерууд, цагийн хуваарийг удирдах боломжтой. Supabase дээр өгөгдөл болон зургийн сан, Next.js App Router дээр серверийн талын логикийг барьж, тансаг зөөлөн өнгө, serif типографитай brand-first UI гаргасан.",
    tech: [
      "Next.js",
      "TypeScript",
      "App Router",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Auth",
      "UI / UX Design",
      "Vercel",
    ],
    github: links.github,
    live: "https://salon-ecru-seven.vercel.app/",
    image: "/salon.png",
  },
  {
    title: "DentalAI — Ухаалаг Шүдний Эмнэлгийн Экосистем",
    year: "2026",
    description:
      "Эмч болон өвчтөнийг холбосон Full-stack цогц систем. Admin & Doctor тал: эмнэлгийн удирдлага эмч нарын бүртгэл үүсгэж, үзүүлэх үйлчилгээгээ удирдахын зэрэгцээ 7 хоногийн орлого, өдрийн баталгаажсан захиалгыг дата аналитик самбараар (Dashboard) шууд хянана. User тал: өвчтөнүүд эмнэлгийн сул цагийг бодит цагт харж, тохирох цагаа хэдхэн секундэд захиална.",
    tech: [
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "PostgreSQL",
      "Supabase",
      "Recharts",
      "OpenAI API",
      "Framer Motion",
    ],
    github: links.github,
    live: "https://dental-ai-bot-green.vercel.app/",
    image: "/dentalclinic.png",
  },
  {
    title: "Tomiyo — Боловсролын Интерактив Платформ",
    year: "2026",
    description:
      "Математик, Геометр, Хими, Физикийн бүх шаардлагатай томьёо, ухагдахууныг нэг дор багтаасан интерактив вэб. Хэрэглэгчид томьёог зөвхөн харахаас гадна тоон утга оруулж, туршилтуудыг бодит цагт хийж, үр дүнгээ шууд тооцоолж харна.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Math.js",
      "Prisma ORM",
      "Monorepo",
    ],
    github: links.github,
    live: "https://formula-billduluu-billduluus-projects.vercel.app/",
    image: "/tomiyo.png",
  },
  {
    title: "Зөв Бичих Аварга — Сургалтын Платформ",
    year: "2025",
    description:
      "1-5-р ангийн хүүхдийн зөв бичих чадварыг сайжруулах, цээж бичгийн тоглоомт систем. Glassmorphism бүхий хөөрхөн UI, анги бүрд зориулсан 'Арал'-ууд, Хөнгөн/Дунд/Хэцүү үе шат, Leaderboard болон аватар сонголттой интерактив UX.",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "UI/UX Design",
      "State Management",
      "OpenAI API",
      "Chimege API",
    ],
    github: links.github,
    live: "https://bagiin-project-last-nykf.vercel.app/",
    image: "/zuvbicheg.png",
  },
  {
    title: "Full-Stack Auth & Database Synchronizer",
    year: "2025",
    description:
      "Next.js болон Express.js архитектуртай Full-stack апп. Clerk Webhooks ашиглан хэрэглэгчийн бүртгэлийг PostgreSQL-тэй бодит цагт синхрончилж, аюулгүй байдлыг хангасан. CORS, Middleware хамгаалалт, Frontend-Backend хоорондын аюулгүй өгөгдөл дамжуулалтыг бие даан шийдсэн.",
    tech: [
      "Next.js",
      "Express.js",
      "PostgreSQL",
      "Neon SQL",
      "Clerk Webhooks",
      "Middleware",
      "Node.js",
    ],
    github: links.github,
    live: "https://openai22-green.vercel.app/",
    image: "/aiquiz.png",
  },
  {
    title: "OpenAI Smart Assistant Hub",
    year: "2025",
    description:
      "OpenAI API-тай шууд харьцдаг, Next.js + TypeScript дээр суурилсан Full-stack апп. Хиймэл оюуныг вэб системтэй уялдуулах, Environment Variables-ийг аюулгүй удирдах, App Router-аар динамик бүтэц гаргах туршлага хуримтлуулсан.",
    tech: [
      "Next.js",
      "TypeScript",
      "OpenAI API",
      "App Router",
      "Vercel CLI",
    ],
    github: links.github,
    live: "https://open-iota-eosin.vercel.app/",
    image: "/toolsai.png",
  },
  {
    title: "TMDB Dynamic Movie Platform",
    year: "2025",
    description:
      "TMDB API ашиглан киноны мэдээллийг төрөлжүүлэн харуулах, хайлт болон шүүлтүүртэй динамик вэб. SSR болон CSR-ийг хослуулж хурд, SEO-г хангасан. Custom Hook болон URLSearchParams-аар хуудаслалт, хайлтын логикийг шийдсэн.",
    tech: [
      "Next.js",
      "TypeScript",
      "TMDB API",
      "SSR / CSR",
      "URLSearchParams",
      "Tailwind CSS",
    ],
    github: links.github,
    live: "https://movie-app-1ari.vercel.app/",
    image: "/movieapp.png",
  },
  {
    title: "Multi-Step Data Collection Engine",
    year: "2025",
    description:
      "Олон шатлалт өгөгдөл цуглуулах систем. Алхам бүрт өгөгдөл хадгалах State Management, бодит цагийн Validation, Conditional Rendering-ийн нарийн логик. shadcn/ui-аар цэвэр UI/UX гаргаж Vercel дээр байршуулсан.",
    tech: [
      "Next.js",
      "TypeScript",
      "shadcn/ui",
      "Zod",
      "React Hook Form",
      "State Management",
    ],
    github: links.github,
    live: "https://multi-steps-from-sable.vercel.app/",
    image: "/multistep.png",
  },
  {
    title: "Personal Portfolio Platform",
    year: "2025",
    description:
      "Өөрийн төслүүд, ур чадвараа танилцуулах Next.js портфолио. npm-ээр сан удирдах, GitHub version control, Tailwind-аар responsive дизайн гаргах практик чадвар эзэмшсэн.",
    tech: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "GitHub Workflows",
      "Framer Motion",
    ],
    github: links.github,
    live: "https://todo-87uj.vercel.app/",
    image: "/tom.png",
  },
  {
    title: "Task Management CRUD Application",
    year: "2024",
    description:
      "Next.js болон React ашигласан даалгавар удирдах CRUD апп. React state management, Tailwind-аар responsive дизайн, онлайнд байршуулах туршлага хуримтлуулсан.",
    tech: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "CRUD",
      "Vercel",
      "Local Storage",
    ],
    github: links.github,
    live: "https://todo-omega-black.vercel.app",
    image: "/todo.png",
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Deploy хийсэн төсөл" },
  { value: 30, suffix: "+", label: "Эзэмшсэн технологи" },
  { value: 100, suffix: "%", label: "Бие даасан Full-Stack" },
];
