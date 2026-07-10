const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Events', href: '#hackathons' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fg text-bg py-20 relative overflow-hidden">
      {/* Subtle texture for footer */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bg via-transparent to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Brand & Copyright */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-xl font-bold tracking-[0.2em] uppercase mb-4 text-bg">
                SMA
              </p>
              <p className="text-bg/60 text-sm max-w-xs leading-relaxed">
                Building at the intersection of space technology, hardware, and artificial intelligence.
              </p>
            </div>
            <p className="text-bg/40 text-xs mt-12 md:mt-0 font-mono">
              © {currentYear} Shaik Mohammad Ajhaj
            </p>
          </div>

          {/* Nav links */}
          <div className="md:col-span-4">
            <p className="text-bg/50 text-xs uppercase tracking-widest mb-6 font-mono">
              Navigation
            </p>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-bg/80 hover:text-highlight transition-colors duration-300 text-sm"
                    data-cursor="link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Top */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-bg/50 text-xs uppercase tracking-widest mb-6 font-mono">
                Connect
              </p>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-bg/80 hover:text-highlight transition-colors duration-300 text-sm" data-cursor="link">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-bg/80 hover:text-highlight transition-colors duration-300 text-sm" data-cursor="link">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            
            <a
              href="#home"
              className="text-bg/40 hover:text-bg transition-colors duration-300 text-xs font-mono mt-12 md:mt-0 flex items-center gap-2 w-fit"
              data-cursor="link"
            >
              Back to Top <span className="text-highlight">↑</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
