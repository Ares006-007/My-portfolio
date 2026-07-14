import AnimatedText from './AnimatedText';
import RevealOnScroll from './RevealOnScroll';

const stats = [
  { number: '18', label: 'Years old' },
  { number: '6+', label: 'Events produced' },
  { number: '800', label: 'Meta hackathon rank' },
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
              text="I organize mass-scale tech events, compete in international hackathons, and mentor teenagers in astrophysics — then come home and write code."
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
                My work spans event production for audiences of thousands, stage management
                at Comic Con and BookMyShow concerts, a top-800 finish at Meta's OpenEnv
                Hackathon, and a youth STEM mentorship program where I taught rocket science,
                black holes, and the Big Bang theory.
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

