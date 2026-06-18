import React from 'react';

const ProjectCard = ({ title, context, summary, stack, index }) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className={`project-card section-card reveal reveal-delay-${(index % 4) + 1}`}>
      <div className="project-card-top">
        <span className="project-index">{num}</span>
        {context && <span className="project-context">{context}</span>}
      </div>

      <h3 className="project-card-title">{title}</h3>
      <p className="project-card-summary">{summary}</p>

      <div className="project-card-footer">
        <div className="project-stack">
          {stack.map((tech, idx) => (
            <span key={idx} className="project-tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
