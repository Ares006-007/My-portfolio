import { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* Scroll detection for navbar background */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Intersection Observer scroll-spy */
  useEffect(() => {
    const sections = navLinks.map(l => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          className="font-[var(--font-heading)] text-lg font-bold tracking-wider text-accent hover:opacity-80 transition-opacity"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          &lt;SMA /&gt;
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-accent bg-accent-glow'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-primary p-2 hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="glass border-t border-border px-6 py-4 space-y-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-accent bg-accent-glow'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
