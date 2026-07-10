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
          <p className="label mb-10">01 — About</p>
        </RevealOnScroll>

        <div className="grid md:grid-cols-12 gap-16 md:gap-8">
          {/* Bio — takes 7 cols */}
          <div className="md:col-span-7">
            <RevealOnScroll>
              <h2 className="heading-lg mb-12">About Me</h2>
            </RevealOnScroll>
            <AnimatedText
              text="I'm a tech entrepreneur and university student exploring the frontiers where space engineering, hardware design, and artificial intelligence converge."
              className="body-lg mb-10 max-w-[52ch]"
            />
            <RevealOnScroll delay={0.15}>
              <p className="text-fg-muted leading-relaxed mb-8 max-w-[52ch]">
                From organizing hackathons that bring together hundreds of young
                builders to designing embedded systems and training neural networks,
                I believe in learning by building. Every project is an opportunity
                to push boundaries and create something meaningful.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.25}>
              <p className="text-fg-muted leading-relaxed max-w-[52ch]">
                When I'm not coding or soldering, you'll find me reading about
                orbital mechanics, contributing to open-source, or mentoring
                fellow students in their tech journeys.
              </p>
            </RevealOnScroll>
          </div>

          {/* Stats — takes 4 cols, offset by 1 */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center">
            <div className="space-y-6">
              {stats.map((stat, i) => (
                <RevealOnScroll key={stat.label} delay={i * 0.1} direction="right">
                  <div className="bg-bg-alt rounded-xl p-6 border border-border">
                    <p
                      className="text-4xl font-bold tracking-tight text-fg"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {stat.number}
                    </p>
                    <p className="label mt-3">{stat.label}</p>
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
