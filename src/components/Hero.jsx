import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero section container">
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I'm Shaik Ajhaj. <br />
          <span className="text-accent">Engineer, Builder & Leader.</span>
        </h1>
        <p className="hero-subtitle">
          I build robust technical systems, hardware prototypes, and communities. Currently focused on full-stack development and organizing impactful tech initiatives in Bengaluru.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-accent">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Contact Me</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
