// Simplified pricing logic to match frontend packages.ts

const MIN_CUSTOM_BUDGET = 3000;
const ADVANCE_PERCENT = 40;

const basePackages = [
  // --- WEB & APP DEVELOPMENT ---
  { id: 'web_app_dev', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 15000 }, { id: 'standard', price: 45000 }, { id: 'plus', price: 80000 }] },
  { id: 'mobile_app_dev', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 35000 }, { id: 'standard', price: 60000 }, { id: 'plus', price: 90000 }] },
  { id: 'ui_ux_design', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 8000 }, { id: 'standard', price: 15000 }, { id: 'plus', price: 25000 }] },
  { id: 'chatbot_ai', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 12000 }, { id: 'standard', price: 22000 }, { id: 'plus', price: 35000 }] },
  { id: 'business_dashboard', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 20000 }, { id: 'standard', price: 40000 }, { id: 'plus', price: 70000 }] },
  { id: 'ecommerce', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 15000 }, { id: 'standard', price: 30000 }, { id: 'plus', price: 50000 }] },
  
  // --- CLOUD & SECURITY ---
  { id: 'cloud_setup', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 6000 }, { id: 'standard', price: 12000 }, { id: 'plus', price: 20000 }] },
  { id: 'software_maintenance', billingModel: 'monthly_retainer', tiers: [{ id: 'basic', price: 1500 }, { id: 'standard', price: 3000 }, { id: 'plus', price: 5000 }] },

  // --- DATA & AI ---
  { id: 'ai_ml_solutions', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 45000 }, { id: 'standard', price: 85000 }, { id: 'plus', price: 150000 }] },
  { id: 'data_analytics', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 25000 }, { id: 'standard', price: 45000 }, { id: 'plus', price: 80000 }] },
  { id: 'automation_solutions', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 15000 }, { id: 'standard', price: 30000 }, { id: 'plus', price: 50000 }] },

  // --- STUDENT PROJECTS ---
  { id: 'final_year_project', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 6000 }, { id: 'standard', price: 10000 }, { id: 'plus', price: 18000 }] },
  
  // --- RESEARCH PAPERS ---
  { id: 'research_submission', billingModel: 'single_payment', tiers: [{ id: 'standard', price: 1000 }] },

  // --- MARKETING & MANAGEMENT ---
  { id: 'marketing_social', billingModel: 'monthly_retainer', tiers: [{ id: 'standard', price: 4000 }] },
  
  // -- OTHERS (Keep legacy IDs for backward compatibility if any) --
  { id: 'whatsapp_automation', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 5000 }, { id: 'standard', price: 9000 }, { id: 'plus', price: 15000 }] },
  { id: 'payment_portal', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 10000 }, { id: 'standard', price: 18000 }, { id: 'plus', price: 25000 }] },
  { id: 'booking', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 10000 }, { id: 'standard', price: 18000 }, { id: 'plus', price: 25000 }] },
  { id: 'software_testing', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 8000 }, { id: 'standard', price: 15000 }, { id: 'plus', price: 25000 }] },
  { id: 'api_integration', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 15000 }, { id: 'standard', price: 30000 }, { id: 'plus', price: 50000 }] },
  { id: 'cybersecurity', billingModel: 'milestone_40_60', tiers: [{ id: 'basic', price: 25000 }, { id: 'standard', price: 50000 }, { id: 'plus', price: 100000 }] }
];

const comboDefinitions = [
  { id: 'combo_web_mobile', items: [{ packageId: 'web_app_dev', tierId: 'basic' }, { packageId: 'mobile_app_dev', tierId: 'standard' }], discountPercent: 13.3 },
  { id: 'combo_ecom_mobile', items: [{ packageId: 'ecommerce', tierId: 'standard' }, { packageId: 'mobile_app_dev', tierId: 'plus' }], discountPercent: 11.5 },
  { id: 'combo_web_social', items: [{ packageId: 'web_app_dev', tierId: 'basic' }, { packageId: 'marketing_social', tierId: 'standard' }], discountPercent: 0 },
  { id: 'combo_digital_launch', items: [{ packageId: 'web_app_dev', tierId: 'standard' }, { packageId: 'marketing_social', tierId: 'standard' }], discountPercent: 20 },
  { id: 'combo_student_research', items: [{ packageId: 'final_year_project', tierId: 'standard' }, { packageId: 'research_submission', tierId: 'standard' }], discountPercent: 10 }
];

