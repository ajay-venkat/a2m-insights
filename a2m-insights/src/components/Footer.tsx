import React from 'react';
import { MessageCircle } from 'lucide-react';
import { config } from '../config';
import { content } from '../content/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="font-heading font-bold text-2xl tracking-tight text-white mb-4 inline-block">
              {config.BRAND_NAME}
            </a>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed text-sm">
              {config.BRAND_TAGLINE}. We engineer modern web platforms with a transparent {config.ADVANCE_PERCENT}/{config.BALANCE_PERCENT} milestone structure.
            </p>
            <div className="text-slate-400 text-sm space-y-2">
              <p>{content.footer.address}</p>
              <p>{content.footer.contact}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-slate-400 hover:text-accent transition-colors text-sm">Services</a></li>
              <li><a href="#work" className="text-slate-400 hover:text-accent transition-colors text-sm">Our Work</a></li>
              <li><a href="#payment" className="text-slate-400 hover:text-accent transition-colors text-sm">Payment Engine</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-accent transition-colors text-sm">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/terms" className="text-slate-400 hover:text-accent transition-colors text-sm">Terms of Service</a></li>
              <li><a href="/refund" className="text-slate-400 hover:text-accent transition-colors text-sm">Refund Policy</a></li>
              <li><a href="/privacy" className="text-slate-400 hover:text-accent transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {config.BRAND_NAME}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Engineered with ❤️ in Tamil Nadu.</p>
        </div>
      </div>
    </footer>
  );
};

export const FloatingWhatsApp: React.FC = () => {
  const text = encodeURIComponent(`Hi ${config.BRAND_NAME}, I'm looking at your website and would like some information.`);
  const href = `https://wa.me/${config.PHONE_WHATSAPP.replace(/[^0-9]/g, '')}?text=${text}`;

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pl-0 group-hover:pl-3 font-semibold text-sm">
        Chat with us
      </span>
    </a>
  );
};
