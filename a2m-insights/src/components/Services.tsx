import React, { useState } from 'react';
import { packages, type ServiceCategory } from '../content/packages';
import { Check, PhoneCall, LayoutTemplate, MessageSquareShare, CreditCard, ShoppingCart, CalendarCheck, Code, Cpu, Zap, FileText, BookOpen, FileEdit, AlignLeft, ShieldCheck, Send, Image as ImageIcon, Share2, Server, UserPlus } from 'lucide-react';
import { TiltCard } from './3d/TiltCard';
import { FadeInDepth } from './3d/FadeInDepth';

const iconMap: Record<string, React.ElementType> = {
  PhoneCall, LayoutTemplate, MessageSquareShare, CreditCard, ShoppingCart, CalendarCheck, Code,
  Cpu, Zap, FileText, BookOpen, FileEdit, AlignLeft, ShieldCheck, Send, ImageIcon, Share2, Server, UserPlus
};

const CATEGORIES: ServiceCategory[] = [
  'Web & App Development',
  'Data & AI',
  'Cloud & Security',
  'Student Projects',
  'Research Papers',
  'Marketing & Management',
  'Combo Deals'
];

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Web & App Development');

  const filteredPackages = packages.filter(pkg => pkg.category === activeCategory);

  return (
    <section className="py-24 bg-slate-50 dark:bg-background relative" id="services">
      <FadeInDepth className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">Service Catalog</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Transparent pricing. No hidden fees. Select a category below to explore our offerings.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105' 
                  : 'bg-white dark:bg-panel text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-borderline hover:border-accent/50 hover:text-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Category Specific Trust Notes */}
        {activeCategory === 'Student Projects' && (
          <div className="mb-10 p-4 bg-success/10 border border-success/30 rounded-xl text-center max-w-4xl mx-auto text-success-light dark:text-success flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 mr-3 flex-shrink-0" />
            <p className="font-medium">Original, non-resold work — one project is built for one student/team only. We do not deliver the same project to multiple colleges.</p>
          </div>
        )}
        {activeCategory === 'Research Papers' && (
          <div className="mb-10 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center max-w-4xl mx-auto text-amber-700 dark:text-amber-500 flex items-start sm:items-center justify-center">
            <ShieldCheck className="w-5 h-5 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
            <p className="font-medium text-sm sm:text-base text-left sm:text-center">A2M Insights helps structure, format and polish papers based on your own research/data. We do not fabricate research findings or guarantee acceptance.</p>
          </div>
        )}

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const Icon = (pkg.iconName && pkg.iconName in iconMap) ? iconMap[pkg.iconName as keyof typeof iconMap] : Code;
            
            return (
              <TiltCard key={pkg.id} className="h-full">
                <div 
                  className={`glass-card p-8 flex flex-col relative h-full ${pkg.popular ? 'border-accent shadow-[0_0_20px_rgba(47,107,255,0.1)]' : ''}`}
                >
                {pkg.popular && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-xl ${pkg.popular ? 'bg-accent/10 text-accent' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{pkg.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{pkg.subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 min-h-[40px]">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-borderline">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">
                    {pkg.billingModel === 'monthly_retainer' ? 'Monthly Retainer' : pkg.billingModel === 'single_payment' ? 'Single Payment' : pkg.billingModel === 'mixed_bundle' ? 'Mixed Bundle' : pkg.billingModel === 'free' ? 'Free Service' : 'Starting From'}
                  </p>
                  <div className="flex items-baseline text-slate-900 dark:text-white">
                    {pkg.billingModel === 'free' ? (
                      <span className="text-3xl font-extrabold tracking-tight">₹0</span>
                    ) : pkg.isCustom ? (
                      <>
                        <span className="text-lg font-bold mr-1">₹</span>
                        <span className="text-3xl font-extrabold tracking-tight">{pkg.tiers[0].price.toLocaleString()}</span>
                        <span className="text-sm text-slate-500 ml-2 font-medium">minimum</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg font-bold mr-1">₹</span>
                        <span className="text-3xl font-extrabold tracking-tight">
                          {pkg.tiers[0].price.toLocaleString()}
                          {pkg.tiers[0].maxPrice ? ` - ${pkg.tiers[0].maxPrice.toLocaleString()}` : ''}
                        </span>
                        {pkg.tiers[0].originalPrice && (
                          <span className="ml-3 text-lg text-slate-400 line-through font-medium">
                            ₹{pkg.tiers[0].originalPrice.toLocaleString()}
                          </span>
                        )}
                        {pkg.billingModel === 'monthly_retainer' && <span className="text-sm text-slate-500 ml-1 font-medium">/mo</span>}
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                      <Check size={18} className="text-success mt-0.5 mr-3 flex-shrink-0" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href={pkg.billingModel === 'free' ? '#callback' : '#payment'} 
                  className={`btn-3d w-full text-center py-3 px-4 rounded-xl font-bold transition-all ${
                    pkg.popular 
                      ? 'bg-accent hover:bg-blue-700 text-white shadow-md shadow-accent/20' 
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                  }`}
                  onClick={() => {
                    // Quick and dirty way to set package if hash routing works
                    if (pkg.billingModel !== 'free') {
                      setTimeout(() => {
                        const event = new CustomEvent('selectPackage', { detail: pkg.id });
                        window.dispatchEvent(event);
                      }, 100);
                    }
                  }}
                >
                  {pkg.billingModel === 'free' ? 'Book Free Slot' : 'Select Package'}
                </a>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </FadeInDepth>
    </section>
  );
};
