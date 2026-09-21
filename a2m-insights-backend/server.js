require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { computePrice, ADVANCE_PERCENT, packages } = require('./pricing');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Mock DB to store order details temporarily
const ordersDB = new Map();

app.post('/api/orders/create', async (req, res) => {
  console.log("Received order request:", req.body);
  try {
    const { packageId, tierId, addOnIds, customAmount, billingModel, clientDetails } = req.body;

    // 1. Calculate price securely on backend
    const totalScope = computePrice(packageId, tierId, addOnIds, customAmount);
    
    if (billingModel === 'free') {
      return res.status(400).json({ error: "Free packages should not use the payment engine." });
    }

    let advanceDue = totalScope;
    let balanceDue = 0;

    if (billingModel === 'milestone_40_60') {
      advanceDue = (totalScope * ADVANCE_PERCENT) / 100;
      balanceDue = totalScope - advanceDue;
    } else if (billingModel === 'monthly_retainer') {
      // Logic for subscription if we were creating a true recurring subscription
      // For simplicity in this demo, we'll just charge the first month as a normal order.
    }

    // 2. Create Razorpay Order
    const options = {
      amount: advanceDue * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    const pkgTitle = packages.find(p => p.id === packageId)?.title || "Custom Project";

    // 3. Store in DB
    ordersDB.set(order.id, {
      orderId: order.id,
      packageName: pkgTitle,
      totalAmount: totalScope,
      advanceAmount: advanceDue,
      balanceAmount: balanceDue,
      status: 'pending' // Wil update to advance_paid after webhook
    });

    res.json({
      orderId: order.id,
      amountDue: advanceDue,
      totalScope,
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
});

// Webhook endpoint to verify payment success
app.post('/api/webhook/razorpay', (req, res) => {
  // Normally Razorpay sends this to your public webhook URL.
  // For local testing without ngrok, you might hit an endpoint manually to simulate it.
  const secret = process.env.RAZORPAY_KEY_SECRET; // Or your specific Webhook secret

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('Signature is valid. Payment successful!');
    
    // Process the event
    if (req.body.event === 'payment.captured' || req.body.event === 'order.paid') {
      const orderId = req.body.payload.payment.entity.order_id;
      const order = ordersDB.get(orderId);
      if (order) {
        order.status = order.balanceAmount > 0 ? 'advance_paid' : 'balance_paid';
        ordersDB.set(orderId, order);
      }
    }
    res.json({ status: 'ok' });
  } else {
    res.status(403).json({ error: 'Invalid signature' });
  }
});

// Mock endpoint to simulate webhook for local testing from frontend
app.post('/api/orders/verify-test', (req, res) => {
  const { orderId } = req.body;
  const order = ordersDB.get(orderId);
  if (order) {
    order.status = order.balanceAmount > 0 ? 'advance_paid' : 'balance_paid';
    ordersDB.set(orderId, order);
    res.json({ success: true, order });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.get('/api/orders/:id', (req, res) => {
  const order = ordersDB.get(req.params.id);
  if (order) {
     if (order.balanceAmount === 0) {
       return res.status(400).json({ error: "No pending balance for this order." });
     }
     res.json(order);
  } else {
    res.status(404).json({ error: "Order ID not found or invalid." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
