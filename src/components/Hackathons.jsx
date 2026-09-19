import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { getCollection } from '../data/portfolioStore';

export default function Hackathons() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection('achievements')
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="hackathons"
      className="section-spacing"
      style={{ backgroundColor: 'var(--color-soft-cloud)' }}
    >
      <div className="section-container">
        {/* Section header — heading-xl, uppercase */}
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-section)' }}>
            Hackathons & Events
          </h2>
        </RevealOnScroll>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-section) 0' }}>
            <p className="body-md" style={{ color: 'var(--color-mute)' }}>Loading events…</p>
          </div>
        ) : events.length === 0 ? (
          /* Placeholder when no events */
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
                  Events details coming soon.
                </h3>
                <p className="body-md" style={{ color: 'var(--color-mute)', fontSize: '14px' }}>
                  Currently organizing and documenting events for this section.
                </p>
              </div>
            </motion.div>
          </RevealOnScroll>
        ) : (
          /* Event list — flat rows with hairline dividers */
          <div>
            {events.map((event, i) => (
              <RevealOnScroll key={event.id || event.name} delay={i * 0.08}>
                <div
                  style={{
                    borderTop: '1px solid var(--color-hairline)',
                    padding: 'var(--space-xl) 0',
                  }}
                >
                  <div className="grid md:grid-cols-12" style={{ gap: 'var(--space-xl)' }}>
                    {/* Date column */}
                    <div className="md:col-span-3">
                      <span
                        className="caption-md"
                        style={{ color: 'var(--color-mute)' }}
                      >
                        {event.date || '—'}
                      </span>
                    </div>

                    {/* Content column */}
                    <div className="md:col-span-9">
                      <h3 className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>
                        {event.name}
                      </h3>

                      {/* Role badge — pill */}
                      {event.role && (
                        <span
                          className="caption-sm"
                          style={{
                            display: 'inline-block',
                            backgroundColor: event.role === 'Organized' ? 'var(--color-ink)' : 'var(--color-canvas)',
                            color: event.role === 'Organized' ? 'var(--color-on-primary)' : 'var(--color-ink)',
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-pill)',
                            border: event.role === 'Organized' ? 'none' : '1px solid var(--color-hairline)',
                            marginBottom: 'var(--space-sm)',
                          }}
                        >
                          {event.role}
                        </span>
                      )}

                      <p
                        className="body-md"
                        style={{
                          color: 'var(--color-mute)',
                          maxWidth: '56ch',
                          fontSize: '14px',
                          marginBottom: event.coverUrl ? 'var(--space-md)' : 0,
                        }}
                      >
                        {event.description}
                      </p>

                      {/* Cover Photo */}
                      {event.coverUrl && (
                        <div style={{
                          marginTop: 'var(--space-md)',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          width: '100%',
                          maxWidth: '600px'
                        }}>
                          <img
                            src={event.coverUrl}
                            alt={`${event.name} cover`}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
            {/* Bottom hairline */}
            <hr className="divider" />
          </div>
        )}
      </div>
    </section>
  );
}
