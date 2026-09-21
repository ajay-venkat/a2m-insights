import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Proof } from '../components/Proof';
import { Services } from '../components/Services';
import { PaymentEngine } from '../components/PaymentEngine';
import { Security } from '../components/Security';
import { FAQ } from '../components/FAQ';
import { CallbackForm } from '../components/CallbackForm';
import { Footer, FloatingWhatsApp } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Proof />
        <Services />
        <PaymentEngine />
        <Security />
        <FAQ />
        <CallbackForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};
