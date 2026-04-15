import { useEffect, useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

const PAYU_URL = 'https://u.payu.in/PAYUMN/grfShF4TxmMq';

interface PaymentModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function PaymentModal({ onClose, onComplete }: PaymentModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleComplete = () => {
    setConfirming(true);
    setTimeout(() => onComplete(), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 flex flex-col w-full h-full sm:max-w-2xl sm:mx-auto sm:my-6 sm:rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-white border-b border-[#E2E8F0] flex items-center justify-between px-5 py-3.5 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">Q</span>
            </div>
            <div>
              <p className="text-[#0F172A] font-semibold text-sm leading-tight">Secure Payment</p>
              <p className="text-[#475569] text-xs">Consultation Booking — ₹199</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[#475569] text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              Secured by PayU
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] transition-colors border border-[#E2E8F0]"
              aria-label="Close payment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-[#F8FAFC] min-h-0">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#F8FAFC]">
              <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
              <p className="text-[#475569] text-sm font-medium">Loading payment page…</p>
            </div>
          )}
          <iframe
            src={PAYU_URL}
            title="PayU Payment"
            className="w-full h-full border-0"
            onLoad={() => setIframeLoaded(true)}
            allow="payment"
          />
        </div>

        <div className="bg-white border-t border-[#E2E8F0] px-5 py-4 flex-shrink-0">
          {confirming ? (
            <div className="flex items-center justify-center gap-2 text-[#16A34A] py-1">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm font-semibold">Confirming your booking…</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleComplete}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold py-3 rounded-xl transition-colors duration-150 text-sm shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                I have completed the payment
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto text-[#475569] hover:text-[#0F172A] text-sm font-medium py-3 px-5 rounded-xl hover:bg-[#F8FAFC] border border-[#E2E8F0] transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          )}
          <p className="text-center text-[#94A3B8] text-xs mt-3">
            Complete the payment above, then click the button to confirm your booking.
          </p>
        </div>
      </div>
    </div>
  );
}
