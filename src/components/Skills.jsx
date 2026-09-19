import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { getCollection } from '../data/portfolioStore';

export default function Skills() {
  const [skillGroups, setSkillGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection('skills')
      .then((data) => {
        setSkillGroups(data);
        setLoading(false);
      })
      .catch(() => {
        setSkillGroups([]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="skills" className="section-spacing" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="section-container">
        {/* Section header — heading-xl, uppercase */}
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-section)' }}>
            Toolkit
          </h2>
        </RevealOnScroll>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-section) 0' }}>
            <p className="body-md" style={{ color: 'var(--color-mute)' }}>Loading toolkit…</p>
          </div>
        ) : skillGroups.length === 0 ? (
          /* Placeholder when no skills */
          <RevealOnScroll>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ maxWidth: '480px', borderRadius: 'var(--radius-none)' }}
            >
              <div style={{ padding: 'var(--space-md) 0' }}>
                <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: 'var(--space-xs)' }}>
                  Coming Soon
                </p>
                <h3 className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>
                  Toolkit details coming soon.
                </h3>
                <p className="body-md" style={{ color: 'var(--color-mute)', fontSize: '14px' }}>
                  Currently organizing and documenting skills for this section.
                </p>
              </div>
            </motion.div>
          </RevealOnScroll>
        ) : (
          /* Categorized grid — flat lists with hairline dividers */
          <div className="grid md:grid-cols-3" style={{ gap: 'var(--space-section)' }}>
            {skillGroups.map((group, gi) => (
              <RevealOnScroll key={group.id || group.title} delay={gi * 0.08}>
                <div
                  style={{
                    borderTop: '1px solid var(--color-hairline)',
                    paddingTop: 'var(--space-xl)',
                  }}
                >
                  <p className="body-strong" style={{ marginBottom: 'var(--space-xl)' }}>
                    {group.title}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    {(group.skills || []).map((skill) => (
                      <div key={skill}>
                        <span
                          className="body-md"
                          style={{ color: 'var(--color-mute)' }}
                        >
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
