import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="reveal">
          <span className="label">About</span>
          <h2 className="about-headline">
            I like building things that work — in code, in circuits, and sometimes in rooms full of people.
          </h2>
        </div>

        <div className="about-body reveal">
          <p>
            I'm a first-year student in Bengaluru who got into programming through curiosity and hasn't really stopped. My work jumps between writing full-stack web apps, prototyping hardware with ESP32s and Arduinos, and figuring out how to get 200 teenagers into a room to build things together.
          </p>
          <p>
            I'm drawn to mechatronics, automation, and the kind of product thinking where you have to care about the physical thing and the software running it at the same time. I also end up doing a lot of event operations — logistics, sponsorships, the unsexy parts of making a hackathon actually happen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
