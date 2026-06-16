import React from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Hackathons from './components/Hackathons';
import Events from './components/Events';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="container header-inner">
          <div className="logo">SA.</div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

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

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Shaik Ajhaj. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
