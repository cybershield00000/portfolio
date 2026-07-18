'use client';

import { useEffect, useRef } from 'react';

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: { x: number; y: number; age: number }[] = [];
    let animationFrameId: number;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    const onMouseMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update points age
      for (let i = 0; i < points.length; i++) {
        points[i].age += 1;
      }
      
      // Remove old points (lasts about 1 second at 60fps)
      const maxAge = 60;
      points = points.filter(p => p.age < maxAge);

      // Draw the trail
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p = points[i];
          const prev = points[i - 1];
          const life = 1 - p.age / maxAge; // 1 (new) to 0 (old)
          
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          // Premium golden ink color
          ctx.strokeStyle = `rgba(212, 175, 55, ${life * 0.8})`;
          // Line gets thinner as it fades
          ctx.lineWidth = life * 8;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none fixed inset-0 z-[9998]" 
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
