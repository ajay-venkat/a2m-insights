# A2M Insights - Agency Application

This is a complete, production-ready React + TypeScript single-page application built for A2M Insights.

## Features

- **Dark-first Aesthetic:** Premium modern design using Tailwind CSS.
- **Theme Toggle:** Robust Light/Dark/Auto theme with `localStorage` persistence.
- **Payment Engine:** Complex 2-tab payment calculation and order tracking flow.
- **API Simulation:** Mock backend module with typed request/response contracts for future Cloud Run or serverless deployment.
- **Responsive:** Fully responsive down to 360px without horizontal overflow.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Configuration & Content Edits

You can easily change all pricing, features, and site copy without digging into component code.

- **Global Config & Secrets (Mock):** Edit `src/config.ts` (Phone, email, base percentages).
- **Service Packages & Pricing:** Edit `src/content/packages.ts`. Each package defines its own fixed-price tiers.
- **Site Copy & FAQs:** Edit `src/content/content.ts`. You can update testimonials, project outcomes, and FAQ text here.

## Deploying

This Vite app builds to static HTML/JS/CSS in the `dist` folder. 

1. Run `npm run build`.
2. Deploy the `dist` folder to Vercel, Netlify, Cloudflare Pages, or Firebase Hosting.

## Backend Integration Guide

Currently, the payment calculations, total scope validation, and order ID generation are handled in `src/api/index.ts` using an in-memory mock store.

To integrate with a real backend (e.g., Google Cloud Run + Node.js):

1. Expose two REST endpoints from your backend:
   - `POST /api/orders`
   - `GET /api/orders/:id`
2. Update `src/api/index.ts` to make real `fetch` calls to these endpoints instead of simulating them.
3. Move `computePrice()` and the Razorpay Webhook signature verification to the Node backend for actual security.
