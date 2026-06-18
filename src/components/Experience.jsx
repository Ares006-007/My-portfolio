import React from 'react';
import './Timeline.css';

const experience = [
  {
    title: 'Lead Organizer',
    org: 'Hack Club',
    date: '2023 — present',
    desc: 'Run technical events and workshops for students. Handle logistics, sponsorships, and curriculum — the full stack of making an event work, not just the code.',
  },
  {
    title: 'Freelance Developer',
    org: 'Independent',
    date: '2022 — present',
    desc: 'Build web apps for local businesses. Mostly React and Node, mostly replacing broken spreadsheets and manual processes with something that actually scales.',
  },
];

const hackathons = [
  {
    title: 'Meta OpenEnv × HuggingFace Hackathon',
    date: '2023',
    desc: 'Built an environment visualization tool using HuggingFace models. Recognized for technical depth.',
  },
  {
    title: 'National IoT Build-a-thon',
    date: '2023',
    desc: 'Won the hardware track. Built a low-cost sensor network with ESP32s and wrote firmware to handle intermittent connectivity.',
  },
];

const events = [
  {
    title: 'Home to Ocean YSWS',
    org: 'Hack Club',
    date: '2024',
    desc: 'Organized a large technical gathering for young developers — managed infrastructure, sponsors, workshops, and on-the-ground operations.',
  },
  {
    title: 'Local Dev Meetups',
    date: '2023 — 2024',
    desc: 'Ran regular workshops on full-stack development and version control for high school and early college students.',
  },
];

const Background = () => {
  return (
    <section id="background" className="timeline-section">
      <div className="container">
        <div className="reveal">
          <span className="label">Background</span>
          <h2 className="timeline-heading">Where I've been</h2>
        </div>

        {/* Experience */}
        <div className="timeline-group reveal">
          <h3 className="timeline-group-label">Experience</h3>
          <div className="timeline-list">
            {experience.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-meta">
                  <span className="timeline-date">{item.date}</span>
                  {item.org && <span className="timeline-org">{item.org}</span>}
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons */}
        <div className="timeline-group reveal">
          <h3 className="timeline-group-label">Hackathons</h3>
          <div className="timeline-list">
            {hackathons.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-meta">
                  <span className="timeline-date">{item.date}</span>
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="timeline-group reveal">
          <h3 className="timeline-group-label">Events organized</h3>
          <div className="timeline-list">
            {events.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-meta">
                  <span className="timeline-date">{item.date}</span>
                  {item.org && <span className="timeline-org">{item.org}</span>}
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Background;
