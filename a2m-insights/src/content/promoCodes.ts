import type { ServiceCategory } from './packages';

export type DiscountType = 'flat' | 'percent';

export interface PromoCode {
  code: string;
  discountType: DiscountType;
  value: number;
  applicableCategories: ServiceCategory[] | 'all';
  expiryDate: string; // ISO string e.g. '2026-12-31'
  usageLimit: number;
  timesUsed: number;
}

export const promoCodes: PromoCode[] = [
  {
    code: 'A2M10',
    discountType: 'percent',
    value: 10, // 10% off
    applicableCategories: 'all',
    expiryDate: '2027-01-01',
    usageLimit: 100,
    timesUsed: 0
  },
  {
    code: 'STUDENT500',
    discountType: 'flat',
    value: 500, // ₹500 off
    applicableCategories: ['Student Projects'],
    expiryDate: '2027-01-01',
    usageLimit: 50,
    timesUsed: 0
  },
  {
    code: 'LAUNCH20',
    discountType: 'percent',
    value: 20, // 20% off
    applicableCategories: ['Web & App Development', 'Combo Deals'],
    expiryDate: '2026-12-31',
    usageLimit: 10,
    timesUsed: 0
  }
];

export function validatePromoCode(code: string, category: ServiceCategory): { isValid: boolean; discountAmount: (basePrice: number) => number; error?: string } {
  const promo = promoCodes.find(p => p.code.toUpperCase() === code.toUpperCase());
  if (!promo) return { isValid: false, discountAmount: () => 0, error: 'Invalid promo code' };
  
  if (new Date(promo.expiryDate) < new Date()) {
    return { isValid: false, discountAmount: () => 0, error: 'Promo code expired' };
  }
  
  if (promo.timesUsed >= promo.usageLimit) {
    return { isValid: false, discountAmount: () => 0, error: 'Promo code usage limit reached' };
  }
  
  if (promo.applicableCategories !== 'all' && !promo.applicableCategories.includes(category)) {
    return { isValid: false, discountAmount: () => 0, error: 'Not applicable for this category' };
  }
  
  return {
    isValid: true,
    discountAmount: (basePrice: number) => {
      if (promo.discountType === 'flat') {
        return Math.min(basePrice, promo.value);
      }
      return Math.round((basePrice * promo.value) / 100);
    }
  };
}
