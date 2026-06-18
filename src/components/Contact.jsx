import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="floating-card contact-card reveal">
          <span className="section-label">[ Contact ]</span>

          <div className="contact-statement">
            <h2 className="contact-headline">
              Let's build something{' '}
              <span className="serif-accent">remarkable</span> together.
            </h2>
            <p className="contact-desc">
              I'm currently open to new opportunities, collaborations, and discussions
              around engineering and tech communities. Whether you have a question or
              just want to say hi, feel free to reach out.
            </p>
          </div>

          <div className="contact-actions">
            <a href="mailto:ajhaj@example.com" className="btn btn-pill contact-cta">
              <span>Email Me</span>
              <span className="btn-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
            <a href="https://github.com/ajhaj" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              GitHub
            </a>
            <a href="https://linkedin.com/in/ajhaj" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              LinkedIn
            </a>
          </div>

          <div className="contact-status">
            <span className="contact-status-dot"></span>
            <span className="contact-status-text">Available for opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
