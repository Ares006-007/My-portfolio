import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor — Context-aware cursor that reacts to hoverable elements.
 * - Default: small filled dot (mix-blend-mode: difference)
 * - Over [data-cursor="link"]: expanded ring + "View" label
 * - Over [data-cursor="action"]: expanded ring + "Click" label
 * - Hidden on touch devices
 */
export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [cursorState, setCursorState] = useState('default');
  const [label, setLabel] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.3 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorState('expanded');
        setLabel(type === 'action' ? 'Click' : type === 'link' ? 'View' : '');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorState('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  const isExpanded = cursorState === 'expanded';
  const size = isExpanded ? 56 : 0;

  return (
    <>
      <motion.div
        className={`custom-cursor ${isExpanded ? 'expanded' : ''}`}
        style={{
          x: smoothX,
          y: smoothY,
          width: size,
          height: size,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      {label && (
        <motion.span
          className="custom-cursor-label"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {label}
        </motion.span>
      )}
    </>
  );
}
