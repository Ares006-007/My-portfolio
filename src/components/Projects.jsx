import React from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

const projectsData = [
  {
    title: 'Meta OpenEnv Hackathon Project',
    summary: 'A high-performance environment visualization tool built during the Meta OpenEnv x HuggingFace hackathon. Ranked in the top tier for technical complexity and system performance.',
    role: 'Lead Full-Stack Developer',
    stack: ['React', 'Python', 'HuggingFace', 'TailwindCSS'],
  },
  {
    title: 'Hardware IoT Prototype',
    summary: 'An autonomous environmental monitoring system that streams real-time telemetry data to a centralized dashboard. Achieved 99.9% uptime over a 4-week testing period.',
    role: 'Hardware Engineer & Developer',
    stack: ['ESP32', 'Arduino', 'C++', 'Node.js', 'WebSockets'],
  },
  {
    title: 'Enterprise Web App Platform',
    summary: 'A scalable, full-stack workflow management application designed for high-throughput data processing. Reduced data processing latency by 40%.',
    role: 'Full-Stack Developer',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Community Tech Dashboard',
    summary: 'A centralized portal for managing event registrations, participant analytics, and real-time announcements. Handled over 500 concurrent users during peak registration.',
    role: 'Project Lead',
    stack: ['React', 'Firebase', 'Express', 'Figma'],
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header reveal">
          <div className="projects-header-left">
            <span className="section-label">[ Selected Projects ]</span>
            <h2 className="projects-title">
              Things I've <span className="serif-accent">built.</span>
            </h2>
          </div>
          <p className="projects-desc">
            A selection of projects that showcase my approach to engineering — from full-stack platforms to IoT hardware systems.
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
