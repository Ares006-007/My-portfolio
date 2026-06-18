import React from 'react';
import './Skills.css';

const skillCategories = [
  {
    path: '~/skills/languages',
    title: 'Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'C++', 'HTML/CSS']
  },
  {
    path: '~/skills/frontend',
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Vite', 'TailwindCSS', 'Framer Motion']
  },
  {
    path: '~/skills/backend',
    title: 'Backend & DB',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Firebase', 'REST APIs']
  },
  {
    path: '~/skills/tools',
    title: 'Tools & Hardware',
    skills: ['Git/GitHub', 'Docker', 'Figma', 'Arduino', 'ESP32']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="floating-card reveal">
          <span className="section-label">[ Capabilities ]</span>
          <h2 className="skills-title">
            My <span className="serif-accent">toolkit.</span>
          </h2>

          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <span className="skill-path">{category.path}</span>
                <h3 className="skill-category-title">{category.title}</h3>
                <ul className="skill-list">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="skill-item">
                      <span className="skill-dot"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
