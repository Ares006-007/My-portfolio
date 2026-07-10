import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Events', href: '#hackathons' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-border bg-bg/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-20">
        {/* Logo */}
        <MagneticButton strength={0.2}>
          <a
            href="#home"
            className="text-sm font-bold tracking-[0.2em] uppercase text-fg"
            data-cursor="link"
          >
            SMA
          </a>
        </MagneticButton>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <MagneticButton strength={0.25}>
                <a
                  href={link.href}
                  className="label text-fg-muted hover:text-fg transition-colors duration-300 relative group"
                  data-cursor="link"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-fg group-hover:w-full transition-all duration-300" />
                </a>
              </MagneticButton>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden label text-fg-muted hover:text-fg transition-colors"
          data-cursor="action"
          aria-label="Toggle menu"
        >
          {isOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden border-b border-border bg-bg"
          >
            <ul className="section-container py-8 space-y-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="heading-md text-fg-muted hover:text-fg transition-colors block"
                    data-cursor="link"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
