import React from 'react';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C++', 'HTML / CSS']
  },
  {
    title: 'Web',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'Firebase']
  },
  {
    title: 'Infrastructure',
    skills: ['PostgreSQL', 'Docker', 'Git', 'REST APIs', 'WebSockets']
  },
  {
    title: 'Hardware',
    skills: ['Arduino', 'ESP32', 'Sensor integration', 'Firmware (C++)', 'PCB basics']
  }
];

const interests = [
  'Mechatronics', 'Robotics', 'Automation', 'Aerospace systems', 'Product design'
];

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="reveal">
          <span className="label">Toolkit</span>
          <h2 className="skills-heading">What I work with</h2>
        </div>

        <div className="skills-grid reveal">
          {skillCategories.map((cat, i) => (
            <div key={i} className="skill-group">
              <h3 className="skill-group-title">{cat.title}</h3>
              <ul className="skill-list">
                {cat.skills.map((skill, j) => (
                  <li key={j} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="interests reveal">
          <h3 className="interests-label">Also interested in</h3>
          <div className="interests-list">
            {interests.map((item, i) => (
              <span key={i} className="interest-tag">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
