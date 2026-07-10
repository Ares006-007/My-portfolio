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
    <footer className="border-t border-border">
      <div className="section-container py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Copyright */}
          <p className="label text-fg-subtle">
            © {currentYear} Shaik Mohammad Ajhaj
          </p>

          {/* Nav links */}
          <ul className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="label text-fg-subtle hover:text-fg transition-colors duration-300"
                  data-cursor="link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Back to top */}
          <a
            href="#home"
            className="label text-fg-subtle hover:text-fg transition-colors duration-300"
            data-cursor="link"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
