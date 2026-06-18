import React from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

const projectsData = [
  {
    title: 'Environment Visualization Tool',
    context: 'Meta OpenEnv × HuggingFace Hackathon',
    summary: 'Built a tool that renders complex environment data visually, pulling from HuggingFace models. The tricky part was getting real-time rendering smooth enough to be usable while the models were still processing.',
    stack: ['React', 'Python', 'HuggingFace', 'TailwindCSS'],
  },
  {
    title: 'IoT Sensor Network',
    context: 'Hardware project',
    summary: 'A mesh of ESP32 microcontrollers streaming environmental telemetry to a web dashboard. Wrote the firmware in C++ to handle connectivity drops gracefully — the kind of problem you only discover when your sensors are on a rooftop.',
    stack: ['ESP32', 'C++', 'Node.js', 'WebSockets'],
  },
  {
    title: 'Workflow Management App',
    context: 'Freelance project',
    summary: 'A full-stack app for a local business to track and process their daily operations. Nothing glamorous — form submissions, status tracking, role-based access. But it replaced a spreadsheet that was falling apart.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Hackathon Registration Portal',
    context: 'Built for Hack Club events',
    summary: 'A portal to handle registrations, announcements, and check-ins for hackathons I was organizing. Had to work reliably during peak sign-up windows when a few hundred people hit it at once.',
    stack: ['React', 'Firebase', 'Express'],
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects-header reveal">
          <div>
            <span className="label">Work</span>
            <h2 className="projects-title">Things I've built</h2>
          </div>
          <p className="projects-desc">
            A mix of hackathon projects, freelance work, and things I built because I needed them.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
