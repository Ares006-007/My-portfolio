import { useState, useEffect } from 'react';

const roles = ['Space Engineer', 'Hackathon Organizer', 'AI/ML Developer', 'Hardware Hacker', 'Tech Entrepreneur'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating particles (CSS only) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            bottom: '-10px',
            animationDuration: `${Math.random() * 8 + 6}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Gradient orb glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">
          Welcome to my universe
        </p>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="text-text-primary">Shaik Mohammad</span>
          <br />
          <span className="text-accent">Ajhaj</span>
        </h1>

        <div className="h-8 mb-8">
          <span className="text-xl sm:text-2xl text-text-secondary">
            {displayText}
          </span>
          <span className="typing-cursor" />
        </div>

        <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          18-year-old tech entrepreneur building at the intersection of 
          space engineering, hardware, and artificial intelligence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-accent text-bg-primary font-semibold rounded-lg hover:bg-accent-dim transition-colors duration-200 text-sm tracking-wide uppercase"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-accent text-accent rounded-lg hover:bg-accent-glow transition-colors duration-200 text-sm tracking-wide uppercase"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-text-secondary text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-text-secondary/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
