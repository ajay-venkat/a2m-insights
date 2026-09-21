import React, { useRef, useState, useEffect } from 'react';

interface FadeInDepthProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

export const FadeInDepth: React.FC<FadeInDepthProps> = ({ 
  children, 
  delay = 0, 
  className = '', 
  threshold = 0.1 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const style: React.CSSProperties = {
    opacity: isVisible || isReducedMotion ? 1 : 0,
    transform: isReducedMotion 
      ? 'none' 
      : (isVisible ? 'translateY(0) translateZ(0)' : 'translateY(40px) translateZ(-50px)'),
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
    willChange: 'opacity, transform',
    transformStyle: 'preserve-3d'
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};
