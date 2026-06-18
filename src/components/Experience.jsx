import React from 'react';
import './Timeline.css';

const experienceData = [
  {
    role: 'Lead Technical Organizer',
    organization: 'Hack Club',
    date: '2023 — Present',
    description: 'Spearheaded technical events and workshops, mentoring over 200+ students in web development and hardware engineering. Managed logistics, sponsorships, and technical infrastructure for community events.',
  },
  {
    role: 'Freelance Full-Stack Developer',
    organization: 'Self-Employed',
    date: '2022 — Present',
    description: 'Designed and implemented custom web solutions for local businesses using React, Node.js, and PostgreSQL. Focused on delivering high-performance, accessible, and responsive user interfaces.',
  },
  {
    role: 'Student Engineer',
    organization: 'High School',
    date: '2024',
    description: 'Completed Class 12 with a strong focus on Computer Science and Mathematics. Developed foundational skills in algorithms, data structures, and low-level programming.',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="timeline-section">
      <div className="container">
        <div className="floating-card reveal">
          <span className="section-label">[ Experience ]</span>
          <h2 className="timeline-title">
            Where I've <span className="serif-accent">worked.</span>
          </h2>

          <div className="timeline-list">
            {experienceData.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-item-meta">
                  <span className="timeline-date">{item.date}</span>
                  <span className="timeline-org">{item.organization}</span>
                </div>
                <div className="timeline-item-content">
                  <h3 className="timeline-role">{item.role}</h3>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
