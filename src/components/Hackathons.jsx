import { HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi';

const events = [
  {
    name: 'Code Day 2026',
    role: 'Organized',
    date: 'March 2026',
    description:
      'Led the organization of a city-wide coding marathon bringing together 200+ student developers for a 24-hour hackathon. Managed sponsorships, mentors, and logistics.',
    tags: ['Organizer', 'Leadership', '200+ Participants'],
  },
  {
    name: 'Meta OpenEnv Hackathon',
    role: 'Attended',
    date: 'January 2026',
    description:
      'Participated in Meta\'s open-environment hackathon focused on building sustainable tech solutions. Built an AI-powered environmental impact assessor.',
    tags: ['Participant', 'AI/ML', 'Sustainability'],
  },
  {
    name: 'Home2Ocean YSWS',
    role: 'Attended',
    date: 'November 2025',
    description:
      'Young Scientists Workshop Series focused on ocean technology and conservation. Worked on an underwater sensor network prototype for marine ecosystem monitoring.',
    tags: ['Participant', 'Hardware', 'Marine Tech'],
  },
];

export default function Hackathons() {
  return (
    <section id="hackathons" className="relative">
      <hr className="gradient-divider" />
      <div className="section-wrapper">
        <h2 className="section-title">Hackathons & Events</h2>
        <p className="section-subtitle">Events I've organized, attended, and competed in</p>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={event.name}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent-glow-strong)] z-10 mt-6" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 glow-border rounded-xl bg-bg-card/50 p-6">
                  {/* Role badge */}
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                      event.role === 'Organized'
                        ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20'
                        : 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                    }`}
                  >
                    {event.role}
                  </span>

                  <h3 className="text-text-primary font-semibold text-xl mb-2">
                    {event.name}
                  </h3>

                  <div className="flex items-center gap-4 text-text-secondary text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <HiOutlineCalendar size={14} />
                      {event.date}
                    </span>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-white/5 text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
