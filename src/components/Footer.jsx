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
    <footer
      style={{
        backgroundColor: 'var(--color-canvas)',
        borderTop: '1px solid var(--color-hairline)',
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      <div className="section-container">
        <div className="grid md:grid-cols-12" style={{ gap: 'var(--space-section)' }}>
          
          {/* Brand & Copyright */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <p className="body-strong" style={{ letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 'var(--space-md)' }}>
                SMA
              </p>
              <p className="body-md" style={{ color: 'var(--color-mute)', maxWidth: '32ch', fontSize: '14px' }}>
                Engineer. Organizer. Mentor.
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-4">
            <p className="body-strong" style={{ marginBottom: 'var(--space-md)' }}>
              Navigation
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="caption-md"
                    style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
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
              <p className="body-strong" style={{ marginBottom: 'var(--space-md)' }}>
                Connect
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="caption-md" style={{ color: 'var(--color-mute)', textDecoration: 'none' }} data-cursor="link">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="caption-md" style={{ color: 'var(--color-mute)', textDecoration: 'none' }} data-cursor="link">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            
          </div>

        </div>

        {/* Fine print row */}
        <div style={{ marginTop: 'var(--space-section)', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--color-hairline)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <p className="utility-xs" style={{ color: 'var(--color-mute)' }}>
              © {currentYear} Shaik Mohammad Ajhaj
            </p>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="caption-md"
              style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
              data-cursor="link"
            >
              Back to Top ↑
            </a>
        </div>
      </div>
    </footer>
  );
}
