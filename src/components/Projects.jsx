import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { getCollection } from '../data/portfolioStore';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection('projects').then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="section-spacing">
      <div className="section-container">
        {/* Section header — heading-xl, uppercase */}
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-section)' }}>
            Selected Work
          </h2>
        </RevealOnScroll>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-section) 0' }}>
            <p className="body-md" style={{ color: 'var(--color-mute)' }}>Loading projects…</p>
          </div>
        ) : projects.length === 0 ? (
          /* Placeholder when no projects */
          <RevealOnScroll>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ maxWidth: '480px', borderRadius: 'var(--radius-none)' }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-soft-cloud)',
                  aspectRatio: '1 / 1',
                  borderRadius: 'var(--radius-none)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="display-campaign"
                  style={{ fontSize: '64px', color: 'var(--color-hairline)', userSelect: 'none' }}
                >
                  —
                </span>
              </div>
              <div style={{ padding: 'var(--space-md) 0' }}>
                <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: 'var(--space-xs)' }}>
                  Coming Soon
                </p>
                <h3 className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>
                  Project details coming soon.
                </h3>
                <p className="body-md" style={{ color: 'var(--color-mute)', fontSize: '14px' }}>
                  Currently selecting and documenting work for this section.
                </p>
              </div>
            </motion.div>
          </RevealOnScroll>
        ) : (
          /* Project cards grid */
          <div className="grid md:grid-cols-2" style={{ gap: 'var(--space-section)' }}>
            {projects.map((project, i) => (
              <RevealOnScroll key={project.id} delay={i * 0.08}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ borderRadius: 'var(--radius-none)' }}
                >
                  {/* Image */}
                  {project.imageUrl ? (
                    <div
                      style={{
                        aspectRatio: '16 / 10',
                        borderRadius: 'var(--radius-none)',
                        overflow: 'hidden',
                        backgroundColor: 'var(--color-soft-cloud)',
                      }}
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'var(--color-soft-cloud)',
                        aspectRatio: '16 / 10',
                        borderRadius: 'var(--radius-none)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        className="display-campaign"
                        style={{ fontSize: '48px', color: 'var(--color-hairline)', userSelect: 'none' }}
                      >
                        ◻
                      </span>
                    </div>
                  )}

                  {/* Metadata */}
                  <div style={{ padding: 'var(--space-md) 0' }}>
                    {project.featured && (
                      <p className="caption-sm" style={{ color: 'var(--color-active)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Featured
                      </p>
                    )}
                    <h3 className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="body-md" style={{ color: 'var(--color-mute)', fontSize: '14px', maxWidth: '52ch', marginBottom: 'var(--space-md)' }}>
                        {project.description}
                      </p>
                    )}

                    {/* Tags */}
                    {project.tags?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="caption-sm"
                            style={{
                              backgroundColor: 'var(--color-soft-cloud)',
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-pill)',
                              color: 'var(--color-charcoal)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div style={{ display: 'flex', gap: 'var(--space-xl)' }}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="caption-md"
                          style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
                          data-cursor="link"
                        >
                          Live ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="caption-md"
                          style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
                          data-cursor="link"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
