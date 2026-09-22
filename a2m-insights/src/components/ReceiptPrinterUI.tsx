import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import QRCode from 'react-qr-code';
import { config } from '../config';

export type ReceiptStage = 'idle' | 'processing' | 'printing' | 'complete';

interface ReceiptPrinterUIProps {
  stage: ReceiptStage;
  orderId: string;
  amount: number;
  clientName: string;
  packageName: string;
  tierName: string;
  addOns: { name: string; price: number }[];
  now: Date;
}

const COLORS = {
  ink: "#0f172a", // slate-900
  inkSoft: "#475569", // slate-600
  paper: "#f8fafc", // slate-50
};

export const ReceiptPrinterUI: React.FC<ReceiptPrinterUIProps> = ({
  stage,
  orderId,
  amount,
  clientName,
  packageName,
  tierName,
  addOns,
  now
}) => {
  const isOut = stage === "printing" || stage === "complete";
  const isPrinting = stage === "printing";

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-sm">
        {/* Printer Chassis */}
        <div className="relative rounded-3xl p-3 pb-6 bg-slate-800 dark:bg-slate-900 shadow-2xl border border-slate-700">
          <div className="flex items-center justify-between px-2 pt-1 pb-3">
            <StatusPill stage={stage} />
          </div>

          {/* Paper Slot */}
          <div
            className="relative rounded-xl"
            style={{
              height: 480, // High enough to hold the full receipt
              backgroundColor: "#020617", // slate-950, very dark inside the slot
              overflowY: stage === "complete" ? "auto" : "hidden",
              overflowX: "hidden",
              boxShadow: "inset 0 10px 25px -5px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* The Paper */}
            <div
              className="absolute left-3 right-3 top-0"
              style={{
                transform: isOut ? "translateY(0%)" : "translateY(-100%)",
                transition: isPrinting
                  ? "transform 2.5s cubic-bezier(0.65,0,0.35,1)"
                  : "transform 0.35s ease-out",
              }}
            >
              <Receipt 
                orderId={orderId} 
                amount={amount} 
                clientName={clientName}
                packageName={packageName}
                tierName={tierName}
                addOns={addOns}
                now={now} 
              />
            </div>
          </div>
          
          {stage === "complete" && (
            <p className="text-center text-[10px] mt-2 text-slate-500 uppercase tracking-widest font-bold">
              scroll to view full bill ↕
            </p>
          )}

          {/* Printer Exit Lip */}
          <div
            className="mx-6 mt-3 rounded-sm bg-slate-950 shadow-inner"
            style={{ height: 6 }}
          />
        </div>
      </div>
    </div>
  );
};

const StatusPill: React.FC<{ stage: ReceiptStage }> = ({ stage }) => {
  const label =
    stage === "idle"
      ? "Ready"
      : stage === "processing"
      ? "Processing Order"
      : stage === "printing"
      ? "Generating Invoice"
      : "Order Confirmed";

  return (
    <div className="flex items-center gap-2">
      {stage === "complete" ? (
        <CheckCircle2 size={16} className="text-success" />
      ) : stage === "idle" ? (
        <span className="w-2 h-2 rounded-full bg-slate-500" />
      ) : (
        <Loader2 size={16} className="animate-spin text-accent" />
      )}
      <span className="text-xs font-medium text-slate-300">
        {label}
      </span>
    </div>
  );
}

const Receipt: React.FC<Omit<ReceiptPrinterUIProps, 'stage'>> = ({
  orderId,
  amount,
  clientName,
  packageName,
  tierName,
  addOns,
  now
}) => {
  const upiString = `upi://pay?pa=${config.UPI_ID}&pn=${encodeURIComponent(config.BRAND_NAME)}&am=${amount}&cu=INR`;
  
  return (
    <div
      className="mx-auto px-5 pt-6 pb-8 font-mono text-xs leading-relaxed shadow-lg"
      style={{
        backgroundColor: COLORS.paper,
        color: COLORS.ink,
        clipPath:
          "polygon(0 0, 100% 0, 100% 100%, 92% 96%, 84% 100%, 76% 96%, 68% 100%, 60% 96%, 52% 100%, 44% 96%, 36% 100%, 28% 96%, 20% 100%, 12% 96%, 4% 100%, 0 96%)",
      }}
    >
      <p className="text-center font-sans font-black tracking-widest text-lg mb-1">
        {config.BRAND_NAME.toUpperCase()}
      </p>
      <p className="text-center mb-3" style={{ color: COLORS.inkSoft }}>
        Web & App Engineering
      </p>
      
      <div className="border-t border-dashed my-2" style={{ borderColor: `${COLORS.ink}55` }} />
      
      <p className="font-bold">Order Ref: {orderId}</p>
      <p>
        {now.toLocaleDateString()} ·{" "}
        {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
      {clientName && <p>Client: {clientName}</p>}

      <div className="border-t border-dashed my-2" style={{ borderColor: `${COLORS.ink}55` }} />
      
      <div className="flex justify-between mb-1">
        <span className="font-semibold pr-4">Package</span>
        <span className="text-right">{packageName}</span>
      </div>
      <div className="flex justify-between mb-1">
        <span className="pr-4">Tier</span>
        <span className="text-right">{tierName}</span>
      </div>
      
      {addOns.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold mb-1">Add-ons:</p>
          {addOns.map((addon, idx) => (
            <div key={idx} className="flex justify-between pl-2">
              <span className="text-slate-600">+ {addon.name}</span>
              <span>₹{addon.price}</span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-dashed my-2" style={{ borderColor: `${COLORS.ink}55` }} />
      
      <div className="flex justify-between font-black text-sm">
        <span>ADVANCE DUE</span>
        <span>₹{amount.toLocaleString()}</span>
      </div>
      
      <div className="border-t border-dashed my-2" style={{ borderColor: `${COLORS.ink}55` }} />

      <div className="flex flex-col items-center mt-6 mb-1">
        <div className="bg-white p-2 rounded-lg border border-slate-200">
          <QRCode value={upiString} size={110} />
        </div>
        <p className="mt-3 text-center font-bold text-sm">
          Scan to Pay Securely
        </p>
        <p className="mt-1 text-center" style={{ color: COLORS.inkSoft }}>
          UPI ID: {config.UPI_ID}
        </p>
      </div>
    </div>
  );
}
