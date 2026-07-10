import { HiOutlineAcademicCap, HiOutlineLightningBolt, HiOutlineChip } from 'react-icons/hi';
import { FaRocket } from 'react-icons/fa';

const stats = [
  {
    icon: <HiOutlineAcademicCap size={24} />,
    label: 'Student',
    value: 'University',
    desc: 'Space Engineering',
  },
  {
    icon: <FaRocket size={20} />,
    label: 'Entrepreneur',
    value: 'Tech Founder',
    desc: 'Building the future',
  },
  {
    icon: <HiOutlineLightningBolt size={24} />,
    label: 'Age',
    value: '18',
    desc: 'Years of ambition',
  },
  {
    icon: <HiOutlineChip size={24} />,
    label: 'Focus Areas',
    value: '3 Domains',
    desc: 'Space · AI · Hardware',
  },
];

export default function About() {
  return (
    <section id="about" className="relative">
      <hr className="gradient-divider" />
      <div className="section-wrapper">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">A glimpse into who I am and what drives me</p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div className="space-y-5">
            <p className="text-text-secondary leading-relaxed">
              I'm an 18-year-old tech entrepreneur and university student with a deep 
              passion for exploring the frontiers of technology. My journey spans three 
              exciting domains — <span className="text-accent font-medium">space engineering</span>, 
              <span className="text-accent font-medium"> hardware &amp; electronics</span>, and 
              <span className="text-accent font-medium"> AI/ML</span>.
            </p>
            <p className="text-text-secondary leading-relaxed">
              From organizing hackathons that bring together hundreds of young builders 
              to designing embedded systems and training neural networks, I believe in 
              learning by doing. Every project is an opportunity to push boundaries and 
              create something meaningful.
            </p>
            <p className="text-text-secondary leading-relaxed">
              When I'm not coding or soldering, you'll find me reading about orbital 
              mechanics, contributing to open-source projects, or mentoring fellow 
              students in their tech journeys.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glow-border rounded-xl p-5 bg-bg-card/50 flex flex-col gap-3"
              >
                <span className="text-accent">{stat.icon}</span>
                <div>
                  <p className="text-text-primary font-semibold text-lg">{stat.value}</p>
                  <p className="text-text-secondary text-sm">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
