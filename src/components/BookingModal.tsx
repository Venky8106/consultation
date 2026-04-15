import { useState, useEffect, useRef } from 'react';
import { X, Lock, AlertCircle, ChevronRight } from 'lucide-react';
import PaymentModal from './PaymentModal';
import type { FormData } from '../types';

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

export default function BookingModal({ onClose, onSuccess }: BookingModalProps) {
  const [form, setForm] = useState<FormData>({
    fullName: '', mobile: '', email: '', graduationYear: '',
    currentStatus: '', workExperience: '', currentTargetRole: '',
    mainProblem: '', preferredCallbackTime: '', additionalContext: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPayment, setShowPayment] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
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
    setShowPayment(true);
  };

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
    <>
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onComplete={() => {
            setShowPayment(false);
            onSuccess(form);
          }}
        />
      )}

      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative z-10 w-full sm:max-w-2xl sm:mx-4 flex flex-col max-h-[95dvh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 flex-shrink-0">
            <div>
              <p className="text-white font-bold text-sm leading-tight">Book Your Consultation</p>
              <p className="text-white/40 text-xs mt-0.5">Fill your details to proceed to payment</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-white/40 text-xs">
                <Lock className="w-3 h-3" />
                Secure & Confidential
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

          <div ref={scrollRef} className="overflow-y-auto flex-1 px-5 sm:px-6 py-5">
            <form onSubmit={handleSubmit} id="booking-form">
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
              className="w-full gradient-primary text-white font-bold py-3.5 rounded-xl shadow-glow-blue transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              Proceed to Payment
              <ChevronRight className="w-4 h-4" />
            </button>
            <p className="text-center text-white/25 text-[11px] mt-2.5 leading-relaxed">
              Your details help our specialist prepare before the call.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
