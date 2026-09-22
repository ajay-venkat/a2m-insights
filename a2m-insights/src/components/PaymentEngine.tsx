import React, { useState, useEffect } from 'react';
import { packages, webAddOns, studentAddOns } from '../content/packages';
import { validatePromoCode } from '../content/promoCodes';
import { config } from '../config';
import { lookupOrder, type OrderSummary } from '../api';
import { ShieldCheck, Search, Copy, Loader2, IndianRupee } from 'lucide-react';
import QRCode from 'react-qr-code';
import { FadeInDepth } from './3d/FadeInDepth';
import { ReceiptPrinterUI, type ReceiptStage } from './ReceiptPrinterUI';

// Generate a short client-side order ID like A2M-260922-X3K7
const generateOrderId = (): string => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(-2);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  return `A2M-${yy}${mm}${dd}-${suffix}`;
};

export const PaymentEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'advance' | 'balance'>('advance');
  const [selectedPkgId, setSelectedPkgId] = useState<string>('web_app_dev');
  const [selectedTierId, setSelectedTierId] = useState<string>('basic');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customAmount, setCustomAmount] = useState<number>(config.MIN_CUSTOM_BUDGET);
  const [clientDetails, setClientDetails] = useState({ name: '', email: '', phone: '', business: '', notes: '' });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderAmount, setOrderAmount] = useState<number>(0);
  
  const [receiptStage, setReceiptStage] = useState<ReceiptStage>('idle');
  const [now] = useState(() => new Date());

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoResult, setPromoResult] = useState<{ isValid: boolean; discountAmount: (basePrice: number) => number; error?: string }>({ isValid: false, discountAmount: () => 0 });

  useEffect(() => {
    if (receiptStage === "processing") {
      const t = setTimeout(() => setReceiptStage("printing"), 1400);
      return () => clearTimeout(t);
    }
    if (receiptStage === "printing") {
      const t = setTimeout(() => setReceiptStage("complete"), 1900);
      return () => clearTimeout(t);
    }
  }, [receiptStage]);
  
  // Balance Lookup State
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState<OrderSummary | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // Selected Package Info
  const selectedPkg = packages.find(p => p.id === selectedPkgId) || packages[0];
  const billingModel = selectedPkg.billingModel;
  
  const applicableAddOns = selectedPkg.category === 'Student Projects' ? studentAddOns : selectedPkg.category === 'Web & App Development' ? webAddOns : [];

  // Reset tier and addons when package changes
  useEffect(() => {
    setSelectedTierId(selectedPkg.tiers[0]?.id || '');
    setSelectedAddOns([]);
  }, [selectedPkgId]);

  // Listen to selectPackage events from Services catalog
  useEffect(() => {
    const handleSelect = (e: any) => {
      const pkgId = e.detail;
      const pkg = packages.find(p => p.id === pkgId);
      if (pkg && pkg.billingModel !== 'free') {
        setSelectedPkgId(pkgId);
        setActiveTab('advance'); // Ensure we are on the first tab
      }
    };
    window.addEventListener('selectPackage', handleSelect);
    return () => window.removeEventListener('selectPackage', handleSelect);
  }, []);

  // Compute live price on client
  const computeDisplayPrice = () => {
    if (selectedPkg.isCustom) return customAmount;
    const tier = selectedPkg.tiers.find(t => t.id === selectedTierId);
    let base = tier ? tier.price : 0;
    selectedAddOns.forEach(id => {
      const addon = applicableAddOns.find(a => a.id === id);
      if (addon) base += addon.price;
    });
    return base;
  };

  const handlePromoCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) {
      setPromoResult({ isValid: false, discountAmount: () => 0 });
      return;
    }
    const result = validatePromoCode(promoCodeInput.trim(), selectedPkg.category);
    setPromoResult(result);
  };

  let rawTotal = computeDisplayPrice();
  let discountAmount = 0;
  if (promoResult.isValid) {
    discountAmount = promoResult.discountAmount(rawTotal);
  }
  const displayTotal = Math.max(0, rawTotal - discountAmount);

  let displayAdvance = displayTotal; // Default for single/retainer
  
  if (billingModel === 'milestone_40_60') {
    displayAdvance = Math.floor(displayTotal * (config.ADVANCE_PERCENT / 100));
  } else if (billingModel === 'mixed_bundle') {
    let milestonePart = 0;
    let retainerPart = 0;
    selectedPkg.bundleConfig?.items.forEach(item => {
      const basePkg = packages.find(p => p.id === item.packageId);
      if (basePkg) {
        const baseTier = basePkg.tiers.find(t => t.id === item.tierId);
        if (baseTier) {
          if (basePkg.billingModel === 'monthly_retainer') retainerPart += baseTier.price;
          else milestonePart += baseTier.price;
        }
      }
    });
    const originalPrice = selectedPkg.tiers[0].originalPrice || 1;
    const ratio = displayTotal / originalPrice; // Adjust parts based on any promo discount over the bundle discount
    milestonePart *= ratio;
    retainerPart *= ratio;
    displayAdvance = Math.floor(milestonePart * (config.ADVANCE_PERCENT / 100)) + Math.floor(retainerPart);
  }
  const displayBalance = (billingModel === 'milestone_40_60' || billingModel === 'mixed_bundle') ? displayTotal - displayAdvance : 0;

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert('Please agree to the Terms and Refund Policy.');
    if (selectedPkg.isCustom && customAmount < config.MIN_CUSTOM_BUDGET) return alert(`Minimum budget is ₹${config.MIN_CUSTOM_BUDGET}`);
    
    setIsSubmitting(true);
    try {
      // Generate a client-side order ID and compute amount locally
      const newOrderId = generateOrderId();
      const amountDue = displayAdvance;

      setOrderId(newOrderId);
      setOrderAmount(amountDue);
      setReceiptStage('idle');
    } catch (err: any) {
      console.error("Checkout Error:", err);
      alert(`Error: ${err.message || err || 'Something went wrong'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupId) return;
    setIsLookingUp(true);
    setLookupError('');
    try {
      const result = await lookupOrder(lookupId);
      setLookupResult(result);
    } catch (err: any) {
      setLookupError('Order not found or Invalid ID format.');
      setLookupResult(null);
    } finally {
      setIsLookingUp(false);
    }
  };

  // --------------------------------------------------------------------------------
  // RENDERERS FOR DIFFERENT BILLING MODELS
  // --------------------------------------------------------------------------------

  const renderMilestoneForm = () => (
    <>
      <div className="space-y-4 mb-8">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">1. Select Package Tier</label>
        {selectedPkg.isCustom ? (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <IndianRupee size={20} className="text-slate-400" />
              </div>
              <input 
                type="number" 
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent text-slate-900 dark:text-white font-mono text-lg"
              />
            </div>
            {customAmount < config.MIN_CUSTOM_BUDGET && (
              <p className="text-sm text-red-500">Amount must be at least ₹{config.MIN_CUSTOM_BUDGET.toLocaleString()}</p>
            )}
            <div className="flex gap-2">
              {[5000, 10000, 25000].map(amt => (
                <button key={amt} type="button" onClick={() => setCustomAmount(prev => prev + amt)} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors">
                  +₹{amt / 1000}k
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedPkg.tiers.map(tier => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedTierId === tier.id 
                    ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white mb-1">{tier.name}</div>
                <div className="text-accent font-mono">₹{tier.price.toLocaleString()}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {applicableAddOns.length > 0 && !selectedPkg.isCustom && (
        <div className="space-y-4 mb-8">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">2. Optional Add-ons</label>
          <div className="space-y-2">
            {applicableAddOns.map(addon => (
              <label key={addon.id} className="flex items-center p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedAddOns.includes(addon.id)}
                  onChange={() => handleAddOnToggle(addon.id)}
                  className="w-5 h-5 rounded border-slate-300 text-accent focus:ring-accent"
                />
                <span className="ml-3 flex-1 text-slate-700 dark:text-slate-300 font-medium">{addon.name}</span>
                <span className="text-slate-500 font-mono">+₹{addon.price.toLocaleString()}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const renderClientDetailsForm = (stepNum: number) => (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">{stepNum}. Client Details</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required type="text" placeholder="Full Name *" value={clientDetails.name} onChange={e => setClientDetails({...clientDetails, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white" />
        <input required type="email" placeholder="Email Address *" value={clientDetails.email} onChange={e => setClientDetails({...clientDetails, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white" />
        <input required type="tel" pattern="[0-9]{10}" placeholder="WhatsApp No. (10 digits) *" value={clientDetails.phone} onChange={e => setClientDetails({...clientDetails, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white" />
        <input type="text" placeholder="Business / College Name" value={clientDetails.business} onChange={e => setClientDetails({...clientDetails, business: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white" />
      </div>
      <textarea placeholder="Project Notes (Optional)" rows={3} value={clientDetails.notes} onChange={e => setClientDetails({...clientDetails, notes: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white resize-none"></textarea>
      
      <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Have a Promo Code?</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter code" 
            value={promoCodeInput}
            onChange={(e) => {
              setPromoCodeInput(e.target.value);
              if (!e.target.value) setPromoResult({ isValid: false, discountAmount: () => 0 });
            }}
            className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white uppercase"
          />
          <button type="button" onClick={handlePromoCheck} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-bold transition-colors">
            Apply
          </button>
        </div>
        {promoResult.error && promoCodeInput && (
          <p className="text-red-500 text-sm mt-2">{promoResult.error}</p>
        )}
        {promoResult.isValid && (
          <p className="text-success text-sm mt-2 font-bold">Promo code applied! Saved ₹{discountAmount.toLocaleString()}</p>
        )}
      </div>
      
      <label className="flex items-start mt-4 cursor-pointer">
        <input required type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent" />
        <span className="ml-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          I have read and agree to the <a href="/terms" className="text-accent hover:underline">Terms of Service</a> and <a href="/refund" className="text-accent hover:underline">Refund Policy</a>.
          {billingModel === 'monthly_retainer' && <strong className="block mt-1 text-amber-600 dark:text-amber-500">I understand I will be automatically billed ₹{displayTotal.toLocaleString()} on this date each month until cancelled.</strong>}
          {billingModel === 'mixed_bundle' && <strong className="block mt-1 text-amber-600 dark:text-amber-500">I understand the retainer portion of this bundle will be automatically billed each month until cancelled.</strong>}
        </span>
      </label>
    </div>
  );

  return (
    <section className="py-24 bg-white dark:bg-panel border-y border-slate-200 dark:border-borderline relative z-10" id="payment">
      <FadeInDepth className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">Payment & Booking Engine</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Secure, encrypted, and milestone-based checkout.</p>
        </div>

        {/* Tabs - Only show if not single payment/retainer */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl inline-flex relative">
            <button
              onClick={() => setActiveTab('advance')}
              className={`relative z-10 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'advance' ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Start Project (Advance)
            </button>
            <button
              onClick={() => setActiveTab('balance')}
              className={`relative z-10 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'balance' ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Pay Balance (Lookup)
            </button>
            
            {/* Sliding Pill */}
            <div 
              className="absolute top-1 bottom-1 w-1/2 bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-transform duration-300 ease-in-out"
              style={{ transform: activeTab === 'advance' ? 'translateX(0)' : 'translateX(100%)' }}
            ></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN - FORM */}
          <div className="lg:col-span-7">
            {activeTab === 'advance' ? (
              orderId ? (
                // SUCCESS STATE
                <div className="glass-panel p-8 rounded-2xl border-success/30 bg-success/5 text-center">
                  <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order Created Successfully</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">Please complete the payment securely using Razorpay or UPI.</p>
                  
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8 max-w-sm mx-auto">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Your Order ID</p>
                    <div className="flex items-center justify-center space-x-3">
                      <code className="text-2xl font-mono font-bold text-accent">{orderId}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(orderId)}
                        className="p-2 text-slate-400 hover:text-accent transition-colors"
                        title="Copy Order ID"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                    {billingModel === 'milestone_40_60' && (
                      <p className="text-xs text-amber-600 dark:text-amber-500 mt-4">Save this ID. You will need it to pay the final 60% balance.</p>
                    )}
                  </div>
                </div>
              ) : (
                // INPUT FORM
                <form onSubmit={handleCheckout} className="glass-panel p-6 sm:p-8 rounded-2xl relative z-10">
                  
                  {/* Select Package Dropdown (for cases where they land here without clicking catalog) */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Selected Package</label>
                    <select 
                      value={selectedPkgId} 
                      onChange={e => setSelectedPkgId(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white font-medium appearance-none"
                    >
                      {packages.filter(p => p.billingModel !== 'free').map(p => (
                        <option key={p.id} value={p.id}>{p.category} - {p.title}</option>
                      ))}
                    </select>
                  </div>

                  {billingModel === 'milestone_40_60' && renderMilestoneForm()}
                  {billingModel === 'single_payment' && (
                    <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Format Option</p>
                      <p className="text-xs text-slate-500 mt-1">Single payment models do not require a 40/60 split.</p>
                      <select className="w-full mt-3 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white outline-none">
                        <option>Standard Format</option>
                        <option>Custom Guidelines</option>
                      </select>
                    </div>
                  )}

                  {renderClientDetailsForm(billingModel === 'milestone_40_60' ? 3 : 2)}
                  
                </form>
              )
            ) : (
              // TAB 2: LOOKUP FORM
              <div className="glass-panel p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Lookup Existing Order</h3>
                <form onSubmit={handleLookup} className="flex space-x-3 mb-8">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={18} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="e.g. A2M-231005-A1B2" 
                      value={lookupId}
                      onChange={e => setLookupId(e.target.value.toUpperCase())}
                      className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-accent outline-none text-slate-900 dark:text-white font-mono uppercase"
                    />
                  </div>
                  <button type="submit" disabled={isLookingUp} className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-6 rounded-xl font-bold transition-colors flex items-center">
                    {isLookingUp ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
                  </button>
                </form>

                {lookupError && <p className="text-red-500 text-sm mb-4">{lookupError}</p>}

                {lookupResult && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Package</p>
                        <p className="font-bold text-slate-900 dark:text-white">{lookupResult.packageName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Status</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {lookupResult.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Total Scope</span>
                        <span className="font-mono text-slate-900 dark:text-white">₹{lookupResult.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Advance Paid</span>
                        <span className="font-mono text-success">-₹{lookupResult.advanceAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold pt-2">
                        <span className="text-slate-900 dark:text-white">Balance Due</span>
                        <span className="font-mono text-accent">₹{lookupResult.balanceAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - SUMMARY & PAY */}
          <div className="lg:col-span-5 relative z-10">
            <div className="sticky top-24 glass-panel p-6 sm:p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none">
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                {activeTab === 'advance' ? 'Order Summary' : 'Payment Portal'}
              </h3>
              
              {activeTab === 'advance' ? (
                <>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">{selectedPkg.title} ({selectedTierId})</span>
                      <span className="font-mono text-slate-900 dark:text-white">₹{selectedPkg.isCustom ? customAmount.toLocaleString() : (selectedPkg.tiers.find(t=>t.id===selectedTierId)?.price || 0).toLocaleString()}</span>
                    </div>
                    {selectedAddOns.map(id => {
                      const addon = applicableAddOns.find(a => a.id === id);
                      return addon ? (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-slate-500">+ {addon.name}</span>
                          <span className="font-mono text-slate-700 dark:text-slate-300">₹{addon.price.toLocaleString()}</span>
                        </div>
                      ) : null;
                    })}
                    
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-slate-900 dark:text-white">Total Project Scope</span>
                        <span className="font-mono text-slate-900 dark:text-white">₹{displayTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 mb-8">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {billingModel === 'milestone_40_60' ? `Advance Due Today (${config.ADVANCE_PERCENT}%)` : billingModel === 'monthly_retainer' ? 'First Month Due Today' : 'Total Due Today'}
                      </span>
                      <span className="text-2xl font-mono font-extrabold text-accent">₹{displayAdvance.toLocaleString()}</span>
                    </div>
                    {billingModel === 'milestone_40_60' && (
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>Remaining Balance ({config.BALANCE_PERCENT}%)</span>
                        <span className="font-mono">₹{displayBalance.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {orderId ? (
                     <div className="flex flex-col items-center space-y-6 overflow-hidden pt-4 pb-2">
                       {receiptStage === 'idle' ? (
                         <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
                           <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                             <QRCode 
                               value={`upi://pay?pa=${config.UPI_ID}&pn=${encodeURIComponent(config.BRAND_NAME)}&am=${orderAmount}&cu=INR`}
                               size={200}
                             />
                           </div>
                           <p className="text-center text-sm text-slate-400 mb-6">
                             Scan with any UPI App (GPay, PhonePe, Paytm) to pay ₹{orderAmount.toLocaleString()} securely.
                           </p>
                           <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center mb-6 w-full max-w-sm">
                             <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Copy UPI ID</p>
                             <div className="flex items-center justify-center space-x-2">
                               <code className="text-sm font-mono font-bold text-accent">{config.UPI_ID}</code>
                               <button 
                                 onClick={() => navigator.clipboard.writeText(config.UPI_ID)}
                                 className="p-1 text-slate-400 hover:text-accent transition-colors"
                                 title="Copy UPI ID"
                               >
                                 <Copy size={14} />
                               </button>
                             </div>
                           </div>
                           <button 
                             onClick={() => setReceiptStage('processing')}
                             className="btn-3d w-full max-w-sm bg-accent hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center"
                           >
                             I have completed the payment
                           </button>
                         </div>
                       ) : (
                         <>
                           <ReceiptPrinterUI 
                             stage={receiptStage}
                             orderId={orderId}
                             amount={orderAmount}
                             clientName={clientDetails.name}
                             packageName={selectedPkg.title}
                             tierName={selectedPkg.tiers.find(t => t.id === selectedTierId)?.name || ''}
                             addOns={selectedAddOns.map(id => applicableAddOns.find(a => a.id === id)).filter(Boolean) as any}
                             now={now}
                           />
                           
                           {receiptStage === 'complete' && (
                             <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                               <div className="w-full max-w-sm h-px bg-slate-200 dark:bg-slate-700 my-2 mt-6"></div>
                               <p className="text-center text-sm font-semibold text-green-400 mb-2 mt-4">Step 2: Confirm payment via WhatsApp</p>
                               <a 
                                 href={`https://wa.me/${config.PHONE_WHATSAPP.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello A2M Insights!\nI just paid ₹${orderAmount.toLocaleString()} via UPI for:\n*Package:* ${selectedPkg.title} (${selectedPkg.tiers.find(t => t.id === selectedTierId)?.name})\n*Order Ref:* ${orderId}\n*My Name:* ${clientDetails.name}\n*My Email:* ${clientDetails.email}\n*My Phone:* ${clientDetails.phone}\n*Project/Business:* ${clientDetails.business}\n*Notes:* ${clientDetails.notes || 'None'}\n\nPlease confirm receipt!`)}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="btn-3d w-full max-w-sm bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center"
                               >
                                 Confirm Order via WhatsApp
                               </a>
                             </div>
                           )}
                         </>
                       )}
                     </div>
                  ) : (
                    <button 
                      onClick={handleCheckout}
                      disabled={isSubmitting} 
                      className="btn-3d w-full bg-accent hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : `Pay ₹${displayAdvance.toLocaleString()}`}
                    </button>
                  )}
                </>
              ) : (
                // TAB 2 SUMMARY
                lookupResult ? (
                  <div className="flex flex-col h-full">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
                      Securely settle the remaining balance for your project to initiate final deployment and code transfer.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Balance Due</span>
                        <span className="text-3xl font-mono font-extrabold text-accent">₹{lookupResult.balanceAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <button className="btn-3d w-full bg-accent hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg flex justify-center items-center transition-all shadow-lg shadow-accent/20 mt-auto">
                      Pay Balance (₹{lookupResult.balanceAmount.toLocaleString()})
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">Search for your Order ID to view and pay the balance.</p>
                  </div>
                )
              )}
              
              <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-slate-500">
                <ShieldCheck size={14} />
                <span>Secured by Razorpay. 256-bit encryption.</span>
              </div>
            </div>
          </div>
          
        </div>
      </FadeInDepth>
    </section>
  );
};
