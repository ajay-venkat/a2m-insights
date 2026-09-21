import React, { useState } from 'react';
import { content } from '../content/content';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FadeInDepth } from './3d/FadeInDepth';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-background border-t border-slate-200 dark:border-borderline" id="faq">
      <FadeInDepth className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you need to know about our process and pricing.</p>
        </div>

        <div className="space-y-4">
          {content.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-accent/30 shadow-md' : ''}`}
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="font-semibold text-left text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <span className="text-slate-400 flex-shrink-0">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                
                <div 
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-borderline pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </FadeInDepth>
    </section>
  );
};
