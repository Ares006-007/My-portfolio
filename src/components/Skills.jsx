import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiPytorch,
  SiFastapi,
  SiReact,
  SiArduino,
  SiKicad,
  SiGit,
  SiDocker,
  SiLinux,
  SiTensorflow,
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'C/C++', icon: <SiCplusplus /> },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'PyTorch', icon: <SiPytorch /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'React', icon: <SiReact /> },
      { name: 'TensorFlow', icon: <SiTensorflow /> },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Arduino', icon: <SiArduino /> },
      { name: 'KiCAD', icon: <SiKicad /> },
      { name: 'Git', icon: <SiGit /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Linux', icon: <SiLinux /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <hr className="gradient-divider" />
      <div className="section-wrapper">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3
                className="text-accent text-sm font-semibold tracking-widest uppercase mb-5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glow-border rounded-lg bg-bg-card/50 px-4 py-3 flex items-center gap-3 group cursor-default"
                  >
                    <span className="text-text-secondary text-lg group-hover:text-accent transition-colors">
                      {skill.icon}
                    </span>
                    <span className="text-text-primary text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
