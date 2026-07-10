import { motion, useReducedMotion } from 'framer-motion';

/**
 * RevealOnScroll — Wrapper that fades+slides children when they enter viewport.
 * @param {React.ReactNode} children
 * @param {'up' | 'down' | 'left' | 'right'} direction
 * @param {number} delay - Delay in seconds
 * @param {number} duration - Duration in seconds
 * @param {boolean} once - Only trigger once
 * @param {string} className
 */
export default function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  once = true,
  className = '',
  amount = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion();

  const directionMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  const offset = directionMap[direction] || directionMap.up;

  const variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, ...offset },
    visible: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
