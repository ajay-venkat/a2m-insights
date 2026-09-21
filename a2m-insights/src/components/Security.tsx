import React from 'react';
import { ShieldCheck, Lock, Code, RefreshCcw } from 'lucide-react';
import { config } from '../config';
import { FadeInDepth } from './3d/FadeInDepth';

export const Security: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-panel border-y border-slate-200 dark:border-borderline" id="trust">
      <FadeInDepth className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-6">
              Trust & Security First
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              We understand that commissioning a custom software project requires trust. That's why we've built our entire engagement model around transparency and risk reduction.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-success/10 p-2 rounded-lg mr-4 mt-1">
                  <RefreshCcw size={20} className="text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">The {config.ADVANCE_PERCENT}/{config.BALANCE_PERCENT} Milestone Model</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    You only pay the {config.ADVANCE_PERCENT}% advance to start. The remaining {config.BALANCE_PERCENT}% is due ONLY when the project is ready for handover and you are fully satisfied.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-2 rounded-lg mr-4 mt-1">
                  <Lock size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Bank-Grade Payments</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    All transactions are routed through PCI-DSS compliant gateways. We do not store any sensitive card or UPI details on our servers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-success/10 p-2 rounded-lg mr-4 mt-1">
                  <Code size={20} className="text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">100% Code IP Transfer</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Upon final payment, the entire codebase, assets, and intellectual property are transferred to your ownership. No vendor lock-in.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 text-slate-100 dark:text-slate-800 opacity-50">
              <ShieldCheck size={200} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Refund Policy</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                If we determine during the discovery phase that we cannot fulfill your requirements, your {config.ADVANCE_PERCENT}% advance is refunded instantly, no questions asked.
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-borderline">
                <p className="font-medium text-slate-900 dark:text-white mb-2 text-sm">Secure Checkout includes:</p>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400 mt-4">
                  <span className="flex items-center"><ShieldCheck size={14} className="text-success mr-2" /> Signature Verification</span>
                  <span className="flex items-center"><ShieldCheck size={14} className="text-success mr-2" /> SSL Encrypted</span>
                  <span className="flex items-center"><ShieldCheck size={14} className="text-success mr-2" /> Anti-tampering</span>
                  <span className="flex items-center"><ShieldCheck size={14} className="text-success mr-2" /> Rate Limited</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </FadeInDepth>
    </section>
  );
};
