// Simplified pricing logic to match frontend packages.ts

const MIN_CUSTOM_BUDGET = 3000;
const ADVANCE_PERCENT = 40;

const packages = [
  // --- WEB & APP DEVELOPMENT ---
  { id: 'web_app_dev', tiers: [{ id: 'basic', price: 40000 }, { id: 'standard', price: 80000 }, { id: 'plus', price: 150000 }] },
  { id: 'whatsapp_automation', tiers: [{ id: 'basic', price: 10000 }, { id: 'standard', price: 15000 }, { id: 'plus', price: 20000 }] },
  { id: 'payment_portal', tiers: [{ id: 'basic', price: 15000 }, { id: 'standard', price: 25000 }, { id: 'plus', price: 35000 }] },
  { id: 'ecommerce', tiers: [{ id: 'basic', price: 25000 }, { id: 'standard', price: 40000 }, { id: 'plus', price: 60000 }] },
  { id: 'booking', tiers: [{ id: 'basic', price: 15000 }, { id: 'standard', price: 25000 }, { id: 'plus', price: 35000 }] },
  { id: 'mobile_app_dev', tiers: [{ id: 'basic', price: 60000 }, { id: 'standard', price: 100000 }, { id: 'plus', price: 200000 }] },
  { id: 'ui_ux_design', tiers: [{ id: 'basic', price: 20000 }, { id: 'standard', price: 40000 }, { id: 'plus', price: 60000 }] },
  { id: 'software_testing', tiers: [{ id: 'basic', price: 15000 }, { id: 'standard', price: 25000 }, { id: 'plus', price: 40000 }] },
  { id: 'software_maintenance', tiers: [{ id: 'basic', price: 10000 }, { id: 'standard', price: 20000 }, { id: 'plus', price: 30000 }] },

  // --- DATA & AI ---
  { id: 'ai_ml_solutions', tiers: [{ id: 'basic', price: 80000 }, { id: 'standard', price: 150000 }, { id: 'plus', price: 300000 }] },
  { id: 'data_analytics', tiers: [{ id: 'basic', price: 50000 }, { id: 'standard', price: 90000 }, { id: 'plus', price: 150000 }] },
  { id: 'automation_solutions', tiers: [{ id: 'basic', price: 30000 }, { id: 'standard', price: 50000 }, { id: 'plus', price: 80000 }] },

  // --- CLOUD & SECURITY ---
  { id: 'cloud_solutions', tiers: [{ id: 'basic', price: 40000 }, { id: 'standard', price: 70000 }, { id: 'plus', price: 100000 }] },
  { id: 'api_integration', tiers: [{ id: 'basic', price: 25000 }, { id: 'standard', price: 50000 }, { id: 'plus', price: 75000 }] },
  { id: 'cybersecurity', tiers: [{ id: 'basic', price: 50000 }, { id: 'standard', price: 100000 }, { id: 'plus', price: 200000 }] },

  // --- STUDENT PROJECTS ---
  { id: 'final_year_project', tiers: [{ id: 'basic', price: 10000 }, { id: 'standard', price: 15000 }, { id: 'plus', price: 25000 }] },
  
  // --- RESEARCH PAPERS ---
  { id: 'research_submission', tiers: [{ id: 'standard', price: 1500 }] },

  // --- MARKETING & MANAGEMENT ---
  { id: 'marketing_social', tiers: [{ id: 'standard', price: 4000 }] }
];

const webAddOns = [
  { id: 'urgent_delivery', price: 10000 },
  { id: 'extra_revisions', price: 5000 }
];

const studentAddOns = [
  { id: 'extra_hardware', price: 3000 },
  { id: 'urgent_delivery', price: 5000 }
];

function computePrice(packageId, tierId, addOnIds = []) {
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
  let isRetainer = ['software_maintenance', 'marketing_social'].includes(pkg.id);

  const allAddOns = [...webAddOns, ...studentAddOns];
  if (addOnIds && Array.isArray(addOnIds)) {
    addOnIds.forEach(id => {
      const addon = allAddOns.find(a => a.id === id);
      if (addon) total += addon.price;
    });
  }

  // Advance calculation (Retainers and single payments require 100% upfront)
  // Our backend logic from earlier ensures single payments and retainers are fully billed.
  const isSinglePayment = ['research_submission'].includes(pkg.id);
  const advance = (isRetainer || isSinglePayment) ? total : Math.floor(total * (ADVANCE_PERCENT / 100));

  return { total, advance, isRetainer, isValid: true };
}

module.exports = {
  MIN_CUSTOM_BUDGET,
  ADVANCE_PERCENT,
  packages,
  computePrice
};
