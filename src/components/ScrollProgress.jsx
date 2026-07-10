import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — Thin accent-colored bar fixed at page top showing scroll %.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}
