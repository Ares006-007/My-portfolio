import AnimatedText from './AnimatedText';
import RevealOnScroll from './RevealOnScroll';

const stats = [
  { number: '18', label: 'Years old' },
  { number: '3+', label: 'Domains' },
  { number: '3', label: 'Hackathons' },
];

export default function About() {
  return (
    <section id="about" className="section-spacing">
      <div className="section-container">
        {/* Section label */}
        <RevealOnScroll>
          <p className="label mb-6">01 — About</p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-5 gap-12 md:gap-20">
          {/* Bio — takes 3 cols */}
          <div className="md:col-span-3">
            <AnimatedText
              text="I'm a tech entrepreneur and university student exploring the frontiers where space engineering, hardware design, and artificial intelligence converge."
              className="body-lg mb-8"
            />
            <RevealOnScroll delay={0.15}>
              <p className="text-fg-muted leading-relaxed mb-6">
                From organizing hackathons that bring together hundreds of young
                builders to designing embedded systems and training neural networks,
                I believe in learning by building. Every project is an opportunity
                to push boundaries and create something meaningful.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.25}>
              <p className="text-fg-muted leading-relaxed">
                When I'm not coding or soldering, you'll find me reading about
                orbital mechanics, contributing to open-source, or mentoring
                fellow students in their tech journeys.
              </p>
            </RevealOnScroll>
          </div>

          {/* Stats — takes 2 cols */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <div className="space-y-10">
              {stats.map((stat, i) => (
                <RevealOnScroll key={stat.label} delay={i * 0.1} direction="right">
                  <div className="border-t border-border pt-5">
                    <p
                      className="text-5xl font-bold tracking-tight text-fg"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {stat.number}
                    </p>
                    <p className="label mt-2">{stat.label}</p>
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
