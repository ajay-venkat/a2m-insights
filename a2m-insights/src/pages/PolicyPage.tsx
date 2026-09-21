import React from 'react';
import { Header } from '../components/Header';
import { Footer, FloatingWhatsApp } from '../components/Footer';
import { config } from '../config';

interface PolicyPageProps {
  title: string;
  lastUpdated: string;
  content: React.ReactNode;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ title, lastUpdated, content }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      <Header />
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
            <p className="text-sm text-slate-500 mb-8">Last Updated: {lastUpdated}</p>
            <div className="prose prose-slate dark:prose-invert max-w-none prose-a:text-accent hover:prose-a:text-blue-700">
              {content}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export const TermsContent = () => (
  <>
    <h2>1. Introduction</h2>
    <p>Welcome to {config.BRAND_NAME}. By engaging our services, you agree to the following terms and conditions.</p>
    
    <h2>2. Services & Scope</h2>
    <p>We provide web engineering and IT consulting. The specific scope of your project will be defined during our discovery phase and locked in upon payment of the advance milestone.</p>
    
    <h2>3. Payment Terms</h2>
    <p>We operate on a {config.ADVANCE_PERCENT}/{config.BALANCE_PERCENT} milestone model. A {config.ADVANCE_PERCENT}% advance is required to initiate work. The remaining {config.BALANCE_PERCENT}% is due before the final code handover and deployment.</p>
    
    <h2>4. Intellectual Property</h2>
    <p>Upon full payment of the project fees, all source code, assets, and intellectual property rights associated with the project are transferred to the client. {config.BRAND_NAME} retains the right to use non-sensitive project details and screenshots in our portfolio.</p>
  </>
);

export const RefundContent = () => (
  <>
    <h2>1. Refund Policy Overview</h2>
    <p>At {config.BRAND_NAME}, we strive for 100% client satisfaction. Due to the nature of custom software development, our refund policy is milestone-based.</p>
    
    <h2>2. Advance Payment Refunds</h2>
    <p>The initial {config.ADVANCE_PERCENT}% advance is refundable if you decide to cancel the project <strong>during the discovery phase</strong> (before any code is written or designs are finalized). Once development begins, the advance becomes non-refundable as it covers resource allocation and initial labor.</p>
    
    <h2>3. Dissatisfaction</h2>
    <p>If you are dissatisfied with the progress, you are not obligated to pay the final {config.BALANCE_PERCENT}% balance. However, in such cases, no source code or IP will be transferred, and the project will be terminated.</p>
  </>
);

export const PrivacyContent = () => (
  <>
    <h2>1. Information We Collect</h2>
    <p>We collect information you provide directly to us, such as your name, email, phone number, and business details when you request a callback or initiate a project.</p>
    
    <h2>2. How We Use Information</h2>
    <p>We use the information to communicate with you about your project, process payments, and provide our services. We do not sell your personal data to third parties.</p>
    
    <h2>3. Payment Security</h2>
    <p>All payment processing is handled by secure, PCI-compliant third-party gateways (e.g., Razorpay). We do not store your credit card or UPI PIN information on our servers.</p>
    
    <h2>4. Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at {config.EMAIL}.</p>
  </>
);
