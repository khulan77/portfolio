import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import AiSoftware from "./components/AiSoftware";
import Thesis from "./components/Thesis";
import Stack from "./components/Stack";
import Process from "./components/Process";
import Contact from "./components/Contact";

/**
 * Section numbers live here rather than inside each section, so hiding or
 * restoring one renumbers the page instead of leaving a gap in the sequence.
 *
 * Currently parked, with their data and components intact:
 *   Engineering  (app/components/Engineering.tsx, data in app/data/systems.ts)
 *   Services     (app/components/Services.tsx,    data in app/data/services.ts)
 * To bring one back, import it, drop it into the order below, and renumber.
 */
export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Work index="01" />
        <About index="02" />
        <Stack index="03" />
        <Thesis />
        <AiSoftware index="04" />
        <Process index="05" />
        <Contact index="06" />
      </main>
    </>
  );
}
