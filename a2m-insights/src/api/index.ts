import { type BillingModel } from '../content/packages';

export interface OrderRequest {
  packageId: string;
  tierId: string;
  addOnIds: string[];
  customAmount?: number;
  billingModel: BillingModel;
  clientDetails: {
    name: string;
    email: string;
    phone: string;
    business: string;
    notes: string;
  };
}

export interface OrderResponse {
  orderId: string;
  amountDue: number;
  totalScope: number;
  keyId: string; // Razorpay Key ID from backend
}

export interface OrderSummary {
  orderId: string;
  packageName: string;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  status: 'pending' | 'advance_paid' | 'in_progress' | 'balance_paid' | 'delivered' | 'subscribed';
}

const BACKEND_URL = 'http://localhost:5000/api';

// API: Create Order
export const createOrder = async (req: OrderRequest): Promise<OrderResponse> => {
  if (req.billingModel === 'free') {
    throw new Error("Free packages should not use the payment engine.");
  }

  const response = await fetch(`${BACKEND_URL}/orders/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create order on server');
  }

  return data;
};

// API: Lookup Order (60% Balance Flow)
export const lookupOrder = async (orderId: string): Promise<OrderSummary> => {
  const response = await fetch(`${BACKEND_URL}/orders/${orderId.trim().toUpperCase()}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Order ID not found or invalid.');
  }

  return data;
};

// Internal API to mock verification during local testing
export const verifyTestPayment = async (orderId: string) => {
  const response = await fetch(`${BACKEND_URL}/orders/verify-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId })
  });
  return await response.json();
};
