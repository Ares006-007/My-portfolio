import { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import RevealOnScroll from './RevealOnScroll';
import { getSiteConfig } from '../data/portfolioStore';

export default function About() {
  const [about, setAbout] = useState({});

  useEffect(() => {
    getSiteConfig()
      .then((config) => {
        if (config?.about) setAbout(config.about);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="about"
      className="section-spacing"
      style={{ backgroundColor: 'var(--color-soft-cloud)' }}
    >
      <div className="section-container">
        {/* Editorial pull-quote — display-campaign at reduced scale */}
        <RevealOnScroll>
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <AnimatedText
              text={about.headline1}
              className="display-campaign"
              style={{
                color: 'var(--color-ink)',
                fontSize: 'clamp(36px, 6vw, 72px)',
              }}
            />
            <AnimatedText
              text={about.headline2}
              className="display-campaign"
              style={{
                color: 'var(--color-charcoal)',
                fontSize: 'clamp(36px, 6vw, 72px)',
              }}
            />
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-12" style={{ gap: 'var(--space-section)' }}>
          {/* Bio — takes 7 cols */}
          <div className="md:col-span-7">
            {/* Section header — heading-xl, uppercase */}
            <RevealOnScroll>
              <h2 className="heading-xl" style={{ marginBottom: 'var(--space-section)' }}>
                About
              </h2>
            </RevealOnScroll>
            <AnimatedText
              text={about.bio}
              className="body-md"
              style={{ marginBottom: 'var(--space-xl)', maxWidth: '52ch', color: 'var(--color-ink)' }}
            />
            <RevealOnScroll delay={0.1}>
              <p
                className="body-md"
                style={{
                  color: 'var(--color-mute)',
                  maxWidth: '52ch',
                }}
              >
                {about.extendedBio}
              </p>
            </RevealOnScroll>
          </div>

          {/* Stats — takes 4 cols, offset by 1 */}
          <div className="md:col-span-4 md:col-start-9">
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-none)',
                padding: 'var(--space-xl)',
              }}
            >
              {(about.stats || []).map((stat, i) => (
                <RevealOnScroll key={stat.label} delay={i * 0.08} direction="right">
                  <div
                    style={{
                      borderTop: i > 0 ? '1px solid var(--color-hairline)' : 'none',
                      paddingTop: i > 0 ? 'var(--space-xl)' : '0',
                      paddingBottom: i < (about.stats || []).length - 1 ? 'var(--space-xl)' : '0',
                    }}
                  >
                    <p className="heading-lg" style={{ color: 'var(--color-ink)' }}>
                      {stat.number}
                    </p>
                    <p
                      className="caption-md"
                      style={{ color: 'var(--color-mute)', marginTop: 'var(--space-xs)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
