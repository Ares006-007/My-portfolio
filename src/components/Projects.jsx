import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

export default function Projects() {
  return (
    <section id="projects" className="section-spacing">
      <div className="section-container">
        {/* Section header — heading-xl, uppercase */}
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-section)' }}>
            Selected Work
          </h2>
        </RevealOnScroll>

        {/* Placeholder card — styled per product-card rules */}
        <RevealOnScroll>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              maxWidth: '480px',
              borderRadius: 'var(--radius-none)',
            }}
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
              }}
            >
              <span
                className="display-campaign"
                style={{
                  fontSize: '64px',
                  color: 'var(--color-hairline)',
                  userSelect: 'none',
                }}
              >
                —
              </span>
            </div>

            {/* Metadata — stacked directly below with tight spacing */}
            <div style={{ padding: 'var(--space-md) 0' }}>
              <p
                className="caption-md"
                style={{ color: 'var(--color-mute)', marginBottom: 'var(--space-xs)' }}
              >
                Coming Soon
              </p>
              <h3 className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>
                Project details coming soon.
              </h3>
              <p
                className="body-md"
                style={{
                  color: 'var(--color-mute)',
                  fontSize: '14px',
                }}
              >
                Currently selecting and documenting work for this section.
              </p>
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

