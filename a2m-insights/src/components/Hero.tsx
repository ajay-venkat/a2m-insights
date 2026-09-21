import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Code, ShieldCheck, Clock, Zap } from 'lucide-react';
import { content } from '../content/content';
import { TiltCard } from './3d/TiltCard';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
    
    // Fallback variable to store mouse position immediately for requestAnimationFrame to pick up
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      currentX = (e.clientX / window.innerWidth - 0.5) * 2;
      currentY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        currentX = Math.max(-1, Math.min(1, e.gamma / 45)); // gamma: left to right
        currentY = Math.max(-1, Math.min(1, (e.beta - 45) / 45)); // beta: front back tilt
      }
    };

    const updateParallax = () => {
      setMousePos(prev => ({
        x: prev.x + (currentX - prev.x) * 0.1, // easing
        y: prev.y + (currentY - prev.y) * 0.1
      }));
      requestRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    requestRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isReducedMotion]);

  // Initial text lift animation classes
  const textLiftClass = isReducedMotion ? '' : 'animate-[lift_0.8s_ease-out_forwards] opacity-0 translate-y-4';

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden preserve-3d" style={{ perspective: '1000px' }}>
      
      {/* Animated Constellation Background - 3 Depth Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Far Layer (Slow) */}
        <div 
          className="absolute top-0 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30 constellation-bg"
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) translateZ(-100px)` }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stars-far" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                <circle fill="currentColor" cx="30" cy="30" r="1" className="text-slate-400 dark:text-slate-700"></circle>
                <circle fill="currentColor" cx="120" cy="80" r="0.5" className="text-slate-400 dark:text-slate-800"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stars-far)"></rect>
          </svg>
        </div>

        {/* Mid Layer */}
        <div 
          className="absolute top-0 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 opacity-30 dark:opacity-40 constellation-bg"
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) translateZ(-50px)` }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stars-mid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle fill="currentColor" cx="20" cy="20" r="1.5" className="text-slate-300 dark:text-slate-600"></circle>
                <circle fill="currentColor" cx="80" cy="50" r="1" className="text-slate-200 dark:text-slate-700"></circle>
                <circle fill="currentColor" cx="40" cy="80" r="2" className="text-slate-300 dark:text-slate-600 opacity-50"></circle>
                <line x1="20" y1="20" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800"></line>
                <line x1="80" y1="50" x2="40" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800"></line>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stars-mid)"></rect>
          </svg>
        </div>

        {/* Near Layer (Fast) */}
        <div 
          className="absolute top-0 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-50"
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -40}px, ${mousePos.y * -40}px) translateZ(0px)` }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="stars-near" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle fill="currentColor" cx="50" cy="150" r="2.5" className="text-accent/30"></circle>
                <circle fill="currentColor" cx="150" cy="50" r="3" className="text-success/20"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stars-near)"></rect>
          </svg>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 preserve-3d">
        
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center preserve-3d">
          
          <div className={`inline-flex items-center space-x-2 bg-white/80 dark:bg-panel/80 backdrop-blur-sm border border-slate-200 dark:border-borderline px-4 py-1.5 rounded-full mb-8 text-sm font-medium text-slate-800 dark:text-slate-200 shadow-sm ${textLiftClass}`} style={{ animationDelay: '0ms' }}>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span>{content.hero.eyebrow}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-8 leading-[1.1] preserve-3d">
            <span className={`text-slate-900 dark:text-white inline-block ${textLiftClass}`} style={{ animationDelay: '100ms' }}>
              {content.hero.h1_start}
            </span>
            <span className={`text-gradient block mt-2 ${textLiftClass}`} style={{ animationDelay: '200ms' }}>
              {content.hero.h1_highlight}
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed ${textLiftClass}`} style={{ animationDelay: '300ms' }}>
            {content.hero.subtitle}
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 ${textLiftClass}`} style={{ animationDelay: '400ms' }}>
            <a href="#payment" className="btn-3d w-full sm:w-auto bg-accent hover:bg-blue-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center justify-center space-x-2">
              <span>Calculate Budget & Book</span>
              <ArrowRight size={18} />
            </a>
            <a href="#callback" className="btn-3d w-full sm:w-auto bg-success hover:bg-green-600 text-white px-8 py-4 rounded-full text-base font-semibold transition-all">
              Free Call Back (₹0)
            </a>
            <a href="#custom-scope" className="btn-3d w-full sm:w-auto bg-white/70 dark:bg-panel/70 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white px-8 py-4 rounded-full text-base font-semibold transition-all text-center border border-slate-200 dark:border-borderline shadow-sm">
              Custom Scope Project
            </a>
          </div>
        </div>

        {/* Abstract 3D Object (Pure CSS) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full pointer-events-none -z-10 preserve-3d hidden md:block">
          <div 
            className="w-full h-full preserve-3d transition-transform duration-75 ease-out"
            style={{ transform: `rotateX(${20 + mousePos.y * 10}deg) rotateY(${mousePos.x * 15}deg) translateZ(-200px)` }}
          >
            {/* Panel 1 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-accent/5 dark:bg-accent/10 backdrop-blur-[2px] border border-accent/20 rounded-2xl" style={{ transform: 'translateZ(0px) rotate(-5deg)' }}></div>
            {/* Panel 2 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-56 bg-success/5 dark:bg-success/10 backdrop-blur-[4px] border border-success/20 rounded-2xl" style={{ transform: 'translateZ(50px) rotate(3deg)' }}></div>
            {/* Panel 3 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-72 bg-purple-500/5 dark:bg-purple-500/10 backdrop-blur-[8px] border border-purple-500/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)]" style={{ transform: 'translateZ(100px) rotate(-2deg)' }}></div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className={`mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${textLiftClass}`} style={{ animationDelay: '500ms' }}>
          {content.trustStrip.map((item, index) => {
            const icons = [<ShieldCheck size={24} className="text-accent" />, <Zap size={24} className="text-success" />, <Clock size={24} className="text-accent" />, <Code size={24} className="text-success" />];
            return (
              <TiltCard key={index} className="h-full">
                <div className="glass-card p-6 flex flex-col items-center text-center h-full">
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl mb-4 transform transition-transform duration-500 hover:scale-110">
                    {icons[index]}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
      
      {/* Global CSS for Lift animation */}
      <style>{`
        @keyframes lift {
          0% { opacity: 0; transform: translateY(40px) translateZ(-50px) rotateX(10deg); }
          100% { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0deg); }
        }
      `}</style>
    </section>
  );
};
