import React from 'react';
import './Timeline.css';

const experienceData = [
  {
    role: 'Lead Technical Organizer',
    organization: 'Hack Club',
    date: '2023 - Present',
    description: 'Spearheaded technical events and workshops, mentoring over 200+ students in web development and hardware engineering. Managed logistics, sponsorships, and technical infrastructure for community events.',
  },
  {
    role: 'Freelance Full-Stack Developer',
    organization: 'Self-Employed',
    date: '2022 - Present',
    description: 'Designed and implemented custom web solutions for local businesses using React, Node.js, and PostgreSQL. Focused on delivering high-performance, accessible, and responsive user interfaces.',
  },
  {
    role: 'Student Engineer (Class 12 Completion)',
    organization: 'High School',
    date: '2024',
    description: 'Completed Class 12 with a strong focus on Computer Science and Mathematics. Developed foundational skills in algorithms, data structures, and low-level programming.',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section container">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experienceData.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-meta">
                <span className="timeline-org">{item.organization}</span>
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

export default Experience;
