import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-viewport">
        <div className="hero-bg">
          <img src="/hero-bg.png" alt="" aria-hidden="true" className="hero-bg-img" />
        </div>
        <div className="hero-gradient"></div>

        <div className="hero-content">
          <div className="hero-bottom">
            <div className="hero-text">
              <h1 className="hero-name">Shaik Ajhaj</h1>
              <p className="hero-intro">
                I'm 18, based in Bengaluru. I build software, wire up hardware,
                organize hackathons, and occasionally try to start things.
              </p>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">See my work</a>
              <a href="#contact" className="btn btn-secondary">Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
