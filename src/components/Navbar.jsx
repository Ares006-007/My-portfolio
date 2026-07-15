import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Library', href: '#library' },
  { label: 'Projects', href: '#projects' },
  { label: 'Events', href: '#hackathons' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section for 2px underline indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: '56px',
        backgroundColor: scrolled ? 'var(--color-canvas)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-hairline-soft)' : 'none',
      }}
    >
      <div className="section-container flex items-center justify-between h-full">
        {/* Logo */}
        <a
          href="#home"
          className="body-strong"
          style={{
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: scrolled ? 'var(--color-ink)' : 'var(--color-on-primary)',
            textDecoration: 'none',
          }}
          data-cursor="link"
        >
          SMA
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center" style={{ gap: 'var(--space-xxl)' }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="body-strong"
                style={{
                  color: scrolled ? 'var(--color-ink)' : 'var(--color-on-primary)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '4px',
                }}
                data-cursor="link"
              >
                {link.label}
                {/* 2px active underline — the system's nav indicator */}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="navActiveIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: scrolled ? 'var(--color-ink)' : 'var(--color-on-primary)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden caption-sm"
          style={{
            color: scrolled ? 'var(--color-ink)' : 'var(--color-on-primary)',
            background: 'none',
            border: 'none',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
          data-cursor="action"
          aria-label="Toggle menu"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile drawer — full-height from left */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              top: '56px',
              left: 0,
              bottom: 0,
              width: '100%',
              backgroundColor: 'var(--color-canvas)',
              zIndex: 40,
            }}
          >
            <ul className="section-container flex flex-col" style={{ paddingTop: 'var(--space-section)' }}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  style={{
                    borderBottom: '1px solid var(--color-hairline-soft)',
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="heading-lg"
                    style={{
                      color: 'var(--color-ink)',
                      textDecoration: 'none',
                      display: 'block',
                      padding: 'var(--space-xl) 0',
                    }}
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
