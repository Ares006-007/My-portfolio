import React from 'react';
import './Timeline.css';

const eventsData = [
  {
    role: 'Lead Organizer',
    organization: 'Home to Ocean YSWS (Hack Club)',
    date: '2024',
    description: 'Orchestrated a large-scale technical gathering bringing together young developers. Managed everything from technical infrastructure and sponsor relations to workshop curriculum design. Focused on creating an environment that prioritized hands-on building and engineering excellence.',
  },
  {
    role: 'Technical Mentor',
    organization: 'Local Tech Meetups',
    date: '2023 — 2024',
    description: 'Regularly hosted workshops on full-stack development, version control, and system architecture for high school and early college students.',
  }
];

const Events = () => {
  return (
    <section id="events" className="timeline-section">
      <div className="container">
        <div className="floating-card reveal">
          <span className="section-label">[ Events Organized ]</span>
          <h2 className="timeline-title">
            Communities I've <span className="serif-accent">shaped.</span>
          </h2>

          <div className="timeline-list">
            {eventsData.map((item, index) => (
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

export default Events;
