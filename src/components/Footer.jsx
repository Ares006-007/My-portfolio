const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Top accent border */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#home"
            className="text-lg font-bold tracking-wider text-accent"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            &lt;SMA /&gt;
          </a>

          {/* Nav links */}
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-text-secondary text-sm hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p className="text-text-secondary text-sm">
            © {currentYear} SMA
          </p>
        </div>
      </div>
    </footer>
  );
}