const buildComboPackages = () => {
  return comboDefinitions.map(combo => {
    let originalTotal = 0;
    let hasRetainer = false;
    let hasMilestone = false;

    combo.items.forEach(item => {
      const basePkg = basePackages.find(p => p.id === item.packageId);
      if (basePkg) {
        const tier = basePkg.tiers.find(t => t.id === item.tierId);
        if (tier) originalTotal += tier.price;
        if (basePkg.billingModel === 'monthly_retainer') hasRetainer = true;
        if (basePkg.billingModel === 'milestone_40_60') hasMilestone = true;
      }
    });

    const discountedTotal = Math.round(originalTotal * (1 - combo.discountPercent / 100) / 100) * 100;
    
    let billingModel = 'milestone_40_60';
    if (hasRetainer && hasMilestone) billingModel = 'mixed_bundle';
    else if (hasRetainer) billingModel = 'monthly_retainer';

    return {
      id: combo.id,
      billingModel,
      tiers: [{ id: 'bundle', price: discountedTotal, originalPrice: originalTotal }],
      comboConfig: combo
    };
  });
};

const packages = [...basePackages, ...buildComboPackages()];

const webAddOns = [
  { id: 'urgent_delivery', price: 10000 },
  { id: 'extra_revisions', price: 5000 }
];

const studentAddOns = [
  { id: 'extra_hardware', price: 3000 },
  { id: 'urgent_delivery', price: 5000 }
];

const promoCodes = [
  { code: 'A2M10', discountType: 'percent', value: 10, expiryDate: '2027-01-01', usageLimit: 100, timesUsed: 0 },
  { code: 'STUDENT500', discountType: 'flat', value: 500, expiryDate: '2027-01-01', usageLimit: 50, timesUsed: 0 },
  { code: 'LAUNCH20', discountType: 'percent', value: 20, expiryDate: '2026-12-31', usageLimit: 10, timesUsed: 0 }
];

function validatePromoCodeServer(code) {
  if (!code) return { isValid: false, getDiscount: () => 0 };
  const promo = promoCodes.find(p => p.code.toUpperCase() === code.toUpperCase());
  if (!promo) return { isValid: false, getDiscount: () => 0 };
  
  if (new Date(promo.expiryDate) < new Date()) return { isValid: false, getDiscount: () => 0 };
  if (promo.timesUsed >= promo.usageLimit) return { isValid: false, getDiscount: () => 0 };
  
  return {
    isValid: true,
    getDiscount: (basePrice) => {
      if (promo.discountType === 'flat') return Math.min(basePrice, promo.value);
      return Math.round((basePrice * promo.value) / 100);
    }
  };
}

function computePrice(packageId, tierId, addOnIds = [], promoCodeStr = '') {
  if (packageId === 'custom_budget') {
    return {
      total: MIN_CUSTOM_BUDGET,
      advance: MIN_CUSTOM_BUDGET,
      isRetainer: false,
      isValid: true
    };
  }

  const pkg = packages.find(p => p.id === packageId);
  if (!pkg) return { total: 0, advance: 0, isValid: false };

  const tier = pkg.tiers.find(t => t.id === tierId);
  if (!tier) return { total: 0, advance: 0, isValid: false };

  let total = tier.price;
  const isRetainer = pkg.billingModel === 'monthly_retainer';
  const isMixed = pkg.billingModel === 'mixed_bundle';

  const allAddOns = [...webAddOns, ...studentAddOns];
  if (addOnIds && Array.isArray(addOnIds)) {
    addOnIds.forEach(id => {
      const addon = allAddOns.find(a => a.id === id);
      if (addon) total += addon.price;
    });
  }

  // Apply promo code if valid
  const promo = validatePromoCodeServer(promoCodeStr);
  let totalDiscount = 0;
  if (promo.isValid) {
    totalDiscount = promo.getDiscount(total);
    total -= totalDiscount;
    total = Math.max(total, 0);
  }

  // Calculate Advance
  let advance = total; // Default
  const isSinglePayment = pkg.billingModel === 'single_payment';
  
  if (isMixed) {
    // For mixed, we charge 40% of the milestone part + 100% of the retainer part.
    // In pricing.js, we don't have the full category access, so we recalculate exactly using base items.
    let milestonePart = 0;
    let retainerPart = 0;
    pkg.comboConfig.items.forEach(item => {
      const basePkg = basePackages.find(p => p.id === item.packageId);
      if (basePkg) {
        const baseTier = basePkg.tiers.find(t => t.id === item.tierId);
        if (baseTier) {
          if (basePkg.billingModel === 'monthly_retainer') retainerPart += baseTier.price;
          else milestonePart += baseTier.price;
        }
      }
    });
    // Apply combo discount ratio
    const ratio = total / tier.originalPrice; // Adjusted ratio from promo codes etc
    milestonePart *= ratio;
    retainerPart *= ratio;

    advance = Math.floor(milestonePart * (ADVANCE_PERCENT / 100)) + Math.floor(retainerPart);
  } else if (!isRetainer && !isSinglePayment) {
    advance = Math.floor(total * (ADVANCE_PERCENT / 100));
  }

  return { total, advance, isRetainer, isValid: true, discountApplied: totalDiscount };
}

module.exports = {
  MIN_CUSTOM_BUDGET,
  ADVANCE_PERCENT,
  packages,
  computePrice
};
