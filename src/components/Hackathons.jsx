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
                <div className="group relative p-8 md:p-10 rounded-2xl bg-bg-alt/40 border border-border hover:bg-bg-alt/80 transition-all duration-500 overflow-hidden">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-highlight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="grid md:grid-cols-12 gap-8 items-start relative z-10">
                    <div className="md:col-span-3">
                      <span className="mono text-fg-subtle">{event.date}</span>
                    </div>

                    <div className="md:col-span-9 flex flex-col gap-4">
                      <h3 className="heading-md group-hover:text-highlight transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                        {event.name}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
                        <span className="label text-accent">{event.role}</span>
                        {event.awards && (
                          <span className="text-highlight font-medium">✦ {event.awards}</span>
                        )}
                      </div>
                      
                      <p className="text-fg-muted mt-2 max-w-2xl text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          <hr className="divider" style={{ background: 'var(--color-border-dark)' }} />
        </div>
      </div>
    </section>
  );
}
