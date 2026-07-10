import { useState, useRef, useEffect } from 'react';
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
    number: '01',
  },
  {
    title: 'Neural Style Transfer Engine',
    description:
      'Deep learning pipeline for artistic style transfer using PyTorch. Supports real-time inference on uploaded images with custom style mixing.',
    tags: ['PyTorch', 'Python', 'Computer Vision'],
    category: 'AI/ML',
    number: '02',
  },
  {
    title: 'Smart Environment Monitor',
    description:
      'Arduino-based IoT system with custom PCB designed in KiCAD. Tracks temperature, humidity, CO₂, and air quality metrics in real-time.',
    tags: ['Arduino', 'KiCAD', 'C++'],
    category: 'Hardware',
    number: '03',
  },
  {
    title: 'Satellite Telemetry Dashboard',
    description:
      'Web dashboard for visualizing satellite telemetry data streams with real-time graphs, anomaly detection alerts, and mission timeline views.',
    tags: ['React', 'FastAPI', 'WebSocket'],
    category: 'Space Tech',
    number: '04',
  },
  {
    title: 'Gesture-Controlled Rover',
    description:
      'Hand gesture-controlled rover using MediaPipe for pose estimation and ESP32 for motor control. Designed for hazardous environment navigation.',
    tags: ['Python', 'MediaPipe', 'ESP32'],
    category: 'Hardware',
    number: '05',
  },
  {
    title: 'Sentiment Analyzer API',
    description:
      'Production-ready REST API for multi-language sentiment analysis built with FastAPI and fine-tuned transformer models on cloud GPU.',
    tags: ['FastAPI', 'PyTorch', 'Docker'],
    category: 'AI/ML',
    number: '06',
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
        {/* Section label */}
        <RevealOnScroll>
          <p className="label mb-10">02 — Projects</p>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2 className="heading-lg mb-20">
            Selected Work
          </h2>
        </RevealOnScroll>

        {/* Filter bar */}
        <RevealOnScroll>
          <div className="flex flex-wrap gap-6 mb-16 border-b border-border pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`label transition-colors duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'text-fg'
                    : 'text-fg-subtle hover:text-fg-muted'
                }`}
                data-cursor="action"
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="h-px bg-fg mt-1"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Project list */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {filteredProjects.map((project, i) => (
                <motion.article
                  key={project.title}
                  className="border-t border-border py-12 md:py-16 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  data-cursor="link"
                >
                  <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span className="mono">{project.number}</span>
                    </div>

                    {/* Title + Category */}
                    <div className="md:col-span-4">
                      <h3 className="heading-md group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="label mt-2 block text-fg-subtle">
                        {project.category}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-5">
                      <p className="text-fg-muted leading-relaxed text-sm">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="md:col-span-2 flex flex-wrap gap-2 md:justify-end">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mono text-[0.7rem] text-fg-subtle"
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
      </div>
    </section>
  );
}
