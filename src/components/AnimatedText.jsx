import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedText — Splits text into words and reveals each with staggered fade+slide.
 * @param {string} text - The text to animate
 * @param {string} className - CSS classes for the container
 * @param {string} el - HTML element type (default: 'p')
 * @param {number} delay - Initial delay before animation starts
 * @param {boolean} once - Only animate once (default: true)
 * @param {'load' | 'scroll'} trigger - Animate on load or scroll into view
 */
export default function AnimatedText({
  text,
  className = '',
  el: Element = 'p',
  delay = 0,
  once = true,
  trigger = 'scroll',
  staggerDelay = 0.04,
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 30 },
    visible: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
  };

  const motionProps =
    trigger === 'scroll'
      ? {
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once, margin: '-80px' },
        }
      : {
          initial: 'hidden',
          animate: 'visible',
        };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      {...motionProps}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.div>
  );
}
