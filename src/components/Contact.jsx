import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-inner reveal">
          <span className="label">Contact</span>
          <h2 className="contact-headline">
            Want to talk? I'm easy to reach.
          </h2>
          <p className="contact-desc">
            If you're working on something interesting, running an event, or just want to have a conversation — I'd like to hear about it.
          </p>

          <div className="contact-actions">
            <a href="mailto:ajhaj@example.com" className="btn btn-primary">
              Email me
            </a>
            <a href="https://github.com/Ares006-007" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              GitHub
            </a>
            <a href="https://linkedin.com/in/ajhaj" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
