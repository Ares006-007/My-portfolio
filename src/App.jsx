import React, { useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Background from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';

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
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#" className="nav-logo">Ajhaj</a>
          <div className="nav-links">
            <a href="#about" className="nav-link">About</a>
            <a href="#projects" className="nav-link">Work</a>
            <a href="#background" className="nav-link">Background</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Projects />
        <Background />
        <Skills />
        <Contact />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-copy">&copy; {new Date().getFullYear()} Shaik Ajhaj</span>
          <div className="footer-links">
            <a href="https://github.com/Ares006-007" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href="https://linkedin.com/in/ajhaj" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href="mailto:ajhaj@example.com" className="footer-link">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
