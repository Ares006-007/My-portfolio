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
    <section id="skills" className="section-spacing" style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="section-container">
        {/* Section header — heading-xl, uppercase */}
        <RevealOnScroll>
          <h2 className="heading-xl" style={{ marginBottom: 'var(--space-section)' }}>
            Toolkit
          </h2>
        </RevealOnScroll>

        {/* Categorized grid — flat lists with hairline dividers */}
        <div className="grid md:grid-cols-3" style={{ gap: 'var(--space-section)' }}>
          {skillGroups.map((group, gi) => (
            <RevealOnScroll key={group.title} delay={gi * 0.08}>
              <div
                style={{
                  borderTop: '1px solid var(--color-hairline)',
                  paddingTop: 'var(--space-xl)',
                }}
              >
                <p className="body-strong" style={{ marginBottom: 'var(--space-xl)' }}>
                  {group.title}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {group.skills.map((skill) => (
                    <div key={skill}>
                      <span
                        className="body-md"
                        style={{ color: 'var(--color-mute)' }}
                      >
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
