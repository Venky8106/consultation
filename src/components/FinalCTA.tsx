import { ChevronRight } from 'lucide-react';

interface FinalCTAProps {
  onBookNow: () => void;
}

export default function FinalCTA({ onBookNow }: FinalCTAProps) {
  return (
    <section className="py-14 sm:py-20 bg-[#0d1117] relative overflow-hidden">
      {/* Blue glow orb */}
      <div
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(0,102,255,0.12)', filter: 'blur(100px)' }}
      />
      {/* Orange glow orb */}
      <div
        className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,112,51,0.10)', filter: 'blur(100px)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-5">Get Started</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-5 max-w-2xl mx-auto leading-tight">
          If you want clarity before your next move, start here
        </h2>
        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-xl mx-auto">
          Book the consultation, share your details, and let our team understand what is actually blocking your progress.
        </p>
        <button
          onClick={onBookNow}
          className="inline-flex items-center justify-center gap-2 gradient-primary text-white font-bold px-8 py-4 rounded-full shadow-glow-blue animate-pulse-glow text-base w-full sm:w-auto transition-all duration-200"
        >
          Book My Consultation for ₹199
          <ChevronRight className="w-4 h-4" />
        </button>
        <p className="text-white/30 text-xs mt-5">
          No job guarantees. No false promises. Structured consultation only.
        </p>
      </div>
    </section>
  );
}
