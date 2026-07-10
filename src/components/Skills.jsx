import RevealOnScroll from './RevealOnScroll';

const skillGroups = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'C/C++'],
  },
  {
    title: 'Frameworks',
    skills: ['PyTorch', 'FastAPI', 'React', 'TensorFlow'],
  },
  {
    title: 'Tools',
    skills: ['Arduino', 'KiCAD', 'Git', 'Docker', 'Linux'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-spacing">
      <div className="section-container">
        {/* Section label */}
        <RevealOnScroll>
          <p className="label mb-10">04 — Skills</p>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2 className="heading-lg italic mb-24 text-fg-muted">
            Technologies & Tools.
          </h2>
        </RevealOnScroll>

        {/* Categorized grid below */}
        <div className="grid md:grid-cols-3 gap-20">
          {skillGroups.map((group, gi) => (
            <RevealOnScroll key={group.title} delay={gi * 0.1}>
              <div className="bg-bg-alt/30 border border-border rounded-2xl p-8 hover:bg-bg-alt/60 transition-colors duration-500 h-full">
                <p className="label mb-8 text-accent">{group.title}</p>
                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-fg-muted font-light group-hover:text-fg transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
