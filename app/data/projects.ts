import { links } from "./profile";

export type ProjectCategory = "ai" | "fullstack" | "product" | "foundation";

export type Project = {
  slug: string;
  title: string;
  /** One line of positioning, in English, for scanning. */
  tagline: string;
  year: string;
  categories: ProjectCategory[];
  /** Honest labelling: built alone, or built with a team. */
  team: "solo" | "team";
  featured?: boolean;
  /**
   * Set to false to keep a project off the home page list. Its case study
   * page, sitemap entry and every counted metric stay exactly as they were —
   * this hides work from the shortlist, it does not un-ship it.
   */
  onHome?: boolean;
  problem: string;
  idea: string;
  solution: string;
  role: string;
  challenge: string;
  approach: string;
  /** Anything still written as [ADD ...] is unverified and must not be claimed. */
  outcome: string;
  award?: string;
  technologies: string[];
  /** null until a screenshot exists — the UI shows a placeholder, not a break. */
  image: string | null;
  liveUrl: string;
  githubUrl: string;
};

export const CATEGORY_LABELS: Record<ProjectCategory | "all", string> = {
  all: "All",
  ai: "AI",
  fullstack: "Full-Stack",
  product: "Product",
  foundation: "Foundation",
};

export const projects: Project[] = [
  {
    slug: "joy-learn",
    title: "Joy Learn",
    tagline: "A voice-first AI maths tutor children actually talk to.",
    year: "2026",
    categories: ["ai", "fullstack", "product"],
    team: "team",
    featured: true,
    problem:
      "Бага ангийн хүүхэд гэрийн даалгавраа хийхдээ хариугаа олоод зогсдог, харин яагаад тэгж бодсоноо ойлгодоггүй. Эцэг эх нь хажууд нь сууж чадахгүй үед хүүхэд юу ойлгоогүйгээ хэлэх хүнгүй үлддэг.",
    idea:
      "Хариу өгдөг AI биш, хамт боддог AI. Хүүхэд даалгавраа оруулаад, дуугаараа ярилцаж, алхам алхмаар өөрөө бодох сорилгоор дамжуулан суралцах.",
    solution:
      "Хүүхэд гэрийн даалгавраа оруулахад Chimege API-аар дуут ярианы тусламжтайгаар AI-тай ярилцаж, бодлогоо алхам алхмаар хамтдаа бодно. Хүүхэд дуртай баатраа сонгож, баатар бүрд тохирсон интерактив хичээл авна. Эцэг эх нь screen record-оор хүүхдийнхээ сурч буй үйл явцыг бодит цагт хянаж, бодсон бодлогуудыг буцаж харна.",
    role: "Багийн гишүүн — frontend болон интерактив UI давхаргыг хариуцаж, GSAP, Three.js-ээр хүүхдэд ээлтэй хөдөлгөөнт орчныг бүтээсэн.",
    challenge:
      "Дуут яриа, AI-н хариу, интерфейсийн хөдөлгөөн гурав нэгэн зэрэг ажиллахад хүүхдийн анхаарал тасардаг. Мөн хүүхдийн яриаг монгол хэл дээр бодит цагт танихад саатал үүсэх эрсдэлтэй.",
    approach:
      "Дуут ярианы урсгалыг интерфейсийн төлөвтэй уялдуулж, AI хариу бэлдэж байх хугацаанд хүүхдийг хүлээлгэхгүй байх дүрслэлийг оруулсан. Хөдөлгөөнийг GPU дээр ажилладаг transform дээр л барьж, ярианы урсгалыг блоклохгүй байлгасан.",
    outcome:
      "PineQuest тэмцээнд 5 компанийн шүүгчдийн өмнө өрсөлдөж, баг 2-р байр эзлэн 2,000,000₮-ийн шагнал хүртсэн.",
    award: "PineQuest — 2nd place",
    technologies: [
      "Next.js",
      "TypeScript",
      "OpenAI API",
      "Chimege API",
      "AI Agent",
      "Supabase",
      "GSAP",
      "Three.js",
      "Framer Motion",
      "Tailwind CSS",
      "Vercel",
      "Render",
    ],
    image: "/joylearn1.png",
    liveUrl: "https://client-chi-five-58.vercel.app/",
    githubUrl: "https://github.com/pinecone-studio/pinequest-s4-e2-team-5",
  },
  {
    slug: "tomiyo-lab",
    title: "Tomiyo v2",
    tagline: "A browser laboratory where physics is built, measured and explained.",
    year: "2026",
    categories: ["ai", "fullstack", "product"],
    team: "team",
    problem:
      "Сурагч томьёог цээжилдэг ч түүнийг бодитоор туршиж үзэх боломж байдаггүй. Сургуульд лаборатори, багаж хэрэгсэл хүрэлцдэггүй, бодлого дээр гацахад хажууд нь тайлбарлах хүн байхгүй.",
    idea:
      "Лабораторийг хөтөч рүү авчрах. Сурагч өөрөө хэлхээ угсарч, хэмжиж, алдаад дахин оролдох боломжтой орчин үүсгээд, хажууд нь тайлбарладаг AI багш тавих.",
    solution:
      "Математик, Физик, Хими, Геометрийн өрөөтэй интерактив лаборатори. Физикийн өрөөнд батарей, чийдэн, унтраалга, амперметр, вольтметрээр хэлхээ угсарч, гүйдлийн чиглэлийг конвенциональ болон электрон горимоор сольж ажиглана. Бодлогынхоо зургийг чирж оруулахад систем томьёог нь таньж, шийдлийг Алхамууд / Ашигласан томьёо / Яагаад гэж задлан тайлбарладаг. Ангийн түвшин сонгодог AI квизтэй.",
    role:
      "Багийн гишүүн. [ADD ROLE — энэ төсөл дээр яг ямар хэсгийг хариуцсанаа бичнэ үү]",
    challenge:
      "Хөтөч дээр 3D орчин, хэлхээний бодит цагийн симуляц, AI-н хариу гурав зэрэг ажиллахад интерфейс амархан гацдаг. Мөн гар бичмэл эсвэл чанар муутай зургаас томьёо таних нь найдваргүй болох эрсдэлтэй.",
    approach:
      "AI-н хүнд ажлыг серверийн талын тусдаа endpoint-үүд рүү салгаж, интерфейсийг хүлээлгэхгүй болгосон. Таних явцад Шинжилж байна гэсэн төлөв харуулж, хэрэглэгчийг хоосон дэлгэц ширтүүлэхгүй байхаар шийдсэн.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: ["React", "Vite", "Three.js", "AI API", "Vercel"],
    image: "/tomiyo-lab.png",
    liveUrl: "https://client-sand-pi-14.vercel.app/",
    githubUrl: links.github,
  },
  {
    slug: "lumiere",
    title: "Lumière",
    tagline: "Salon booking that replaces the phone call entirely.",
    year: "2026",
    categories: ["fullstack", "product"],
    team: "solo",
    problem:
      "Гоо сайхны салонд захиалга утсаар, мессежээр ирдэг. Цаг давхцаж, мастер завгүй байхад бүртгэл алдагдаж, үйлчлүүлэгч үнэ болон үргэлжлэх хугацааг урьдчилж мэдэхгүй.",
    idea:
      "Үйлчлүүлэгч сул цагийг өөрөө хараад, өөрөө сонгож, хэдхэн товшилтоор захиалдаг болгох. Салон нь зөвхөн хянана.",
    solution:
      "5 алхамт wizard-аар салбар, үйлчилгээ (үс, хумс, арьс арчилгаа, нүүр будалт, сормуус, гуаша), мастер, сул цагийг дараалан сонгоно. Үнэ, үргэлжлэх хугацааг алхам бүрт харуулна. Миний захиалга хэсгээс үйлчлүүлэгч захиалгаа хянаж, мастер болон админ тал нэвтэрч үйлчилгээ, мастер, цагийн хуваарийг удирдана.",
    role: "Бүрэн бие даан — өгөгдлийн сангийн загвар, серверийн логик, эрхийн удирдлага, интерфейс, дизайн, deploy.",
    challenge:
      "Хэд хэдэн мастер, хэд хэдэн салбарын цагийн хуваарь давхцахгүй байх, мөн хоёр хүн нэг зэрэг ижил цагийг сонгох тохиолдлыг зөв шийдэх.",
    approach:
      "Сул цагийг үйлчилгээний үргэлжлэх хугацаа болон мастерын хуваариас серверийн талд тооцоолж, захиалгын бичилтийг өгөгдлийн сангийн түвшинд шалгаж баталгаажуулсан.",
    outcome: "[ADD PROJECT RESULT — жишээ нь: сард хэдэн захиалга, ямар салон ашиглаж байгаа]",
    technologies: [
      "Next.js",
      "TypeScript",
      "App Router",
      "Supabase",
      "PostgreSQL",
      "Auth",
      "Tailwind CSS",
      "UI / UX Design",
      "Vercel",
    ],
    image: "/salon.png",
    liveUrl: "https://salon-ecru-seven.vercel.app/",
    githubUrl: links.github,
  },
  {
    slug: "dental-ai",
    title: "DentalAI",
    tagline: "One system for the clinic and the patient, with analytics built in.",
    year: "2026",
    categories: ["ai", "fullstack", "product"],
    team: "solo",
    problem:
      "Шүдний эмнэлэгт эмчийн цаг, орлого, өвчтөний захиалга гурав тус тусдаа хөтлөгддөг. Удирдлага өнөөдөр хэдэн захиалга баталгаажсаныг шууд харах боломжгүй.",
    idea:
      "Эмч, өвчтөн, удирдлага гурвыг нэг өгөгдлийн эх сурвалж дээр холбож, шийдвэрийг таамаг биш тоон дээр гаргах.",
    solution:
      "Admin болон Doctor тал: эмнэлгийн удирдлага эмч нарын бүртгэл үүсгэж, үйлчилгээгээ удирдахын зэрэгцээ 7 хоногийн орлого, өдрийн баталгаажсан захиалгыг дата аналитик самбараар хянана. User тал: өвчтөн сул цагийг бодит цагт хараад хэдхэн секундэд захиална.",
    role: "Бүрэн бие даан — өгөгдлийн загвар, эрхийн түвшин, аналитик самбар, хоёр талын интерфейс.",
    challenge:
      "Нэг өгөгдлийн сан дээр гурван өөр эрхийн түвшин ажиллуулж, эмч зөвхөн өөрийнхөө, удирдлага бүхнийг харах логикийг найдвартай хийх.",
    approach:
      "Эрхийг интерфейс дээр нуухаас илүү өгөгдөл татах давхарга дээр шүүж, аналитик тоог урьдчилан бэлдсэн query-ээр гаргаж самбарын хурдыг хадгалсан.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "OpenAI API",
      "Recharts",
      "shadcn/ui",
      "Framer Motion",
    ],
    image: "/dentalclinic.png",
    liveUrl: "https://dental-ai-bot-green.vercel.app/",
    githubUrl: links.github,
  },
    {
    slug: "tmdb-platform",
    title: "TMDB Movie Platform",
    tagline: "Search, filter and pagination that survive a page refresh.",
    year: "2025",
    categories: ["fullstack", "foundation"],
    team: "solo",
    problem:
      "Хайлт, шүүлтүүр, хуудаслалтыг зөвхөн компонентын state дээр барихад хэрэглэгч хуудсаа сэргээмэгц бүх сонголт нь алга болдог, холбоосоо хуваалцаж ч чадахгүй.",
    idea:
      "Хэрэглэгчийн сонголтыг URL дотор амьдруулах — тэгвэл сэргээхэд ч, хуваалцахад ч хэвээрээ үлдэнэ.",
    solution:
      "TMDB API ашиглан киног төрөлжүүлэн харуулах, хайлт болон шүүлтүүртэй динамик вэб. SSR болон CSR-ийг хослуулж хурд, SEO-г хангасан.",
    role: "Бүрэн бие даан.",
    challenge:
      "Олон шүүлтүүр зэрэг өөрчлөгдөхөд хэрэгцээгүй дахин дуудлага үүсэх.",
    approach:
      "URLSearchParams болон custom hook дээр хайлт, хуудаслалтын логикийг нэгтгэж, төлөвийн эх сурвалжийг ганц болгосон.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: [
      "Next.js",
      "TypeScript",
      "TMDB API",
      "SSR / CSR",
      "URLSearchParams",
      "Tailwind CSS",
    ],
    image: "/movieapp.png",
    liveUrl: "https://movie-app-1ari.vercel.app/",
    githubUrl: links.github,
  },
  {
    slug: "tomiyo",
    title: "Tomiyo",
    tagline: "Formulas you can run, not just read.",
    year: "2026",
    categories: ["product", "fullstack"],
    team: "solo",
    problem:
      "Сурагч математик, геометр, хими, физикийн томьёог цээжилдэг ч тоо орлуулаад юу болохыг нь мэдрэхгүй. Тараагдсан эх сурвалжаас хайх нь өөрөө саад.",
    idea:
      "Томьёог статик текст биш, ажилладаг багаж болгох. Оруулаад, тооцоолоод, үр дүнг нь шууд харах.",
    solution:
      "Дөрвөн хичээлийн шаардлагатай томьёо, ухагдахууныг нэг дор багтаасан интерактив вэб. Хэрэглэгч тоон утга оруулж, туршилтыг бодит цагт хийж, үр дүнгээ шууд харна.",
    role: "Бүрэн бие даан — контентын бүтэц, тооцоололтын давхарга, интерфейс.",
    challenge:
      "Хэрэглэгчийн оруулсан илэрхийлэлийг аюулгүйгээр тооцоолж, буруу оролтод сайт унахгүй байх.",
    approach:
      "Тооцоололтыг Math.js-ээр хийж, оролт бүрийг тооцоолохын өмнө шалгаж, алдааг хэрэглэгчид ойлгомжтой мессежээр буцаадаг болгосон.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: [
      "Next.js",
      "TypeScript",
      "Math.js",
      "Prisma ORM",
      "Monorepo",
      "Framer Motion",
      "Tailwind CSS",
    ],
    image: "/tomiyo.png",
    liveUrl: "https://formula-billduluu-billduluus-projects.vercel.app/",
    githubUrl: links.github,
  },
  {
    slug: "zuv-bicheg",
    title: "Зөв Бичих Аварга",
    tagline: "Mongolian spelling practice built as a game, not a worksheet.",
    year: "2026",
    categories: ["ai", "product"],
    team: "solo",
    problem:
      "1-5-р ангийн хүүхдэд цээж бичиг уйтгартай. Давтахгүй бол чадвар суухгүй, харин давтахыг нь хүсдэггүй.",
    idea:
      "Давталтыг тоглоом болгох. Ахиц харагддаг, өрсөлддөг, дахин тоглохыг хүсдэг систем.",
    solution:
      "Анги бүрд зориулсан Арал-ууд, Хөнгөн/Дунд/Хэцүү үе шат, Leaderboard, аватар сонголттой интерактив цээж бичгийн систем. Glassmorphism бүхий хүүхдэд ээлтэй UI.",
    role: "Бүрэн бие даан — тоглоомын логик, төлөвийн удирдлага, дизайн, AI болон дуут давхарга.",
    challenge:
      "Хүүхдийн бичсэнийг монгол хэлний дүрмээр зөв шалгаж, алдааг нь буруутгах биш заах өнгөөр буцаах.",
    approach:
      "Шалгалтыг үе шатаар нь ялгаж, алдааны төрөл бүрд өөр хариу үзүүлдэг болгосон. Дуут дэмжлэгийг Chimege API-аар нэмсэн.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: [
      "Next.js",
      "OpenAI API",
      "Chimege API",
      "State Management",
      "Framer Motion",
      "Tailwind CSS",
      "UI / UX Design",
    ],
    image: "/zuvbicheg.png",
    liveUrl: "https://bagiin-project-last-nykf.vercel.app/",
    githubUrl: links.github,
  },
  {
    slug: "auth-sync",
    onHome: false,
    title: "Auth & Database Synchronizer",
    tagline: "Keeping identity and data in sync across two services, in real time.",
    year: "2026",
    categories: ["fullstack"],
    team: "solo",
    problem:
      "Гуравдагч талын authentication ашиглахад хэрэглэгч тэнд үүсдэг ч, өөрийн өгөгдлийн санд байхгүй байдаг. Хоёр эх сурвалж зөрөх нь аюулгүй байдлын нүх үүсгэдэг.",
    idea:
      "Хэрэглэгчийн бүртгэлийг үүссэн даруйд нь өөрийн санд бодит цагт тусгах найдвартай гүүр барих.",
    solution:
      "Next.js болон Express.js архитектуртай full-stack апп. Clerk Webhooks ашиглан хэрэглэгчийн бүртгэлийг PostgreSQL-тэй бодит цагт синхрончилж, CORS болон middleware хамгаалалтыг бие даан шийдсэн.",
    role: "Бүрэн бие даан — webhook давхарга, өгөгдлийн сангийн загвар, аюулгүй байдлын тохиргоо.",
    challenge:
      "Webhook давхардаж ирэх, эсвэл дараалал алдагдах үед өгөгдөл хоёр дахин үүсэх эрсдэл.",
    approach:
      "Гадаад ID-г түлхүүр болгож, бичилтийг давтагдахад тэсвэртэй болгосон. Хүсэлтийн эх сурвалжийг баталгаажуулж, зөвшөөрөгдсөн домэйноос л хүлээн авдаг болгосон.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: [
      "Next.js",
      "Express.js",
      "Node.js",
      "PostgreSQL",
      "Neon SQL",
      "Clerk Webhooks",
      "Middleware",
    ],
    image: "/aiquiz.png",
    liveUrl: "https://openai22-green.vercel.app/",
    githubUrl: links.github,
  },
  {
    slug: "assistant-hub",
    title: "OpenAI Assistant Hub",
    tagline: "A typed, safe surface over a raw LLM API.",
    year: "2025",
    categories: ["ai", "fullstack"],
    team: "solo",
    problem:
      "LLM API-г шууд frontend-ээс дуудах нь түлхүүрийг задруулж, зардлыг хянах боломжгүй болгодог.",
    idea:
      "AI-г вэб системд суулгах зөв бүтцийг өөрөө барьж сурах — түлхүүр сервер дээр, интерфейс нь зөвхөн үр дүнг харах.",
    solution:
      "OpenAI API-тай серверийн талаас харьцдаг Next.js болон TypeScript дээрх full-stack апп. Environment variables-ийг аюулгүй удирдаж, App Router-аар динамик бүтэц гаргасан.",
    role: "Бүрэн бие даан.",
    challenge:
      "API түлхүүрийг хэзээ ч клиент рүү алдалгүй, гэхдээ хариуг хурдан үзүүлэх.",
    approach:
      "Дуудлагыг бүхэлд нь серверийн талд байрлуулж, орчны хувьсагчаар тусгаарлаж, клиент зөвхөн боловсруулсан хариуг хүлээн авдаг болгосон.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "App Router", "Vercel"],
    image: "/toolsai.png",
    liveUrl: "https://open-iota-eosin.vercel.app/",
    githubUrl: links.github,
  },

  {
    slug: "multi-step-engine",
    onHome: false,
    title: "Multi-Step Data Engine",
    tagline: "A long form that never loses what the user already typed.",
    year: "2025",
    categories: ["fullstack", "foundation"],
    team: "solo",
    problem:
      "Урт маягтыг нэг дэлгэцэнд байрлуулахад хэрэглэгч дундаас нь гарч оддог. Алхам болгон хуваахад өмнөх өгөгдөл алдагдах эрсдэлтэй.",
    idea:
      "Алхам бүрийг тусад нь баталгаажуулж, гэхдээ өгөгдлийг нэг төвд хадгалах.",
    solution:
      "Олон шатлалт өгөгдөл цуглуулах систем. Алхам бүрт өгөгдөл хадгалах state management, бодит цагийн validation, conditional rendering-ийн логикийг шийдсэн.",
    role: "Бүрэн бие даан.",
    challenge:
      "Алхам хооронд урагш-хойш явахад validation болон өгөгдөл зөрөхгүй байх.",
    approach:
      "Zod схемийг алхам тус бүрт хуваарилж, React Hook Form дээр нэг эх сурвалжтай төлөв барьсан.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: [
      "Next.js",
      "TypeScript",
      "Zod",
      "React Hook Form",
      "shadcn/ui",
      "State Management",
    ],
    image: "/multistep.png",
    liveUrl: "https://multi-steps-from-sable.vercel.app/",
    githubUrl: links.github,
  },
  {
    slug: "portfolio-platform",
    onHome: false,
    title: "Portfolio Platform",
    tagline: "The first attempt at packaging the work.",
    year: "2025",
    categories: ["foundation"],
    team: "solo",
    problem:
      "Хийсэн ажлууд GitHub дээр тарсан байсан тул хэн ч бүтэн зургийг нь харж чаддаггүй.",
    idea: "Төслүүдээ нэг газар, өөрийн хяналттай орчинд цуглуулах.",
    solution:
      "Next.js дээр responsive портфолио. npm-ээр сан удирдах, GitHub version control, Tailwind-аар responsive дизайн гаргах практик чадвар эзэмшсэн.",
    role: "Бүрэн бие даан.",
    challenge: "Контентыг кодоос салгаж, дараа нь нэмэхэд хялбар байлгах.",
    approach: "Төслийн мэдээллийг тусад нь өгөгдлийн бүтэцтэй болгож эхэлсэн.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "GitHub Workflows",
      "Framer Motion",
    ],
    image: "/tom.png",
    liveUrl: "https://todo-87uj.vercel.app/",
    githubUrl: links.github,
  },
  {
    slug: "task-crud",
    onHome: false,
    title: "Task Management CRUD",
    tagline: "Where the fundamentals were learned.",
    year: "2024",
    categories: ["foundation"],
    team: "solo",
    problem: "Даалгавраа цаасан дээр бичихэд алдагддаг, хаанаас ч харах боломжгүй.",
    idea: "CRUD-ийн бүрэн мөчлөгийг өөрөө барьж, онлайнд гаргаж үзэх.",
    solution:
      "Next.js болон React ашигласан даалгавар удирдах CRUD апп. React state management, Tailwind-аар responsive дизайн, онлайнд байршуулах туршлага хуримтлуулсан.",
    role: "Бүрэн бие даан.",
    challenge: "Хуудас сэргээхэд өгөгдөл алдагдахгүй байх.",
    approach: "Төлөвийг local storage-т хадгалж, эхлэхэд буцааж уншдаг болгосон.",
    outcome: "[ADD PROJECT RESULT]",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "CRUD",
      "Local Storage",
      "Vercel",
    ],
    image: "/todo.png",
    liveUrl: "https://todo-omega-black.vercel.app",
    githubUrl: links.github,
  },
];

/** The home page shortlist. Everything else still has a page of its own. */
export const homeProjects = projects.filter(
  (project) => project.onHome !== false,
);

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Counted, never asserted — these numbers cannot drift away from the work. */
export const metrics = {
  shipped: projects.length,
  withAi: projects.filter((p) => p.categories.includes("ai")).length,
  teamProjects: projects.filter((p) => p.team === "team").length,
};
