import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Ambient from "./components/Ambient";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Portfolio() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Ambient />
      <div className="noise" aria-hidden />

      <Nav />

      <main id="main" className="relative">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
