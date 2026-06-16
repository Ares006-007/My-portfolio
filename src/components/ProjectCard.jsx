import React from 'react';

const ProjectCard = ({ title, summary, role, stack, impact }) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-title">{title}</h3>
        <span className="project-role">{role}</span>
      </div>
      <p className="project-summary">{summary}</p>
      {impact && <p className="project-impact">{impact}</p>}
      <div className="project-stack">
        {stack.map((tech, index) => (
          <span key={index} className="badge">{tech}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
