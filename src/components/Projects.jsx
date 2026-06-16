import React from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

const projectsData = [
  {
    title: 'Meta OpenEnv Hackathon Project',
    summary: 'A high-performance environment visualization tool built during the Meta OpenEnv x HuggingFace hackathon.',
    role: 'Lead Full-Stack Developer',
    stack: ['React', 'Python', 'HuggingFace API', 'TailwindCSS'],
    impact: 'Ranked in the top tier for technical complexity and system performance.'
  },
  {
    title: 'Hardware IoT Prototype',
    summary: 'An autonomous environmental monitoring system that streams real-time telemetry data to a centralized dashboard.',
    role: 'Hardware Engineer & Developer',
    stack: ['ESP32', 'Arduino', 'C++', 'Node.js', 'WebSockets'],
    impact: 'Achieved 99.9% uptime over a 4-week testing period in varied conditions.'
  },
  {
    title: 'Enterprise Web App Platform',
    summary: 'A scalable, full-stack workflow management application designed for high-throughput data processing.',
    role: 'Full-Stack Developer',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    impact: 'Reduced data processing latency by 40% and improved system reliability.'
  },
  {
    title: 'Community Tech Dashboard',
    summary: 'A centralized portal for managing event registrations, participant analytics, and real-time announcements.',
    role: 'Project Lead',
    stack: ['React', 'Firebase', 'Express', 'Figma'],
    impact: 'Successfully handled over 500 concurrent users during peak event registration.'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section container">
      <h2 className="section-title">Selected Projects</h2>
      <div className="projects-list">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
