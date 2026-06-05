import { useState, useCallback } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Preloader onComplete={handleLoaded} />}
      <div
        className="relative min-h-screen bg-background text-foreground"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}
      >
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
