import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealOnScroll from './RevealOnScroll';

gsap.registerPlugin(ScrollTrigger);

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

const allSkills = skillGroups.flatMap((g) => g.skills);

export default function Skills() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !marqueeRef.current) return;

    const el = marqueeRef.current;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section-spacing overflow-hidden">
      <div className="section-container">
        {/* Section label */}
        <RevealOnScroll>
          <p className="label mb-6">04 — Skills</p>
        </RevealOnScroll>

        <RevealOnScroll>
          <h2 className="heading-lg mb-20">
            Technologies & Tools
          </h2>
        </RevealOnScroll>
      </div>

      {/* Horizontal scrolling marquee */}
      <div className="relative py-12 border-y border-border overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex gap-8 whitespace-nowrap w-max"
        >
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight text-fg/10 hover:text-fg/80 transition-colors duration-500 select-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Categorized grid below */}
      <div className="section-container mt-20">
        <div className="grid md:grid-cols-3 gap-16">
          {skillGroups.map((group, gi) => (
            <RevealOnScroll key={group.title} delay={gi * 0.1}>
              <div>
                <p className="label mb-6">{group.title}</p>
                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between py-3 border-b border-border group"
                    >
                      <span className="text-fg font-medium text-sm group-hover:text-accent transition-colors duration-300">
                        {skill}
                      </span>
                      <span className="mono text-fg-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        →
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
