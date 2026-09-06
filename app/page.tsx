import Intro from "./components/Intro";
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
      <Intro />

      <Nav />
      {/*
        Three acts. Each wrapper carries a complete palette, so the seam
        between them is a hard edge rather than a fade — that edge is the
        only thing telling the reader one part has ended and another begun.
      */}
      <main id="main" className="relative">
        <div className="act-light">
          <Hero />
        </div>

        <div className="act-dark">
          <Work />
          <About />
          <Stack />
          <Process />
        </div>

        <div className="act-light">
          <Contact />
        </div>
      </main>
    </>
  );
}
