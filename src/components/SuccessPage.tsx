import { CheckCircle2, ClipboardList, PhoneCall, Compass } from 'lucide-react';
import type { FormData } from '../types';

interface SuccessPageProps {
  data: FormData;
  onBack: () => void;
}

const steps = [
  {
    icon: CheckCircle2,
    label: 'Your details will be reviewed',
    sub: 'Our team reviews your profile inputs before reaching out.',
    done: true,
  },
  {
    icon: PhoneCall,
    label: 'A specialist will contact you',
    sub: 'You will be called during your preferred callback window.',
    done: false,
  },
  {
    icon: ClipboardList,
    label: 'Your current challenge will be discussed',
    sub: 'A structured, focused conversation about your specific situation.',
    done: false,
  },
  {
    icon: Compass,
    label: 'The next step will be explained clearly',
    sub: 'You will leave the call with a clear understanding of what to do next.',
    done: false,
  },
];

export default function SuccessPage({ data, onBack }: SuccessPageProps) {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col">
      <header className="bg-[#0d1117]/90 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0066ff] rounded-full flex items-center justify-center">
            <span className="text-white font-extrabold text-xs">Q</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Qual Score</span>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-10 sm:py-16">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8 sm:mb-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#16a34a]/15 border border-[#16a34a]/25 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#16a34a]" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Your consultation request has been received
            </h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Your details have been submitted successfully. Our team will review your inputs and reach out shortly.
            </p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden mb-6">
            <div className="bg-[#16a34a]/10 border-b border-[#16a34a]/15 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">Booking Confirmed</p>
                <p className="text-white/50 text-xs mt-0.5">{data.email}</p>
              </div>
              <div className="text-right">
                <p className="text-[#16a34a] text-xs font-semibold">Payment Successful</p>
                <p className="text-white/50 text-xs">₹199 paid</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {steps.map(({ icon: Icon, label, sub, done }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    done
                      ? 'bg-[#16a34a]/15 border border-[#16a34a]/25'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${done ? 'text-[#16a34a]' : 'text-white/30'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold mb-0.5 ${done ? 'text-white' : 'text-white/50'}`}>
                      {label}
                    </p>
                    <p className="text-xs text-white/30 leading-relaxed">{sub}</p>
                  </div>
                  {done && (
                    <span className="text-[#16a34a] text-xs font-semibold flex-shrink-0 pt-0.5">Done</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl px-6 py-5 mb-6">
            <p className="text-white/70 text-sm leading-relaxed">
              Our specialist will reach out to{' '}
              <span className="font-semibold text-white">{data.fullName}</span> on{' '}
              <span className="font-semibold text-white">{data.mobile}</span> during the{' '}
              <span className="font-semibold text-white">{data.preferredCallbackTime.replace(' (9am – 12pm)', '').replace(' (12pm – 4pm)', '').replace(' (4pm – 8pm)', '').toLowerCase()}</span>{' '}
              slot.
            </p>
          </div>

          <button
            onClick={onBack}
            className="w-full gradient-primary text-white font-bold py-3.5 rounded-full shadow-glow-blue transition-all duration-150 text-sm"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
