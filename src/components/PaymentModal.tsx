import { useEffect, useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Loader2, ExternalLink, Clock } from 'lucide-react';

const PAYU_URL = 'https://u.payu.in/PAYUMN/RI1lnZY6Iusq';
const CONFIRM_DELAY_MS = 10_000;

interface PaymentModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export default function PaymentModal({ onClose, onComplete }: PaymentModalProps) {
  const [paymentOpened, setPaymentOpened] = useState(false);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [countdown, setCountdown] = useState(CONFIRM_DELAY_MS / 1000);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (!paymentOpened) return;
    if (countdown <= 0) {
      setConfirmEnabled(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [paymentOpened, countdown]);

  const handleOpenPayment = () => {
    setPaymentOpened(true);
  };

  const handleConfirm = () => {
    if (!confirmEnabled) return;
    localStorage.setItem('payment_done', 'true');
    setConfirming(true);
    setTimeout(() => onComplete(), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full sm:max-w-md sm:mx-4 rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#0066ff] rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">Q</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Complete Payment</p>
              <p className="text-white/40 text-xs">Consultation Booking — ₹199</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-white/40 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Secured by PayU
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-5 py-6 space-y-5">
          <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">1:1 Consultation Call</p>
              <p className="text-white/40 text-xs mt-0.5">One-time · non-refundable</p>
            </div>
            <p className="text-white font-extrabold text-2xl">₹199</p>
          </div>

          <div className="space-y-3">
            <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border transition-all duration-200 ${
              paymentOpened
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : 'border-white/10 bg-white/[0.03]'
            }`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                paymentOpened ? 'border-emerald-400 bg-emerald-400' : 'border-white/20'
              }`}>
                {paymentOpened && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Step 1 — Pay ₹199 via PayU</p>
                <p className="text-white/40 text-xs mt-0.5">Opens a secure payment page in a new tab</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border transition-all duration-200 ${
              confirmEnabled
                ? 'border-[#0066ff]/30 bg-[#0066ff]/5'
                : 'border-white/10 bg-white/[0.03]'
            }`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                confirmEnabled ? 'border-[#0066ff] bg-[#0066ff]' : 'border-white/20'
              }`}>
                {confirmEnabled && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Step 2 — Confirm your payment</p>
                <p className="text-white/40 text-xs mt-0.5">Click below once payment is complete</p>
              </div>
            </div>
          </div>

          {paymentOpened && !confirmEnabled && (
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm bg-white/5 border border-white/10 rounded-xl py-3">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>Confirm button available in <span className="text-white font-semibold tabular-nums">{countdown}s</span></span>
            </div>
          )}

          <div className="space-y-3 pt-1">
            {!paymentOpened ? (
              <a
                href={PAYU_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOpenPayment}
                className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#0066ff]/20 flex items-center justify-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Pay ₹199 via PayU
              </a>
            ) : (
              <a
                href={PAYU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Reopen payment page
              </a>
            )}

            {confirming ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 py-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-semibold">Confirming your booking…</span>
              </div>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={!confirmEnabled}
                className={`w-full font-bold py-3.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 ${
                  confirmEnabled
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                I've Paid — Continue to Booking Form
              </button>
            )}
          </div>

          <p className="text-center text-white/25 text-xs leading-relaxed">
            After completing payment, click "I've Paid" to access the booking form.
          </p>
        </div>
      </div>
    </div>
  );
}
