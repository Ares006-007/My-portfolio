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
    <section id="hackathons" className="section-spacing bg-bg-alt">
      <div className="section-container">
        {/* Section label */}
        <RevealOnScroll>
          <p className="label mb-10">03 — Events</p>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2 className="heading-lg italic mb-20 text-fg-muted">
            Hackathons & Events.
          </h2>
        </RevealOnScroll>

        {/* Event list */}
        <div>
          {events.map((event, i) => (
            <RevealOnScroll key={event.name} delay={i * 0.1}>
              <article className="border-t border-border-dark py-12 md:py-16">
                <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                  {/* Date + Role */}
                  <div className="md:col-span-3 flex flex-col gap-1">
                    <span className="mono">{event.date}</span>
                    <span
                      className={`label text-[0.65rem] ${
                        event.role === 'Organized' ? 'text-accent' : 'text-fg-subtle'
                      }`}
                    >
                      {event.role}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="md:col-span-4">
                    <h3 className="heading-md" style={{ fontFamily: 'var(--font-heading)' }}>{event.name}</h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p className="text-fg-muted leading-relaxed text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
          <hr className="divider" style={{ background: 'var(--color-border-dark)' }} />
        </div>
      </div>
    </section>
  );
}
