import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

const categories = ['All', 'AI/ML', 'Hardware', 'Space Tech'];

const projects = [
  {
    title: 'Orbital Debris Tracker',
    description:
      'Real-time tracking system for low-Earth orbit space debris using TLE data and predictive modeling with WebGL trajectory visualization.',
    tags: ['Python', 'Three.js', 'FastAPI'],
    category: 'Space Tech',
  },
  {
    title: 'Neural Style Transfer Engine',
    description:
      'Deep learning pipeline for artistic style transfer using PyTorch. Supports real-time inference on uploaded images with custom style mixing.',
    tags: ['PyTorch', 'Python', 'Computer Vision'],
    category: 'AI/ML',
  },
  {
    title: 'Smart Environment Monitor',
    description:
      'Arduino-based IoT system with custom PCB designed in KiCAD. Tracks temperature, humidity, CO₂, and air quality metrics in real-time.',
    tags: ['Arduino', 'KiCAD', 'C++'],
    category: 'Hardware',
  },
  {
    title: 'Satellite Telemetry Dashboard',
    description:
      'Web dashboard for visualizing satellite telemetry data streams with real-time graphs, anomaly detection alerts, and mission timeline views.',
    tags: ['React', 'FastAPI', 'WebSocket'],
    category: 'Space Tech',
  },
  {
    title: 'Gesture-Controlled Rover',
    description:
      'Hand gesture-controlled rover using MediaPipe for pose estimation and ESP32 for motor control. Designed for hazardous environment navigation.',
    tags: ['Python', 'MediaPipe', 'ESP32'],
    category: 'Hardware',
  },
  {
    title: 'Sentiment Analyzer API',
    description:
      'Production-ready REST API for multi-language sentiment analysis built with FastAPI and fine-tuned transformer models on cloud GPU.',
    tags: ['FastAPI', 'PyTorch', 'Docker'],
    category: 'AI/ML',
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-spacing">
      <div className="section-container">
        {/* Section header — heading-xl, uppercase */}
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-section)' }}>
            Selected Work
          </h2>
        </RevealOnScroll>

        {/* Filter chips — pill-shaped, inverted on active */}
        <RevealOnScroll>
          <div className="flex flex-wrap" style={{ gap: 'var(--space-sm)', marginBottom: 'var(--space-section)' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={activeFilter === cat ? 'filter-chip-active' : 'filter-chip'}
                data-cursor="action"
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Project grid — flat, zero-radius cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: 'var(--space-sm)' }}
          >
            {filteredProjects.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ borderRadius: 'var(--radius-none)' }}
                data-cursor="link"
              >
                {/* Image area — full-bleed on soft-cloud */}
                <div
                  style={{
                    backgroundColor: 'var(--color-soft-cloud)',
                    aspectRatio: '1 / 1',
                    borderRadius: 'var(--radius-none)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Project icon placeholder — category initial */}
                  <span
                    className="display-campaign"
                    style={{
                      fontSize: '64px',
                      color: 'var(--color-hairline)',
                      userSelect: 'none',
                    }}
                  >
                    {project.category.charAt(0)}
                  </span>
                </div>

                {/* Metadata — stacked directly below with tight spacing */}
                <div style={{ padding: `var(--space-md) 0` }}>
                  {/* Category subtitle */}
                  <p
                    className="caption-md"
                    style={{ color: 'var(--color-mute)', marginBottom: 'var(--space-xs)' }}
                  >
                    {project.category}
                  </p>

                  {/* Project name */}
                  <h3 className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="body-md"
                    style={{
                      color: 'var(--color-mute)',
                      fontSize: '14px',
                      marginBottom: 'var(--space-md)',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tags — pill badges */}
                  <div className="flex flex-wrap" style={{ gap: 'var(--space-xs)' }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="caption-sm"
                        style={{
                          backgroundColor: 'var(--color-soft-cloud)',
                          color: 'var(--color-ink)',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-pill)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
