import React, { useState } from 'react';
import { Menu, X, MessageCircle, Moon, Sun, Laptop } from 'lucide-react';
import { config } from '../config';
import { useTheme } from './ThemeContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing & Payment', href: '#payment' },
    { name: 'Trust & Security', href: '#trust' },
    { name: 'FAQs', href: '#faq' },
  ];

  const waLink = `https://wa.me/${config.PHONE_WHATSAPP.replace(/[^0-9]/g, '')}`;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="font-heading font-bold text-2xl tracking-tight text-gradient">
              {config.BRAND_NAME}
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Theme Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-borderline">
              <button onClick={() => setTheme('light')} className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-white text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`} aria-label="Light mode">
                <Sun size={16} />
              </button>
              <button onClick={() => setTheme('auto')} className={`p-1.5 rounded-full ${theme === 'auto' ? 'bg-white dark:bg-slate-700 text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`} aria-label="System mode">
                <Laptop size={16} />
              </button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-700 text-accent shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`} aria-label="Dark mode">
                <Moon size={16} />
              </button>
            </div>

            {/* Phone Chip */}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-accent transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{config.PHONE_WHATSAPP}</span>
            </a>

            {/* Primary CTA */}
            <a href="#payment" className="bg-accent hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(47,107,255,0.4)]">
              Book / Pay
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <a href="#payment" className="bg-accent hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
              Book / Pay
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-over Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200 dark:border-borderline absolute w-full top-20 left-0 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-borderline last:border-0"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-4 pb-2 px-3 flex justify-between items-center border-b border-slate-100 dark:border-borderline">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Theme</span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-borderline">
                <button onClick={() => setTheme('light')} className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-white text-accent' : 'text-slate-500'}`}>
                  <Sun size={16} />
                </button>
                <button onClick={() => setTheme('auto')} className={`p-1.5 rounded-full ${theme === 'auto' ? 'bg-white dark:bg-slate-700 text-accent' : 'text-slate-500'}`}>
                  <Laptop size={16} />
                </button>
                <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-700 text-accent' : 'text-slate-500'}`}>
                  <Moon size={16} />
                </button>
              </div>
            </div>

            <a href={waLink} target="_blank" rel="noopener noreferrer" className="block px-3 py-4 text-base font-medium text-accent flex items-center space-x-2 mt-2">
              <MessageCircle className="w-5 h-5" />
              <span>{config.PHONE_WHATSAPP}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
