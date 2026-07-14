import { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';
import AnimatedText from './AnimatedText';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X / Twitter', href: 'https://x.com' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="section-spacing"
      style={{ backgroundColor: 'var(--color-soft-cloud)' }}
    >
      <div className="section-container">
        <AnimatedText
          text="Let's Work Together"
          className="heading-xl"
          style={{ marginBottom: 'var(--space-section)' }}
        />

        <div className="grid md:grid-cols-2" style={{ gap: 'var(--space-section)', maxWidth: '1000px' }}>
          {/* Form */}
          <RevealOnScroll>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              <div>
                <label htmlFor="contact-name" className="body-strong block" style={{ marginBottom: 'var(--space-xs)' }}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 text-fg placeholder-fg-subtle/50 focus:outline-none transition-colors body-md"
                  style={{
                    borderBottom: '1px solid var(--color-hairline)',
                    color: 'var(--color-ink)',
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="body-strong block" style={{ marginBottom: 'var(--space-xs)' }}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 text-fg placeholder-fg-subtle/50 focus:outline-none transition-colors body-md"
                  style={{
                    borderBottom: '1px solid var(--color-hairline)',
                    color: 'var(--color-ink)',
                  }}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="body-strong block" style={{ marginBottom: 'var(--space-xs)' }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 text-fg placeholder-fg-subtle/50 focus:outline-none transition-colors resize-none body-md"
                  style={{
                    borderBottom: '1px solid var(--color-hairline)',
                    color: 'var(--color-ink)',
                  }}
                  placeholder="Tell me about your idea..."
                />
              </div>

              <div style={{ marginTop: 'var(--space-md)' }}>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {submitted ? 'Sent ✓' : 'Send Message'}
                </button>
              </div>
            </form>
          </RevealOnScroll>

          {/* Info */}
          <RevealOnScroll delay={0.1} direction="right">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <p className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>Email</p>
                <a
                  href="mailto:hello@example.com"
                  className="body-md"
                  style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
                  data-cursor="link"
                >
                  hello@example.com
                </a>
              </div>

              <div style={{ marginTop: 'var(--space-section)' }}>
                <p className="body-strong" style={{ marginBottom: 'var(--space-sm)' }}>Find Me Online</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  {socialLinks.map((link, i) => (
                    <span key={link.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="body-md"
                        style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
                        data-cursor="link"
                      >
                        {link.label}
                      </a>
                      {i < socialLinks.length - 1 && (
                        <span className="body-md" style={{ color: 'var(--color-hairline)' }}>/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
