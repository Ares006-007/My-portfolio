import { useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const categories = ['All', 'AI/ML', 'Hardware', 'Space Tech'];

const projects = [
  {
    title: 'Orbital Debris Tracker',
    description:
      'Real-time tracking system for low-Earth orbit space debris using TLE data and predictive modeling. Visualizes trajectories with WebGL.',
    tags: ['Python', 'Three.js', 'FastAPI', 'Astronomy'],
    category: 'Space Tech',
    github: '#',
    demo: '#',
  },
  {
    title: 'Neural Style Transfer Engine',
    description:
      'Deep learning pipeline for artistic style transfer using PyTorch. Supports real-time inference on uploaded images with custom style mixing.',
    tags: ['PyTorch', 'Python', 'Flask', 'Computer Vision'],
    category: 'AI/ML',
    github: '#',
    demo: '#',
  },
  {
    title: 'Smart Environment Monitor',
    description:
      'Arduino-based IoT system for environmental monitoring with custom PCB designed in KiCAD. Tracks temperature, humidity, CO₂, and air quality.',
    tags: ['Arduino', 'KiCAD', 'C++', 'MQTT'],
    category: 'Hardware',
    github: '#',
  },
  {
    title: 'Satellite Telemetry Dashboard',
    description:
      'Web dashboard for visualizing satellite telemetry data streams. Features real-time graphs, anomaly detection alerts, and mission timeline views.',
    tags: ['React', 'FastAPI', 'WebSocket', 'D3.js'],
    category: 'Space Tech',
    github: '#',
    demo: '#',
  },
  {
    title: 'Gesture-Controlled Rover',
    description:
      'Hand gesture-controlled rover using MediaPipe for pose estimation and ESP32 for motor control. Designed for hazardous environment navigation.',
    tags: ['Python', 'MediaPipe', 'ESP32', 'KiCAD'],
    category: 'Hardware',
    github: '#',
  },
  {
    title: 'Text Sentiment Analyzer API',
    description:
      'Production-ready REST API for multi-language sentiment analysis built with FastAPI and fine-tuned transformer models. Deployed on cloud GPU.',
    tags: ['FastAPI', 'PyTorch', 'Transformers', 'Docker'],
    category: 'AI/ML',
    github: '#',
    demo: '#',
  },
];

const categoryColors = {
  'AI/ML': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  Hardware: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Space Tech': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative">
      <hr className="gradient-divider" />
      <div className="section-wrapper">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Things I've built and experimented with</p>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-accent text-bg-primary'
                  : 'bg-bg-card text-text-secondary border border-border hover:border-border-hover hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.title}
              className="glow-border rounded-xl bg-bg-card/50 p-6 flex flex-col gap-4 group"
            >
              {/* Category badge */}
              <span
                className={`self-start text-xs font-semibold px-3 py-1 rounded-full border ${
                  categoryColors[project.category]
                }`}
              >
                {project.category}
              </span>

              {/* Title */}
              <h3 className="text-text-primary font-semibold text-lg group-hover:text-accent transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded bg-white/5 text-text-secondary font-mono"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                {project.github && (
                  <a
                    href={project.github}
                    className="text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub size={16} />
                    Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
