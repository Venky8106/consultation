import { CreditCard, ClipboardList, Search, PhoneCall, Compass } from 'lucide-react';

const steps = [
  {
    icon: CreditCard,
    number: '01',
    title: 'Pay ₹199',
    desc: 'Complete the secure payment to confirm your consultation booking.',
  },
  {
    icon: ClipboardList,
    number: '02',
    title: 'Fill your details',
    desc: 'Share your background, status, experience, and the main challenge you are facing.',
  },
  {
    icon: Search,
    number: '03',
    title: 'Internal review happens',
    desc: 'Your profile inputs are reviewed by the team before the specialist reaches out.',
  },
  {
    icon: PhoneCall,
    number: '04',
    title: 'Specialist contacts you',
    desc: 'A Qual Score specialist calls you at your preferred time to discuss your situation.',
  },
  {
    icon: Compass,
    number: '05',
    title: 'You get clarity on the next step',
    desc: 'Understand your likely blocker and receive a clear, structured recommendation.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-[#f0f4f8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[#0066ff] font-semibold uppercase tracking-widest text-sm mb-3">The Process</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
            How the process works
          </h2>
          <p className="text-[#475569] text-sm sm:text-base max-w-md mx-auto">
            Five straightforward steps from booking to your consultation call.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map(({ icon: Icon, number, title, desc }, i) => (
            <div key={i} className="flex gap-4 sm:gap-6 relative">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 gradient-primary rounded-full flex items-center justify-center shadow-glow-blue z-10 relative">
                  <span className="text-white font-extrabold text-sm">{number}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[#0066ff]/20 my-1" style={{ minHeight: '2rem' }} />
                )}
              </div>
              <div className={`pb-8 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                <span className="text-[10px] font-bold text-[#94a3b8] tracking-widest uppercase">Step {number}</span>
                <h3 className="text-[#0f172a] font-bold text-sm sm:text-base mt-0.5 mb-1 leading-snug">{title}</h3>
                <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
