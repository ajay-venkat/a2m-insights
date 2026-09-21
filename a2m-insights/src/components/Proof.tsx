import React from 'react';
import { content } from '../content/content';
import { CheckCircle, MapPin, Clock } from 'lucide-react';
import { TiltCard } from './3d/TiltCard';
import { FadeInDepth } from './3d/FadeInDepth';

export const Proof: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-background border-y border-slate-200 dark:border-borderline" id="work">
      <FadeInDepth className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">Recent Work & Outcomes</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Engineering solutions that drive measurable business results.</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {content.projects.map((project, idx) => (
            <TiltCard key={idx} className="h-full">
              <div className="glass-card overflow-hidden flex flex-col group h-full">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors"></div>
                  <span className="text-slate-500 dark:text-slate-500 font-medium tracking-wide">
                    [{project.imagePlaceholder}]
                  </span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{project.sector}</p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center"><MapPin size={14} className="mr-1" /> {project.city}</span>
                    <span className="flex items-center"><Clock size={14} className="mr-1" /> {project.deliveryTime}</span>
                  </div>

                  <div className="mt-auto">
                    <ul className="space-y-2">
                      {project.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle size={16} className="text-success mt-0.5 mr-2 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-200 dark:border-borderline">
          {content.testimonials.map((test, idx) => (
            <TiltCard key={idx} className="h-full">
              <div className="glass-panel p-6 rounded-2xl relative h-full">
                <div className="text-accent opacity-20 absolute top-4 right-6 text-6xl font-serif leading-none">"</div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-6 relative z-10 leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold mr-3">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{test.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{test.business}, {test.city}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </FadeInDepth>
    </section>
  );
};
