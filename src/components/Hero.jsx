import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative"
    >
      <div className="section-container py-32 md:py-0">
        {/* Label */}
        <motion.p
          className="label mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Portfolio — 2026
        </motion.p>

        {/* Main heading — staggered word reveal */}
        <AnimatedText
          text="Shaik Mohammad"
          className="heading-xl"
          trigger="load"
          delay={0.4}
          staggerDelay={0.06}
        />
        <AnimatedText
          text="Ajhaj"
          className="heading-xl text-accent mt-1"
          trigger="load"
          delay={0.7}
          staggerDelay={0.06}
        />

        {/* Subtitle */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="label">Tech Entrepreneur</span>
          <span className="hidden sm:inline text-fg-subtle mx-4">/</span>
          <span className="label">Space Engineer</span>
          <span className="hidden sm:inline text-fg-subtle mx-4">/</span>
          <span className="label">AI Developer</span>
        </motion.div>

        {/* Divider */}
        <motion.hr
          className="divider mt-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Bottom row — description + scroll */}
        <motion.div
          className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <p className="text-fg-muted text-base max-w-md leading-relaxed">
            18-year-old tech entrepreneur building at the intersection of
            space engineering, hardware, and artificial intelligence.
          </p>
          <div className="flex items-center gap-3 text-fg-subtle">
            <span className="label">Scroll</span>
            <motion.span
              className="text-lg"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
