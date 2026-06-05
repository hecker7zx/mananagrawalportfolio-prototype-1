import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SkillsGalaxy } from "@/components/SkillsGalaxy";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <SkillsGalaxy />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
