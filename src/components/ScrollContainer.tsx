'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollContainerProps {
  children: ReactNode[];
  activeSection: number;
  onSectionChange: (index: number) => void;
}

export function ScrollContainer({ children, activeSection, onSectionChange }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Sync external navigation (Navbar clicks) via custom event
  useEffect(() => {
    const handleForceScroll = (e: Event) => {
      const index = (e as CustomEvent).detail;
      const section = sectionsRef.current[index];
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    
    window.addEventListener('force-scroll', handleForceScroll);
    return () => window.removeEventListener('force-scroll', handleForceScroll);
  }, []);

  // Update active section natively on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index) && index !== activeSection) {
              onSectionChange(index);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5, // Requires at least 50% visibility to count as active
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activeSection, onSectionChange]);

  return (
    <div 
      ref={containerRef} 
      className="scroll-container w-full h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth"
    >
      {children.map((child, index) => (
        <section 
          key={index} 
          ref={(el) => { sectionsRef.current[index] = el; }}
          data-index={index}
          className="w-full h-[100dvh] snap-center flex items-center justify-center relative"
        >
          <motion.div
            className="w-full h-full flex items-center justify-center will-change-transform"
            initial={false}
            animate={{ 
              scale: activeSection === index ? 1 : 0.85, 
              opacity: activeSection === index ? 1 : 0.2, 
              filter: activeSection === index ? 'blur(0px)' : 'blur(10px)' 
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 0.8 }}
          >
            {child}
          </motion.div>
        </section>
      ))}
    </div>
  );
}
