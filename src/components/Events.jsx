import React from 'react';

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
    date: '2023 - 2024',
    description: 'Regularly hosted workshops on full-stack development, version control, and system architecture for high school and early college students.',
  }
];

const Events = () => {
  return (
    <section id="events" className="section container">
      <h2 className="section-title">Events Organized</h2>
      <div className="timeline">
        {eventsData.map((item, index) => (
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

export default Events;
