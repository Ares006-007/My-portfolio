import React from 'react';

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
    <section id="hackathons" className="section container">
      <h2 className="section-title">Hackathons</h2>
      <div className="timeline">
        {hackathonsData.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="timeline-role">{item.organization}</h3>
              <div className="timeline-meta">
                <span className="timeline-org">{item.role}</span>
                <span className="timeline-date">{item.date}</span>
              </div>
              <p className="timeline-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hackathons;
