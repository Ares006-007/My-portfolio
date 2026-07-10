import { useState } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiSend } from 'react-icons/fi';

const socialLinks = [
  { icon: <FiGithub size={20} />, label: 'GitHub', href: 'https://github.com' },
  { icon: <FiLinkedin size={20} />, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: <FiTwitter size={20} />, label: 'X / Twitter', href: 'https://x.com' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formspree / Netlify Forms integration point
    // For now, show success state
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative">
      <hr className="gradient-divider" />
      <div className="section-wrapper">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">Let's build something amazing together</p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-text-secondary text-sm mb-2">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-text-secondary text-sm mb-2">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-text-secondary text-sm mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border text-text-primary placeholder-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors text-sm resize-none"
                placeholder="Tell me about your idea..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent text-bg-primary font-semibold rounded-lg hover:bg-accent-dim transition-colors duration-200 flex items-center justify-center gap-2 text-sm tracking-wide uppercase cursor-pointer"
            >
              {submitted ? (
                'Message Sent! ✓'
              ) : (
                <>
                  <FiSend size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Info & Social */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3
                  className="text-accent text-sm font-semibold tracking-widest uppercase mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Get in Touch
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, 
                  or opportunities to be part of something exciting. Feel free 
                  to reach out!
                </p>
              </div>

              <div>
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-dim transition-colors"
                >
                  <FiMail size={18} />
                  <span className="text-sm">hello@example.com</span>
                </a>
              </div>

              <div>
                <h3
                  className="text-accent text-sm font-semibold tracking-widest uppercase mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Find Me Online
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="w-10 h-10 rounded-lg bg-bg-card border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
