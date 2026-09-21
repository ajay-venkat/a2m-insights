import React, { useRef, useState, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max ±6 deg
    const rotateY = ((x - centerX) / centerX) * 6;  // Max ±6 deg

    // Highlight tracking pointer
    const highlightX = (x / rect.width) * 100;
    const highlightY = (y / rect.height) * 100;

    requestAnimationFrame(() => {
      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        background: `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)`,
        boxShadow: `${-rotateY}px ${rotateX + 10}px 30px -10px rgba(0, 0, 0, 0.4)`,
        transition: 'none' // Remove transition for smooth tracking
      });
    });
  };

  const handleMouseEnter = () => {};

  const handleMouseLeave = () => {
    if (!isReducedMotion) {
      requestAnimationFrame(() => {
        setStyle({
          transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)',
          background: 'transparent',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.5s ease, box-shadow 0.5s ease, background 0.5s ease' // Smooth return
        });
      });
    }
  };

  // Touch fallback (lift only)
  const handleTouchStart = () => {
    if (isReducedMotion) return;
    setStyle({
      transform: 'translateZ(10px)',
      boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.6)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    });
  };

  const handleTouchEnd = () => {
    if (isReducedMotion) return;
    setStyle({
      transform: 'translateZ(0)',
      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    });
  };

  return (
    <div
      ref={cardRef}
      className={`preserve-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={style}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
