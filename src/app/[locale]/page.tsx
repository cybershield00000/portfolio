'use client';

import { useState, useEffect } from 'react';
import { MagneticCursor } from '@/components/MagneticCursor';
import { FloatingNavbar } from '@/components/FloatingNavbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ['hero', 'services', 'skills', 'projects', 'contact'];

  const handleNavClick = (index: number) => {
    setActiveSection(index);
    const el = document.getElementById(sections[index]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = sections.indexOf(id);
          if (index !== -1) setActiveSection(index);
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-black selection:text-white">
      {/* Animated Mesh Gradient Background */}
      <div className="animated-mesh-bg fixed inset-0 z-0 pointer-events-none" />

      {/* Magnetic Cursor */}
      <MagneticCursor />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col gap-32 pb-32 md:gap-48 overflow-x-hidden">
        <div id="hero"><HeroSection /></div>
        <div id="services"><ServicesSection /></div>
        <div id="skills"><SkillsSection /></div>
        <div id="projects"><ProjectsSection /></div>
        <div id="contact"><ContactSection /></div>
      </main>

      {/* Floating Navigation */}
      <FloatingNavbar
        activeSection={activeSection}
        onNavigate={handleNavClick}
      />
    </div>
  );
}
