import React from 'react';
import { Mail } from 'lucide-react';
import './Contact.css';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="section container">
      <div className="contact-wrapper">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-desc">
          I'm currently open to new opportunities, collaborations, and discussions around engineering and tech communities. Whether you have a question or just want to say hi, feel free to reach out.
        </p>
        <div className="contact-links">
          <a href="mailto:ajhaj@example.com" className="btn btn-secondary contact-btn">
            <Mail className="icon" size={20} /> Email Me
          </a>
          <a href="https://github.com/ajhaj" target="_blank" rel="noopener noreferrer" className="btn btn-secondary contact-btn">
            <GithubIcon /> GitHub
          </a>
          <a href="https://linkedin.com/in/ajhaj" target="_blank" rel="noopener noreferrer" className="btn btn-secondary contact-btn">
            <LinkedinIcon /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
