import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import Ballpit from './Ballpit';
import ErrorBoundary from './ErrorBoundary';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background WebGL Layer */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary fallback={<div className="w-full h-full bg-gradient-to-br from-fg via-[#1a1a1a] to-fg" />}>
          <Ballpit
            count={150}
            gravity={0.3}
            friction={0.995}
            wallBounce={0.9}
            maxVelocity={0.1}
            colors={[0x111111, 0x1f3b2d, 0xc8a96b, 0xf7f4ee]}
            ambientColor={0x000000}
            ambientIntensity={1.2}
            lightIntensity={100}
            minSize={0.4}
            maxSize={1.2}
            followCursor={true}
          />
        </ErrorBoundary>
      </div>

      {/* Clean overlay for text readability without washing out the cinematic effect */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Foreground Content */}
      <div className="section-container py-32 md:py-0 relative z-20 pointer-events-none">
        {/* Label */}
        <motion.p
          className="label mb-16 text-bg/90"
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
            className="heading-xl text-bg"
            trigger="load"
            delay={0.4}
            staggerDelay={0.06}
          />
          <AnimatedText
            text="Ajhaj."
            className="heading-xl italic mt-2 text-bg/70"
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
          <p className="body-lg max-w-lg leading-relaxed text-bg/90 font-light">
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
          <div className="flex items-center gap-4 text-bg/80">
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
