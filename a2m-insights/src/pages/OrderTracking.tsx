import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { lookupOrder, type OrderSummary } from '../api';
import { Loader2, Clock, Check, Phone, ArrowLeft, Package as PackageIcon } from 'lucide-react';
import { config } from '../config';

type OrderStage = 'Order Placed' | 'Advance Confirmed' | 'In Progress' | 'Ready for Review' | 'Balance Paid' | 'Delivered';
const STAGES: OrderStage[] = ['Order Placed', 'Advance Confirmed', 'In Progress', 'Ready for Review', 'Balance Paid', 'Delivered'];

export const OrderTracking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Order Tracking | A2M Insights';
    
    // Insert meta noindex dynamically if it's not in HTML
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    if (!orderId) {
      setError('No Order ID provided. Please enter a valid tracking link.');
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const result = await lookupOrder(orderId);
        setOrder(result);
      } catch (err: any) {
        setError('Order not found. Please verify your Order ID.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-900 dark:text-white">
        <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
        <p className="font-medium animate-pulse">Locating your order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-900 dark:text-white">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-2xl mx-auto flex items-center justify-center mb-6">
            <PackageIcon size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Tracking Error</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">{error}</p>
          <a href="/" className="inline-flex items-center text-accent font-medium hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </a>
        </div>
      </div>
    );
  }

  // Derive stage from balance status for now (as we don't have a real backend DB for detailed stages)
  // We'll simulate it: If advance is paid but balance is > 0, it's 'In Progress'. If balance is 0, it's 'Delivered'.
  let currentStageIndex = 0;
  if (order.balanceAmount > 0) {
    currentStageIndex = 2; // In Progress
  } else {
    currentStageIndex = 5; // Delivered
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="inline-flex items-center text-slate-500 hover:text-accent font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </a>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Order Tracking Portal</p>
                <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-accent-light">{order.orderId}</h1>
              </div>
              <div className="text-left md:text-right">
                <p className="text-slate-400 text-sm mb-1">Total Value</p>
                <p className="text-xl font-bold font-mono">₹{order.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Delivery ETA */}
            <div className="mb-10 bg-accent/5 border border-accent/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Project Status: {STAGES[currentStageIndex]}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Estimated Delivery: <strong className="text-slate-900 dark:text-white">Usually within 2-4 weeks</strong>
                </p>
              </div>
              <a 
                href={`https://wa.me/${config.PHONE_WHATSAPP.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi A2M Insights,\nI would like an update on my order ID: ${order.orderId}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center shrink-0"
              >
                <Phone className="w-4 h-4 mr-2" /> Contact Team
              </a>
            </div>

            {/* Stepper */}
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800 md:hidden"></div>
              
              <div className="space-y-8 md:space-y-0 md:flex md:justify-between md:relative">
                <div className="hidden md:block absolute top-6 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-800"></div>

                {STAGES.map((stage, idx) => {
                  const isCompleted = idx <= currentStageIndex;
                  const isActive = idx === currentStageIndex;

                  return (
                    <div key={stage} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 group">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 shadow-lg ${
                        isCompleted 
                          ? 'bg-accent text-white border-4 border-white dark:border-slate-900' 
                          : 'bg-white dark:bg-slate-800 text-slate-400 border-4 border-slate-100 dark:border-slate-900'
                      } ${isActive ? 'ring-4 ring-accent/30' : ''}`}>
                        {isCompleted && !isActive ? (
                          <Check className="w-5 h-5" />
                        ) : isActive ? (
                          <Clock className="w-5 h-5 animate-pulse" />
                        ) : (
                          <span className="text-sm font-bold">{idx + 1}</span>
                        )}
                      </div>
                      
                      <div className="md:text-center">
                        <p className={`font-bold ${isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>
                          {stage}
                        </p>
                        {isActive && (
                          <p className="text-xs text-accent font-medium mt-1 md:absolute md:w-full md:left-0">Currently Here</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
