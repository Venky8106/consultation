import { useState, forwardRef } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { FormData } from '../types';

interface BookingFormProps {
  onSuccess: (data: FormData) => void;
}

const input =
  'w-full bg-white border border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors duration-150';

const selectWrap = 'relative';
const select =
  'w-full bg-white border border-[#E2E8F0] text-[#0F172A] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors duration-150 appearance-none pr-8';

const label = 'block text-[#0F172A] font-semibold text-sm mb-1.5';
const errText = 'mt-1 flex items-center gap-1 text-red-500 text-xs';

const ChevronDown = () => (
  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const BookingForm = forwardRef<HTMLElement, BookingFormProps>(({ onSuccess }, ref) => {
  const [form, setForm] = useState<FormData>({
    fullName: '', mobile: '', email: '', graduationYear: '',
    currentStatus: '', workExperience: '', currentTargetRole: '',
    mainProblem: '', preferredCallbackTime: '', additionalContext: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErr = document.querySelector('[data-error]') as HTMLElement;
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    await supabase.from('consultation_leads').insert({
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
      payment_status: 'success',
    });
    localStorage.removeItem('payment_done');
    onSuccess(form);
  };

  const err = (field: keyof FormData) =>
    errors[field] ? (
      <p data-error className={errText}>
        <AlertCircle className="w-3 h-3 flex-shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const errBorder = (field: keyof FormData) =>
    errors[field] ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : '';

  return (
    <>
      <section id="booking-form" ref={ref as React.Ref<HTMLElement>} className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-3">Complete Your Booking</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
              Complete your booking request
            </h2>
            <p className="text-[#475569] text-base max-w-lg mx-auto">
              Share a few details so our specialist can understand your situation before the call.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[#0F172A] font-semibold text-sm">Consultation Booking</p>
                <p className="text-[#475569] text-xs mt-0.5">₹199 — One-time, non-refundable</p>
              </div>
              <div className="flex items-center gap-1.5 text-[#475569] text-xs">
                <Lock className="w-3 h-3" />
                Secure & Confidential
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={label}>Full Name</label>
                  <input type="text" placeholder="Your full name" value={form.fullName} onChange={set('fullName')}
                    className={`${input} ${errBorder('fullName')}`} />
                  {err('fullName')}
                </div>
                <div>
                  <label className={label}>Phone Number</label>
                  <input type="tel" placeholder="10-digit mobile number" value={form.mobile} onChange={set('mobile')}
                    maxLength={10} className={`${input} ${errBorder('mobile')}`} />
                  {err('mobile')}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={label}>Email ID</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')}
                    className={`${input} ${errBorder('email')}`} />
                  {err('email')}
                </div>
                <div>
                  <label className={label}>Year of Graduation</label>
                  <input type="text" placeholder="e.g. 2022" value={form.graduationYear} onChange={set('graduationYear')}
                    className={`${input} ${errBorder('graduationYear')}`} maxLength={4} />
                  {err('graduationYear')}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={label}>Current Status</label>
                  <div className={selectWrap}>
                    <select value={form.currentStatus} onChange={set('currentStatus')}
                      className={`${select} ${errBorder('currentStatus')}`}>
                      <option value="">Select status</option>
                      <option>Student</option>
                      <option>Fresher</option>
                      <option>Working Professional</option>
                      <option>Career Break</option>
                      <option>Job Switch</option>
                    </select>
                    <ChevronDown />
                  </div>
                  {err('currentStatus')}
                </div>
                <div>
                  <label className={label}>Work Experience</label>
                  <div className={selectWrap}>
                    <select value={form.workExperience} onChange={set('workExperience')}
                      className={`${select} ${errBorder('workExperience')}`}>
                      <option value="">Select experience</option>
                      <option>Fresher</option>
                      <option>0–1 years</option>
                      <option>1–3 years</option>
                      <option>3–5 years</option>
                      <option>5+ years</option>
                    </select>
                    <ChevronDown />
                  </div>
                  {err('workExperience')}
                </div>
              </div>

              <div className="mb-5">
                <label className={label}>Current / Target Role</label>
                <input type="text" placeholder="e.g. Software Engineer, Product Manager, Data Analyst"
                  value={form.currentTargetRole} onChange={set('currentTargetRole')}
                  className={`${input} ${errBorder('currentTargetRole')}`} />
                {err('currentTargetRole')}
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={label}>Main Problem</label>
                  <div className={selectWrap}>
                    <select value={form.mainProblem} onChange={set('mainProblem')}
                      className={`${select} ${errBorder('mainProblem')}`}>
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
                  {err('mainProblem')}
                </div>
                <div>
                  <label className={label}>Preferred Callback Time</label>
                  <div className={selectWrap}>
                    <select value={form.preferredCallbackTime} onChange={set('preferredCallbackTime')}
                      className={`${select} ${errBorder('preferredCallbackTime')}`}>
                      <option value="">Select preferred time</option>
                      <option>Morning (9am – 12pm)</option>
                      <option>Afternoon (12pm – 4pm)</option>
                      <option>Evening (4pm – 8pm)</option>
                    </select>
                    <ChevronDown />
                  </div>
                  {err('preferredCallbackTime')}
                </div>
              </div>

              <div className="mb-7">
                <label className={label}>
                  Additional Context{' '}
                  <span className="text-[#94A3B8] font-normal text-xs ml-1">Optional</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe what you are currently facing or what you want clarity on…"
                  value={form.additionalContext}
                  onChange={set('additionalContext')}
                  className={`${input} resize-none`}
                />
              </div>

              <div className="border-t border-[#E2E8F0] pt-6">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-5 py-4 mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[#0F172A] font-semibold text-sm">Consultation Booking</p>
                    <p className="text-[#475569] text-xs mt-0.5">1:1 specialist consultation call</p>
                  </div>
                  <p className="text-[#0F172A] font-bold text-xl">₹199</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-md shadow-[#2563EB]/20 text-base mb-3"
                >
                  Pay ₹199 and Book Consultation
                </button>

                <p className="text-center text-[#475569] text-xs leading-relaxed">
                  Your submitted details help our specialist team prepare before the consultation.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
});

BookingForm.displayName = 'BookingForm';
export default BookingForm;
