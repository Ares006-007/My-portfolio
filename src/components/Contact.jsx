import { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';

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
    <section id="contact" className="section-spacing bg-bg-alt">
      <div className="section-container">
        {/* Section label */}
        <RevealOnScroll>
          <p className="label mb-10">05 — Contact</p>
        </RevealOnScroll>

        <AnimatedText
          text="Let's Work Together"
          className="heading-lg mb-20"
        />

        <div className="grid md:grid-cols-2 gap-20 max-w-4xl">
          {/* Form */}
          <RevealOnScroll>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label htmlFor="contact-name" className="label block mb-3">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-dark py-3 text-fg placeholder-fg-subtle/50 focus:border-fg focus:outline-none transition-colors text-sm"
                  placeholder="Your name"
                  data-cursor="action"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="label block mb-3">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-dark py-3 text-fg placeholder-fg-subtle/50 focus:border-fg focus:outline-none transition-colors text-sm"
                  placeholder="you@example.com"
                  data-cursor="action"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="label block mb-3">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-dark py-3 text-fg placeholder-fg-subtle/50 focus:border-fg focus:outline-none transition-colors text-sm resize-none"
                  placeholder="Tell me about your idea..."
                  data-cursor="action"
                />
              </div>

              <MagneticButton strength={0.15}>
                <button
                  type="submit"
                  className="label py-4 px-10 border border-fg text-fg hover:bg-fg hover:text-bg transition-colors duration-300 cursor-pointer"
                  data-cursor="action"
                >
                  {submitted ? 'Sent ✓' : 'Send Message'}
                </button>
              </MagneticButton>
            </form>
          </RevealOnScroll>

          {/* Info */}
          <RevealOnScroll delay={0.15} direction="right">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="label mb-4">Email</p>
                <a
                  href="mailto:hello@example.com"
                  className="text-fg-muted text-sm hover:text-fg transition-colors"
                  data-cursor="link"
                >
                  hello@example.com
                </a>
              </div>

              <div className="mt-12">
                <p className="label mb-6">Find Me Online</p>
                <div className="flex items-center gap-2">
                  {socialLinks.map((link, i) => (
                    <span key={link.label} className="flex items-center gap-2">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg-muted text-sm hover:text-fg transition-colors duration-300"
                        data-cursor="link"
                      >
                        {link.label}
                      </a>
                      {i < socialLinks.length - 1 && (
                        <span className="text-fg-subtle text-sm">/</span>
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
