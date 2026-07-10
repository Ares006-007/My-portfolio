import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — Makes child element attracted to cursor on hover.
 * The element smoothly shifts toward the mouse position within bounds.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  radius = 100,
  as = 'div',
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    x.set(distX * strength);
    y.set(distY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Component>
  );
}
