import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="floating-card reveal">
          <span className="section-label">[ About ]</span>

          <div className="about-statement">
            <h2 className="about-headline">
              I'm a young engineer who builds at the intersection of{' '}
              <span className="serif-accent">software, hardware,</span> and{' '}
              <span className="serif-accent">community.</span>
            </h2>
          </div>

          <div className="about-body">
            <p>
              I am an 18-year-old student engineer based in Bengaluru, India, with a deep passion for building robust technical solutions across the full stack. My work spans from architecting scalable web applications to developing hardware prototypes using Arduino and ESP32.
            </p>
            <p>
              I approach problems with a systems-thinking mindset, ensuring that every component I build is optimized, maintainable, and aligned with broader technical objectives. Beyond writing code, I am deeply committed to the tech community — I lead technical initiatives, organize hackathons, and foster environments where young engineers can collaborate and build.
            </p>
          </div>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-value">4+</span>
              <span className="about-stat-label">Projects Shipped</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-value">200+</span>
              <span className="about-stat-label">Students Mentored</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-value">3+</span>
              <span className="about-stat-label">Events Organized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
