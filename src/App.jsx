import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Library from './components/Library';
import MusicLibrary from './components/MusicLibrary';
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BooksPage from './components/BooksPage';
import MusicPage from './components/MusicPage';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loaded
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Library />
        <MusicLibrary />
        <Projects />
        <Hackathons />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/music" element={<MusicPage />} />
      </Routes>
    </>
  );
}
