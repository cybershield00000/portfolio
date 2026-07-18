'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

import { CursorTrail } from './CursorTrail';

export function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Snappy tracking
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  useEffect(() => {
    const handleFirstMove = () => {
      setIsVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      // Hover effect on any interactive element
      if (target.closest('button') || target.closest('a') || target.closest('[data-magnetic]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleFirstMove);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <CursorTrail />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 border-solid"
        style={{ x: dotX, y: dotY }}
        initial={{
          width: 16,
          height: 16,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(212, 175, 55, 0)',
          borderWidth: 0,
        }}
        animate={{
          width: isHovered ? 64 : 16,
          height: isHovered ? 64 : 16,
          borderRadius: '50%',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
          borderColor: isHovered ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0)',
          borderWidth: isHovered ? 2 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* If we want the mix-blend dot to remain inside the hollow ring */}
        {!isHovered && (
          <div className="w-full h-full rounded-full bg-white mix-blend-difference" />
        )}
      </motion.div>
    </>
  );
}
