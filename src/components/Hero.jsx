import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-viewport">
        {/* Background image */}
        <div className="hero-bg">
          <img src="/hero-bg.png" alt="" aria-hidden="true" className="hero-bg-img" />
        </div>

        {/* Overlays */}
        <div className="hero-gradient"></div>
        <div className="hero-noise"></div>

        {/* Content */}
        <div className="hero-content">
          {/* Bottom-aligned content grid like ECSoC */}
          <div className="hero-bottom">
            <div className="hero-text-block">
              <h1 className="hero-title">
                <span className="hero-name">SHAIK</span>
                <span className="hero-name">AJHAJ</span>
              </h1>
            </div>

            <div className="hero-info-block">
              <p className="hero-tagline">
                <span className="serif-accent">Engineer, builder</span> — crafting robust systems,
                hardware prototypes, and communities from Bengaluru.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn btn-pill">
                  <span>Selected Works</span>
                  <span className="btn-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </a>
                <a href="#contact" className="btn btn-outline">Contact</a>
              </div>

              <div className="hero-meta">
                <div className="hero-meta-line"></div>
                <span className="hero-meta-text">Bengaluru, India · Full-Stack · Hardware · Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
