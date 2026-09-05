import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Stack from "./components/Stack";
import Process from "./components/Process";
import Contact from "./components/Contact";

/**
 * Parked, with their data and components intact:
 *   Engineering  (app/components/Engineering.tsx, data in app/data/systems.ts)
 *   Services     (app/components/Services.tsx,    data in app/data/services.ts)
 *   AiSoftware   (app/components/AiSoftware.tsx)
 *   Thesis       (app/components/Thesis.tsx)
 *   Preloader    (app/components/Preloader.tsx)
 *
 * AiSoftware and Thesis were removed because the page carried three separate
 * step sequences all making the same claim; Process is the one that earns it.
 * To bring any of them back, import it and drop it into the order below.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Work />
        <About />
        <Stack />
        <Process />
        <Contact />
      </main>
    </>
  );
}
