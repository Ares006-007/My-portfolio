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
          className="label mb-16 text-highlight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Portfolio — 2026
        </motion.p>

        {/* Main heading — elegant layout */}
        <div className="max-w-4xl">
          <AnimatedText
            text="Shaik Mohammad"
            className="heading-xl"
            trigger="load"
            delay={0.4}
            staggerDelay={0.06}
          />
          <AnimatedText
            text="Ajhaj."
            className="heading-xl italic mt-2 text-fg-muted"
            trigger="load"
            delay={0.7}
            staggerDelay={0.06}
          />
        </div>

        {/* Subtitle / Roles */}
        <motion.div
          className="mt-20 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="body-lg max-w-lg leading-relaxed">
            A tech entrepreneur and engineering student building at the intersection of
            space technology, hardware, and artificial intelligence.
          </p>
        </motion.div>

        {/* Bottom row — scroll indicator only, minimal */}
        <motion.div
          className="absolute bottom-16 left-0 right-0 section-container flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="flex items-center gap-4 text-fg-subtle">
            <span className="label">Scroll</span>
            <motion.span
              className="text-sm"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
