import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section container">
      <h2 className="section-title">About</h2>
      <div className="about-content">
        <p>
          I am an 18-year-old student engineer based in Bengaluru, India, with a deep passion for building robust technical solutions across the full stack. My work spans from architecting scalable web applications to developing hardware prototypes using Arduino and ESP32. I approach problems with a systems-thinking mindset, ensuring that every component I build is optimized, maintainable, and aligned with broader technical objectives.
        </p>
        <p>
          Beyond writing code, I am deeply committed to the tech community. I lead technical initiatives, organize hackathons, and foster environments where young engineers can collaborate and build. My leadership experience has taught me the importance of clear communication, rapid execution, and empowering others to solve complex engineering challenges.
        </p>
      </div>
    </section>
  );
};

export default About;
