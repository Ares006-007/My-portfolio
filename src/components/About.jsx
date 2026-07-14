import AnimatedText from './AnimatedText';
import RevealOnScroll from './RevealOnScroll';

const stats = [
  { number: '18', label: 'Years old' },
  { number: '3+', label: 'Domains' },
  { number: '3', label: 'Hackathons' },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-spacing"
      style={{ backgroundColor: 'var(--color-soft-cloud)' }}
    >
      <div className="section-container">
        {/* Section header — heading-xl, uppercase */}
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-section)' }}>
            About
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-12" style={{ gap: 'var(--space-section)' }}>
          {/* Bio — takes 7 cols */}
          <div className="md:col-span-7">
            <AnimatedText
              text="I'm a tech entrepreneur and university student exploring the frontiers where space engineering, hardware design, and artificial intelligence converge."
              className="body-md"
              style={{ marginBottom: 'var(--space-xl)', maxWidth: '52ch', color: 'var(--color-ink)' }}
            />
            <RevealOnScroll delay={0.1}>
              <p
                className="body-md"
                style={{
                  color: 'var(--color-mute)',
                  marginBottom: 'var(--space-xl)',
                  maxWidth: '52ch',
                }}
              >
                From organizing hackathons that bring together hundreds of young
                builders to designing embedded systems and training neural networks,
                I believe in learning by building. Every project is an opportunity
                to push boundaries and create something meaningful.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p
                className="body-md"
                style={{
                  color: 'var(--color-mute)',
                  maxWidth: '52ch',
                }}
              >
                When I'm not coding or soldering, you'll find me reading about
                orbital mechanics, contributing to open-source, or mentoring
                fellow students in their tech journeys.
              </p>
            </RevealOnScroll>
          </div>

          {/* Stats — takes 4 cols, offset by 1 */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center">
            <div
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderRadius: 'var(--radius-none)',
                padding: 'var(--space-xl)',
              }}
            >
              {stats.map((stat, i) => (
                <RevealOnScroll key={stat.label} delay={i * 0.08} direction="right">
                  <div
                    style={{
                      borderTop: i > 0 ? '1px solid var(--color-hairline)' : 'none',
                      paddingTop: i > 0 ? 'var(--space-xl)' : '0',
                      paddingBottom: i < stats.length - 1 ? 'var(--space-xl)' : '0',
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
