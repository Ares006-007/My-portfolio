import React, { useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Hackathons from './components/Hackathons';
import Events from './components/Events';
import Skills from './components/Skills';
import Contact from './components/Contact';

// Scroll reveal observer
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function App() {
  useScrollReveal();

  return (
    <div className="app-container">
      {/* Floating Nav */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-pill">
          <a href="#" className="nav-logo">SA.</a>
          <div className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Hackathons />
        <Events />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <span className="footer-path">~/shaik-ajhaj/portfolio</span>
            <span className="footer-copy">&copy; {new Date().getFullYear()} Shaik Ajhaj. Bengaluru, India.</span>
          </div>
          <div className="footer-right">
            <div className="footer-status">
              <span className="footer-status-dot"></span>
              Available
            </div>
            <a href="https://github.com/ajhaj" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href="https://linkedin.com/in/ajhaj" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href="mailto:ajhaj@example.com" className="footer-link">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
