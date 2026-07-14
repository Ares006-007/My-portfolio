import RevealOnScroll from './RevealOnScroll';

const events = [
  {
    name: 'Code Day 2026',
    role: 'Organized',
    date: 'Mar 2026',
    description:
      'Led the organization of a city-wide coding marathon with 200+ student developers. Managed sponsorships, mentors, and logistics for a 24-hour hackathon.',
  },
  {
    name: 'Meta OpenEnv Hackathon',
    role: 'Attended',
    date: 'Jan 2026',
    description:
      'Participated in Meta\'s open-environment hackathon focused on sustainable tech solutions. Built an AI-powered environmental impact assessor.',
  },
  {
    name: 'Home2Ocean YSWS',
    role: 'Attended',
    date: 'Nov 2025',
    description:
      'Young Scientists Workshop Series on ocean technology and conservation. Worked on an underwater sensor network prototype for marine ecosystem monitoring.',
  },
];

export default function Hackathons() {
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

        {/* Event list — flat rows with hairline dividers */}
        <div>
          {events.map((event, i) => (
            <RevealOnScroll key={event.name} delay={i * 0.08}>
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
                      {event.date}
                    </span>
                  </div>

                  {/* Content column */}
                  <div className="md:col-span-9">
                    <h3 className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>
                      {event.name}
                    </h3>

                    {/* Role badge — pill */}
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

                    <p
                      className="body-md"
                      style={{
                        color: 'var(--color-mute)',
                        maxWidth: '56ch',
                        fontSize: '14px',
                      }}
                    >
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
          {/* Bottom hairline */}
          <hr className="divider" />
        </div>
      </div>
    </section>
  );
}
