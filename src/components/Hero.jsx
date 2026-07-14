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
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'var(--color-hairline-soft)' }}>
        <ErrorBoundary fallback={<div className="w-full h-full" style={{ backgroundColor: 'var(--color-soft-cloud)' }} />}>
          <Ballpit
            count={100}
            gravity={0.1}
            friction={0.99}
            wallBounce={0.8}
            maxVelocity={0.05}
            colors={[0x111111, 0x1a1a1a, 0x222222, 0x0a0a0a]}
            ambientColor={0xffffff}
            ambientIntensity={1.0}
            lightIntensity={200}
            minSize={0.3}
            maxSize={1.0}
            followCursor={false}
          />
        </ErrorBoundary>
      </div>

      {/* Foreground Content */}
      <div className="section-container min-h-screen flex flex-col justify-between relative z-20 pointer-events-none"
        style={{ paddingTop: '140px', paddingBottom: '48px' }}
      >
        
        {/* Main Content Block */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Display campaign headline */}
          <div>
            <AnimatedText
              text="Shaik Mohammad"
              className="display-campaign"
              style={{ color: 'var(--color-ink)' }}
              trigger="load"
              delay={0.3}
              staggerDelay={0.05}
            />
            <AnimatedText
              text="Ajhaj"
              className="display-campaign"
              style={{ color: 'var(--color-charcoal)' }}
              trigger="load"
              delay={0.6}
              staggerDelay={0.05}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            className="body-md max-w-lg"
            style={{
              color: 'var(--color-mute)',
              marginTop: 'var(--space-xxl)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Tech entrepreneur and engineering student building at the intersection
            of space technology, hardware, and artificial intelligence.
          </motion.p>

          {/* Single primary CTA */}
          <motion.div
            className="pointer-events-auto"
            style={{ marginTop: 'var(--space-section)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <a href="#projects" className="btn-primary" data-cursor="link">
              View Work
            </a>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          className="flex items-center"
          style={{ gap: 'var(--space-sm)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <span className="caption-sm" style={{ color: 'var(--color-mute)' }}>
            Scroll
          </span>
          <motion.span
            style={{ color: 'var(--color-mute)', fontSize: '14px' }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
