"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, ExternalLink, Database, Layers, ArrowUpRight, Sparkles, Terminal, Cpu, Phone,  } from "lucide-react";

export default function Portfolio() {
  
  const links = {
    github: "https://github.com/khulan77",
    primaryEmail: "mailto:devcode549@gmail.com",
    displayEmail1: "devcode549@gmail.com",
    displayEmail2: "khulan174@gmail.com",
    phone: "tel:+97685563793",
    phoneDisplay: "85563793"
  };

  const skills = [
    { 
      icon: <Layers className="w-5 h-5 text-blue-400" />, 
      title: "Frontend & UI Development", 
      items: ["Next.js", "React.js", "JavaScript", "TypeScript", "Shadcn / UI", "Tailwind CSS", "Framer Motion", "HTML", "CSS"] 
    },
    { 
      icon: <Database className="w-5 h-5 text-emerald-400" />, 
      title: "Backend & Database Architecture", 
      items: ["Node.js", "Express.js", "GraphQL", "Supabase", "PostgreSQL", "Neon SQL", "MongoDB", "Middleware"] 
    },
    { 
      icon: <Terminal className="w-5 h-5 text-purple-400" />, 
      title: "Architecture & DevOps", 
      items: ["Nx Monorepo", "Prisma ORM", "Vercel CLI", "Cloudflare", "Git / GitHub"] 
    },
    { 
      icon: <Cpu className="w-5 h-5 text-pink-400" />, 
      title: "Design & Product Execution", 
      items: ["FIGMA", "UI/UX Design", "Full-Stack Development"] 
    },
  ];

  const projects = [
    {
      title: "DentalAI – Ухаалаг Шүдний Эмнэлгийн Экосистем",
      description: "Эмч болон өвчтөнийг холбосон Full-stack цогц систем. Admin & Doctor талдаа: Эмнэлгийн удирдлага эмч нарын бүртгэл үүсгэж, үзүүлэх үйлчилгээнүүдээ удирдахын зэрэгцээ 7 хоногийн нийт орлого, өдрийн баталгаажсан захиалгуудыг дата аналитик хянах самбараар (Dashboard) шууд хянана. User талдаа: Өвчтөнүүд эмнэлгийн сул цагуудыг бодит цагт (Real-time) харж, өөрт тохирох цагийг хэдхэн секундэд шууд захиалах боломжтой, ажиллагаа маш өндөртэй платформ.",
      tech: ["Next.js", "TypeScript", "shadcn/ui", "PostgreSQL", "Supabase", "Tailwind CSS", "Recharts (Analytics)", "State Management", "OpenAi Api Key", "Framer Motion"],
      github: links.github,
      live: "https://dental-ai-bot-green.vercel.app/", 
      image: "/dentalclinic.png", 
    },
    {
      title: "Tomiyo Educational Platform Website",
      description: "Ерөнхий боловсролын хамгийн чухал 4 үндсэн хичээл болох Математик, Геометр, Хими, Физикийн бүх л шаардлагатай томьёо, ухагдахуунуудыг нэг дор багтаасан интерактив вэб сайт. Хэрэглэгчид томьёонуудыг зөвхөн харахаас гадна вэб дээр шууд тоон утгуудыг оруулж, математик болон физикийн туршилтуудыг бодит цагт (Real-time) хийж, үр дүнгээ шууд тооцоолж харах боломжтой ухаалаг систем.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Math.js / Formula Parsers", "UI/UX Design", "Component Architecture", "Prisma ORM", "Monorepo"],
      github: links.github,
      live: "https://formula-billduluu-billduluus-projects.vercel.app/", 
      image: "/tomiyo.png", 
    },
    {
      title: "Зөв Бичих Аварга – 1-5-р ангийн хүүхдэд зориулсан Сургалтын Платформ",
      description: "Бага ангийн буюу 1-5-р ангийн хүүхдүүдийн зөв бичих чадварыг сайжруулах, цээж бичгийн тоглоом сонирхолтой систем. Хүүхдэд ээлтэй, Glassmorphism шийдэл бүхий маш хөөрхөн UI дизайнтай. Анги бүрд зориулсан тусгай 'Арал'-уудтай бөгөөд арал бүр дотроо Хөнгөн, Дунд, Хэцүү гэсэн үе шаттай. Мөн хүүхдүүдийг идэвхжүүлэх Leaderboard (Тэргүүлэгчдийн самбар) хэсэгтэй бөгөөд хэрэглэгчид өөрийн Аватараа (Баатар) сонгож тоглох интерактив UX шийдэлтэй.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion",  "UI/UX Design", "Local Storage / State Management", "OpenAI Apikey", "Chimege Apikey"],
      github: links.github,
      live: "https://bagiin-project-last-nykf.vercel.app/",
      image: "/zuvbicheg.png", 
    },
    {
      title: "Full-Stack Auth & Database Synchronizer",
      description: "Next.js болон Express.js архитектуртай, Full-stack вэб аппликейшн. Clerk Webhooks ашиглан хэрэглэгчийн бүртгэлийг PostgreSQL өгөгдлийн сантай бодит цагт синхрончилж, системийн аюулгүй байдлыг хангасан. Төслийн явцад CORS тохиргоо, Middleware хамгаалалт болон Frontend-Backend хоорондын аюулгүй өгөгдөл дамжуулах логикийг бие даан шийдвэрлэсэн.",
      tech: ["Next.js", "Express.js", "PostgreSQL", "Neon SQL", "Clerk Webhooks", "Middleware", "Node.js"],
      github: links.github,
      live: "https://openai22-green.vercel.app/",
      image: "/aiquiz.png",
    },
    {
      title: "OpenAI Smart Assistant Hub",
      description: "OpenAI API-тай шууд харьцдаг, Next.js болон TypeScript дээр суурилсан Full-stack вэб аппликейшн. Хиймэл оюун ухааныг вэб системтэй уялдуулах, Environment Variables-ийг аюулгүй удирдах болон App Router ашиглан динамик вэб бүтэц гаргах туршлага хуримтлуулсан. Git workflow-ийг зөв ашиглан хувилбарын хяналт хийсэн.",
      tech: ["Next.js", "TypeScript", "OpenAI API", "App Router", "Vercel CLI", "Dotenv Safety"],
      github: links.github,
      live: "https://open-iota-eosin.vercel.app/",
      image: "/toolsai.png", 
    },
    {
      title: "TMDB Dynamic Movie Platform",
      description: "TMDB API-г ашиглан киноны мэдээллийг төрөлжүүлэн харуулах, хайлт болон шүүлтүүр (filtering) хийх боломжтой динамик вэб сайт. Server-Side Rendering (SSR) болон Client-Side Rendering (CSR)-ийг хослуулан ашиглаж, хурдан ажиллагаа болон SEO-ийн оновчлолыг хангасан. Custom Hook болон URLSearchParams ашиглан хуудаслалт болон хайлтын логикийг шийдвэрлэсэн.",
      tech: ["Next.js", "TypeScript", "TMDB API", "SSR / CSR", "URLSearchParams", "Tailwind CSS"],
      github: links.github,
      live: "https://movie-app-1ari.vercel.app/",
      image: "/movieapp.png", 
    },
    {
      title: "Multi-Step Data Collection Engine",
      description: "Next.js болон TypeScript ашиглан хөгжүүлсэн, олон шатлалт (Multi-Step) өгөгдөл цуглуулах систем. Хэрэглэгчийн өгөгдлийг алхам бүрт хадгалах State Management, бодит цагийн шалгалт (Validation) болон Conditional Rendering-ийн нарийн логикуудыг шийдвэрлэсэн. shadcn/ui ашиглан орчин үеийн, цэвэр UI/UX дизайн гаргаж, Vercel платформ дээр байршуулсан.",
      tech: ["Next.js", "TypeScript", "shadcn/ui", "Zod Validation", "React Hook Form", "State Management"],
      github: links.github,
      live: "https://multi-steps-from-sable.vercel.app/",
      image: "/multistep.png", 
    },
    {
      title: "Personal Portfolio Platform",
      description: "Өөрийн хийсэн төслүүд болон ур чадварыг танилцуулах зорилготой, Next.js ашиглан хөгжүүлсэн портфолио вэб сайт. Төслийн явцад npm ашиглан сангуудыг удирдах, GitHub дээр хувилбарын хяналт (version control) хийх, Tailwind CSS-ээр responsive дизайн гаргах практик ур чаدراруудыг эзэмшсэн. React-ийн компонент суурьтай хөгжүүлэлтийн логикийг ашиглаж, өөрийн ажлуудыг цэгцтэй харуулах системийг бүтээсэн.",
      tech: ["Next.js", "React.js", "Tailwind CSS", "GitHub Workflows", "Component Architecture", "Framer Motion"],
      github: links.github,
      live: "https://todo-87uj.vercel.app/",
      image: "/tom.png", 
    },
    {
      title: "Task Management CRUD Application",
      description: "Next.js болон React ашиглан даалгавар удирдах (CRUD) вэб аппликейшн. Төслийн явцад React-ийн төлөв удирдах (State management), Tailwind CSS-ээр бүх төхөөрөмжид тохирох (Responsive) дизайн хийх болон вэб сайтыг онлайнд байршуулах туршлага хуримтлуулсан.",
      tech: ["Next.js", "React.js", "Tailwind CSS", "CRUD Logic", "Vercel Deployment", "Local Storage API"],
      github: links.github,
      live: "https://todo-omega-black.vercel.app",
      image: "/todo.png", 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans antialiased">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center px-4 md:px-6 max-w-5xl mx-auto text-center pt-20 pb-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <Sparkles className="w-3 h-3 animate-pulse" /> Шинэ төсөл, хамтын ажиллагаанд нээлттэй
          </span>
        </motion.div>

        <motion.h1 
          className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          Сайн уу, Намайг <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Хулан</span> гэдэг.
        </motion.h1>

       <motion.p className="mt-6 text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl px-2 leading-relaxed" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
  Би <span className="text-white font-medium">Pinecone Academy</span>-ийг <span className="text-emerald-400 font-semibold">Software Engineer</span> мэргэжлээр төгссөн. Зүгээр нэг өгөгдсөн даалгаврыг биелүүлэх биш, тулгарсан асуудлын гарцыг өөрөө олж, бие даан шийдвэрлэх дуртай. Тийм учраас төслийн санаа гаргахаас эхлээд өгөгдлийн сан, бүх кодлол болон deploy хийх хүртэлх <span className="text-emerald-400 font-semibold">Full-Stack</span> бүтцийг бүгдийг нь өөрөө бие дааж хийдэг.
</motion.p>

        {/* CONTACT ROW */}
        <motion.div 
          className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
        >
          <a href={links.primaryEmail} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-emerald-400" /> {links.displayEmail1}
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Mail className="w-4 h-4 text-emerald-500/60" /> {links.displayEmail2}
          </span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <a href={links.phone} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-emerald-400" /> +976 {links.phoneDisplay}
          </a>
        </motion.div>

        <motion.div className="mt-8 flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex gap-4 w-full sm:w-auto justify-center">
            <a href={links.github} target="_blank" rel="noreferrer" className="flex-1 sm:flex-initial p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 hover:text-emerald-400 transition-all flex justify-center items-center gap-2 px-5">
     <span className="text-sm font-medium">GitHub</span>
            </a>
            <a href={links.primaryEmail} className="flex-1 sm:flex-initial p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 hover:text-emerald-400 transition-all flex justify-center items-center gap-2 px-5">
              <Mail className="w-4 h-4" /> <span className="text-sm font-medium">Холбоо барих</span>
            </a>
          </div>
          <a href="#projects" className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-slate-950 font-semibold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95">
            Миний Бүтээлүүд <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto border-t border-slate-900/60">
        <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-2">
          <span className="text-emerald-400 font-mono">//</span> Технологийн ур чадварууд
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div key={index} className="p-5 md:p-6 bg-slate-900/40 border border-slate-900 rounded-2xl backdrop-blur-sm" whileHover={{ y: -4, borderColor: "rgba(16, 185, 129, 0.25)" }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">{skill.icon}</div>
                <h3 className="font-semibold text-base md:text-lg text-slate-200">{skill.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-950 text-xs text-slate-400 rounded-lg border border-slate-900">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto border-t border-slate-900/60">
        <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-2">
          <span className="text-emerald-400 font-mono">//</span> Хийж гүйцэтгэсэн төслүүд ({projects.length})
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index} className="group flex flex-col justify-between overflow-hidden bg-slate-900/10 border border-slate-900 rounded-2xl hover:border-slate-800 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="relative w-full h-48 md:h-52 overflow-hidden bg-slate-950 border-b border-slate-900">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>

              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors flex items-center justify-between gap-2">
                    {project.title} <ExternalLink className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                  </h3>
                  <p className="mt-3 text-xs md:text-sm text-slate-400 leading-relaxed">{project.description}</p>
                </div>
                
                <div className="mt-6">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-950 text-[11px] text-emerald-400/90 rounded-md border border-emerald-500/5">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-5 text-xs font-medium pt-2 border-t border-slate-900">
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-200 transition-colors">GitHub</a>
                    <a href={project.live} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">Вэб сайт руу зочлох</a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    {/* FOOTER */}
      <footer className="py-12 border-t border-slate-900 px-4 max-w-5xl mx-auto text-center">
        <p className="text-sm text-slate-400 mb-4 font-medium">
          Хамтран ажиллах байгууллага, сонирхолтой төслүүд байвал холбогдоход хэзээд нээлттэй! ✨
        </p>
        <div className="flex justify-center gap-6 mb-6">
          <a href={links.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs">
            GitHub
          </a>
          <a href={links.primaryEmail} className="text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs">
            <Mail className="w-3.5 h-3.5" /> Gmail
          </a>
        </div>
      </footer>
    </div>
  );
}