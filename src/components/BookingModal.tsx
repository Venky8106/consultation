import { useState, useEffect, useRef } from 'react';
import { X, Lock, AlertCircle, ChevronRight, Loader2, ExternalLink, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { FormData } from '../types';

const PAYU_URL = 'https://u.payu.in/PAYUMN/RI1lnZY6Iusq';

const GAS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwr5G-30WOY0RU08Kt0h2zvhUvZfTN7ZhA_Ur4MZl-F9bFoKbCzGAbVt0bUV44x1o77/exec';

const CONFIRM_DELAY_MS = 12_000;
const FORM_STORAGE_KEY = 'booking_form_data';

interface BookingModalProps {
  onClose: () => void;
  onSuccess: (data: FormData) => void;
}

const inputCls =
  'w-full bg-[#0d1117] border border-white/10 text-white placeholder-white/25 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff]/60 transition-colors duration-150';

const selectCls =
  'w-full bg-[#0d1117] border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff]/30 focus:border-[#0066ff]/60 transition-colors duration-150 appearance-none pr-8';

const labelCls = 'block text-white/70 font-semibold text-xs uppercase tracking-wider mb-1.5';
const errCls = 'mt-1 flex items-center gap-1 text-red-400 text-xs';

const ChevronDown = () => (
  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

type Errors = Partial<Record<keyof FormData, string>>;

function validate(d: FormData): Errors {
  const e: Errors = {};
  if (!d.fullName.trim()) e.fullName = 'Full name is required';
  if (!d.mobile.trim() || !/^\d{10}$/.test(d.mobile.trim())) e.mobile = 'Enter a valid 10-digit number';
  if (!d.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Enter a valid email address';
  if (!d.graduationYear.trim() || !/^\d{4}$/.test(d.graduationYear.trim())) e.graduationYear = 'Enter a valid year (e.g. 2022)';
  if (!d.currentStatus) e.currentStatus = 'Please select your status';
  if (!d.workExperience) e.workExperience = 'Please select your experience';
  if (!d.currentTargetRole.trim()) e.currentTargetRole = 'Please enter your current or target role';
  if (!d.mainProblem) e.mainProblem = 'Please select your main problem';
  if (!d.preferredCallbackTime) e.preferredCallbackTime = 'Please select a preferred time';
  return e;
}

type Step = 'form' | 'payment' | 'confirming';

export default function BookingModal({ onClose, onSuccess }: BookingModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState<FormData>(() => {
    const saved = localStorage.getItem(FORM_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved) as FormData; } catch {}
    }
    return {
      fullName: '', mobile: '', email: '', graduationYear: '',
      currentStatus: '', workExperience: '', currentTargetRole: '',
      mainProblem: '', preferredCallbackTime: '', additionalContext: '',
    };
  });
  const [errors, setErrors] = useState<Errors>({});
  const [paymentOpened, setPaymentOpened] = useState(false);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [countdown, setCountdown] = useState(CONFIRM_DELAY_MS / 1000);
  const [submitError, setSubmitError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const paymentOpenedRef = useRef(false);
  const confirmEnabledRef = useRef(false);
  const handleConfirmPaymentRef = useRef<() => Promise<void>>();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (!paymentOpened) return;
    if (countdown <= 0) {
      setConfirmEnabled(true);
      confirmEnabledRef.current = true;
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [paymentOpened, countdown]);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(() => {
        const firstErr = scrollRef.current?.querySelector('[data-error]') as HTMLElement;
        firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    setStep('confirming');
    setSubmitError('');

    try {
      const { error } = await supabase
        .from('consultation_leads')
        .insert({
          full_name: form.fullName.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim(),
          graduation_year: form.graduationYear.trim(),
          current_status: form.currentStatus,
          work_experience: form.workExperience,
          current_target_role: form.currentTargetRole.trim(),
          main_problem: form.mainProblem,
          preferred_callback_time: form.preferredCallbackTime,
          additional_context: form.additionalContext?.trim() || '',
          payment_status: 'pending',
        });

      if (error) throw error;

      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));

      setStep('payment');
    } catch {
      setSubmitError('Something went wrong. Please try again.');
      setStep('form');
    }
  };

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && paymentOpenedRef.current) {
        setConfirmEnabled(true);
        confirmEnabledRef.current = true;
        setCountdown(0);
        setTimeout(() => handleConfirmPaymentRef.current?.(), 800);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const handleConfirmPayment = async () => {
    if (!confirmEnabledRef.current && !confirmEnabled) return;
    setStep('confirming');

    try {
      await supabase
        .from('consultation_leads')
        .update({ payment_status: 'success' })
        .eq('email', form.email.trim())
        .eq('payment_status', 'pending');

      const params = new URLSearchParams({
        fullName: form.fullName.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        graduationYear: form.graduationYear.trim(),
        currentStatus: form.currentStatus,
        workExperience: form.workExperience,
        currentTargetRole: form.currentTargetRole.trim(),
        mainProblem: form.mainProblem,
        preferredCallbackTime: form.preferredCallbackTime,
        additionalContext: form.additionalContext?.trim() || '',
        submittedAt: new Date().toISOString(),
      });
      await fetch(`${GAS_ENDPOINT}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      localStorage.removeItem(FORM_STORAGE_KEY);
      onSuccess(form);
    } catch {
      setSubmitError('Could not confirm your booking. Please contact us directly.');
      setStep('payment');
    }
  };

  handleConfirmPaymentRef.current = handleConfirmPayment;

  const errEl = (field: keyof FormData) =>
    errors[field] ? (
      <p data-error className={errCls}>
        <AlertCircle className="w-3 h-3 flex-shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const errBorder = (field: keyof FormData) =>
    errors[field] ? 'border-red-500/50 focus:border-red-400 focus:ring-red-500/20' : '';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={step === 'confirming' ? undefined : onClose}
      />

      <div className="relative z-10 w-full sm:max-w-2xl sm:mx-4 flex flex-col max-h-[95dvh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 flex-shrink-0">
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              {step === 'payment' ? 'Complete Payment' : 'Book Your Consultation'}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {step === 'form' && 'Fill in your details to proceed to payment'}
              {step === 'payment' && 'Pay ₹199 to confirm your booking'}
              {step === 'confirming' && 'Confirming your booking…'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-white/40 text-xs">
              {step === 'payment' ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Secured by PayU
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  Secure & Confidential
                </>
              )}
            </div>
            {step !== 'confirming' && (
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {step === 'confirming' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-5">
            <Loader2 className="w-10 h-10 text-[#0066ff] animate-spin" />
            <div className="text-center">
              <p className="text-white font-bold text-base mb-1">Confirming your booking</p>
              <p className="text-white/40 text-sm">Please wait a moment…</p>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-5">
            {submitError && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {submitError}
              </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">1:1 Consultation Call</p>
                <p className="text-white/40 text-xs mt-0.5">One-time · non-refundable</p>
              </div>
              <p className="text-white font-extrabold text-2xl">₹199</p>
            </div>

            <div className="space-y-3">
              <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border transition-all duration-200 ${
                paymentOpened ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/10 bg-white/[0.03]'
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
                confirmEnabled ? 'border-[#0066ff]/30 bg-[#0066ff]/5' : 'border-white/10 bg-white/[0.03]'
              }`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  confirmEnabled ? 'border-[#0066ff] bg-[#0066ff]' : 'border-white/20'
                }`}>
                  {confirmEnabled && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Step 2 — Return to this tab</p>
                  <p className="text-white/40 text-xs mt-0.5">Booking confirms automatically when you come back</p>
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
                  onClick={() => { setPaymentOpened(true); paymentOpenedRef.current = true; }}
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

              <button
                onClick={handleConfirmPayment}
                disabled={!confirmEnabled}
                className={`w-full font-bold py-3.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 ${
                  confirmEnabled
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                I've Paid — Confirm Booking
              </button>
            </div>

            <p className="text-center text-white/25 text-xs leading-relaxed">
              Your booking will be confirmed automatically when you return to this tab after payment.
            </p>
          </div>
        )}

        {step === 'form' && (
          <>
            <div ref={scrollRef} className="overflow-y-auto flex-1 px-5 sm:px-6 py-5">
              {submitError && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-4 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {submitError}
                </div>
              )}
              <form onSubmit={handleFormSubmit} id="booking-form">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input type="text" placeholder="Your full name" value={form.fullName} onChange={set('fullName')}
                      className={`${inputCls} ${errBorder('fullName')}`} />
                    {errEl('fullName')}
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number</label>
                    <input type="tel" placeholder="10-digit mobile number" value={form.mobile} onChange={set('mobile')}
                      maxLength={10} className={`${inputCls} ${errBorder('mobile')}`} />
                    {errEl('mobile')}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelCls}>Email ID</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')}
                      className={`${inputCls} ${errBorder('email')}`} />
                    {errEl('email')}
                  </div>
                  <div>
                    <label className={labelCls}>Year of Graduation</label>
                    <input type="text" placeholder="e.g. 2022" value={form.graduationYear} onChange={set('graduationYear')}
                      className={`${inputCls} ${errBorder('graduationYear')}`} maxLength={4} />
                    {errEl('graduationYear')}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelCls}>Current Status</label>
                    <div className="relative">
                      <select value={form.currentStatus} onChange={set('currentStatus')}
                        className={`${selectCls} ${errBorder('currentStatus')}`}>
                        <option value="">Select status</option>
                        <option>Student</option>
                        <option>Fresher</option>
                        <option>Working Professional</option>
                        <option>Career Break</option>
                        <option>Job Switch</option>
                      </select>
                      <ChevronDown />
                    </div>
                    {errEl('currentStatus')}
                  </div>
                  <div>
                    <label className={labelCls}>Work Experience</label>
                    <div className="relative">
                      <select value={form.workExperience} onChange={set('workExperience')}
                        className={`${selectCls} ${errBorder('workExperience')}`}>
                        <option value="">Select experience</option>
                        <option>Fresher</option>
                        <option>0–1 years</option>
                        <option>1–3 years</option>
                        <option>3–5 years</option>
                        <option>5+ years</option>
                      </select>
                      <ChevronDown />
                    </div>
                    {errEl('workExperience')}
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelCls}>Current / Target Role</label>
                  <input type="text" placeholder="e.g. Software Engineer, Product Manager, Data Analyst"
                    value={form.currentTargetRole} onChange={set('currentTargetRole')}
                    className={`${inputCls} ${errBorder('currentTargetRole')}`} />
                  {errEl('currentTargetRole')}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelCls}>Main Problem</label>
                    <div className="relative">
                      <select value={form.mainProblem} onChange={set('mainProblem')}
                        className={`${selectCls} ${errBorder('mainProblem')}`}>
                        <option value="">Select your main problem</option>
                        <option>Not getting shortlisted</option>
                        <option>Not getting interview calls</option>
                        <option>Interviews not converting</option>
                        <option>Career switch confusion</option>
                        <option>Profile clarity issue</option>
                        <option>Need direction</option>
                      </select>
                      <ChevronDown />
                    </div>
                    {errEl('mainProblem')}
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Callback Time</label>
                    <div className="relative">
                      <select value={form.preferredCallbackTime} onChange={set('preferredCallbackTime')}
                        className={`${selectCls} ${errBorder('preferredCallbackTime')}`}>
                        <option value="">Select preferred time</option>
                        <option>Morning (9am – 12pm)</option>
                        <option>Afternoon (12pm – 4pm)</option>
                        <option>Evening (4pm – 8pm)</option>
                      </select>
                      <ChevronDown />
                    </div>
                    {errEl('preferredCallbackTime')}
                  </div>
                </div>

                <div className="mb-2">
                  <label className={labelCls}>
                    Additional Context{' '}
                    <span className="text-white/25 font-normal normal-case tracking-normal">Optional</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you are currently facing or what you want clarity on…"
                    value={form.additionalContext}
                    onChange={set('additionalContext')}
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </form>
            </div>

            <div className="flex-shrink-0 border-t border-white/10 px-5 sm:px-6 py-4 bg-[#0a0f17]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white/60 text-xs">Consultation Booking</p>
                  <p className="text-white/30 text-[11px]">1:1 specialist call · non-refundable</p>
                </div>
                <p className="text-white font-extrabold text-xl">₹199</p>
              </div>
              <button
                type="submit"
                form="booking-form"
                className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#0066ff]/20 transition-all duration-200 text-sm flex items-center justify-center gap-2"
              >
                Save Details & Proceed to Pay
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-center text-white/25 text-[11px] mt-2.5 leading-relaxed">
                Your details are saved first, then you'll be taken to complete payment.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
