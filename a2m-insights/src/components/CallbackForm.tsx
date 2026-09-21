import React, { useState } from 'react';
import { Send, Clock, Loader2 } from 'lucide-react';
import { config } from '../config';
import { FadeInDepth } from './3d/FadeInDepth';

export const CallbackForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', timeSlot: '', requirement: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Trigger WhatsApp
      const text = `Hi A2M, I'm ${formData.name}. I'd like a callback at ${formData.timeSlot}. Requirement: ${formData.requirement}`;
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/${config.PHONE_WHATSAPP.replace(/[^0-9]/g, '')}?text=${encodedText}`, '_blank');
      
    }, 800);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="callback">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-success/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
      
      <FadeInDepth className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-6 text-sm font-medium">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span>100% Free Discovery</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Not sure where to start? Let's discuss it.
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-lg">
              Book a free 30-minute consultation with our lead engineer. We'll outline technical feasibility, suggest a stack, and give you a transparent cost estimate.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center text-slate-300">
                <Clock size={20} className="text-success mr-3" />
                <span>Response time: Usually within 2 hours</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
            {success ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} className="text-success" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
                <p className="text-slate-400 mb-6">Opening WhatsApp to confirm your details...</p>
                <button onClick={() => setSuccess(false)} className="text-accent hover:text-white transition-colors text-sm font-medium">
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="block w-full rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:ring-accent focus:border-accent py-2.5 px-4" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="block w-full rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:ring-accent focus:border-accent py-2.5 px-4" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Preferred Time</label>
                    <select required value={formData.timeSlot} onChange={e => setFormData({...formData, timeSlot: e.target.value})} className="block w-full rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:ring-accent focus:border-accent py-2.5 px-4">
                      <option value="">Select a slot...</option>
                      <option value="Morning (10AM - 1PM)">Morning (10AM - 1PM)</option>
                      <option value="Afternoon (2PM - 5PM)">Afternoon (2PM - 5PM)</option>
                      <option value="Evening (6PM - 8PM)">Evening (6PM - 8PM)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Brief Requirement (1-2 lines)</label>
                  <input type="text" required value={formData.requirement} onChange={e => setFormData({...formData, requirement: e.target.value})} placeholder="e.g. Need an e-commerce site for my clothing brand" className="block w-full rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:ring-accent focus:border-accent py-2.5 px-4" />
                </div>
                
                <button type="submit" disabled={isSubmitting} className="w-full bg-success hover:bg-green-600 text-white py-3.5 rounded-lg font-bold transition-all mt-4 flex items-center justify-center">
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin mr-2" /> Requesting...</> : 'Request Free Callback'}
                </button>
              </form>
            )}
          </div>
          
        </div>
        
      </FadeInDepth>
    </section>
  );
};
