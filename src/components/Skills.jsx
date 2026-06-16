import React from 'react';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'C++', 'HTML/CSS']
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Vite', 'TailwindCSS', 'Framer Motion']
  },
  {
    title: 'Backend & DB',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Firebase', 'REST APIs']
  },
  {
    title: 'Tools & Hardware',
    skills: ['Git/GitHub', 'Docker', 'Figma', 'Arduino', 'ESP32']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="section container">
      <h2 className="section-title">Skills & Tools</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3 className="category-title">{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, idx) => (
                <span key={idx} className="badge skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
