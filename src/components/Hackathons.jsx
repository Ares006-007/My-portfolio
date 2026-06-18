import React from 'react';
import './Timeline.css';

const hackathonsData = [
  {
    role: 'Participant & Developer',
    organization: 'Meta OpenEnv x HuggingFace Hackathon',
    date: '2023',
    description: 'Developed a high-performance environment visualization tool leveraging HuggingFace AI models and React. Navigated complex system integrations and optimized the frontend for real-time data rendering. Recognized for technical depth and execution speed.',
  },
  {
    role: 'Hardware Track Winner',
    organization: 'National IoT Build-a-thon',
    date: '2023',
    description: 'Built a low-cost, energy-efficient sensor network using ESP32 microcontrollers. Designed the hardware architecture and wrote the firmware in C++ to handle intermittent connectivity.',
  }
];

const Hackathons = () => {
  return (
    <section id="hackathons" className="timeline-section">
      <div className="container">
        <div className="floating-card reveal">
          <span className="section-label">[ Hackathons ]</span>
          <h2 className="timeline-title">
            Competitions I've <span className="serif-accent">won.</span>
          </h2>

          <div className="timeline-list">
            {hackathonsData.map((item, index) => (
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

export default Hackathons;
