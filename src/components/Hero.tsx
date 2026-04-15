import { ChevronRight, Zap } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
  onHowItWorks: () => void;
}

const avatarColors = [
  { bg: 'bg-[#0066ff]', initials: 'AK' },
  { bg: 'bg-[#ff7033]', initials: 'SR' },
  { bg: 'bg-[#16a34a]', initials: 'MP' },
  { bg: 'bg-[#ff4d80]', initials: 'RV' },
];

export default function Hero({ onBookNow, onHowItWorks }: HeroProps) {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden bg-[#0d1117]">
      {/* Blue glow orb top-left */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'rgba(0,102,255,0.15)', filter: 'blur(120px)' }}
      />
      {/* Orange glow orb bottom-right */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,112,51,0.12)', filter: 'blur(120px)' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-24">
        {/* Urgency pill */}
        <div className="inline-flex items-center gap-2 bg-[#ff4d80]/15 text-[#ff4d80] border border-[#ff4d80]/30 rounded-full text-xs font-semibold px-3 py-1 mb-6">
          <Zap className="w-3 h-3" />
          Only ₹199 · Limited Spots
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
          Know Exactly What's Blocking Your Career
        </h1>

        <p
          className="text-2xl sm:text-3xl md:text-4xl font-black mb-5"
          style={{ color: '#ff7033', textShadow: '0 0 30px rgba(255,112,51,0.4)' }}
        >
          Stop Guessing. Get Clarity.
        </p>

        <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Understand what is actually blocking your job applications or career movement, and whether Qual Score can help.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
          <button
            onClick={onBookNow}
            className="inline-flex items-center justify-center gap-2 gradient-primary text-white font-bold px-8 py-4 rounded-full shadow-glow-blue animate-pulse-glow text-base w-full sm:w-auto transition-all duration-200"
          >
            Book Consultation for ₹199
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onHowItWorks}
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-base w-full sm:w-auto hover:bg-white/5 transition-all duration-200"
          >
            See How It Works
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex -space-x-2">
            {avatarColors.map(({ bg, initials }) => (
              <div
                key={initials}
                className={`w-8 h-8 ${bg} rounded-full border-2 border-[#0d1117] flex items-center justify-center text-white text-xs font-bold`}
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-sm">
            <span className="text-[#16a34a] font-bold">200+ candidates</span>
            <span className="text-white/50"> understood their blocker</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          <div className="glass-card rounded-xl px-4 py-4 text-center">
            <p className="text-2xl font-extrabold text-white">200+</p>
            <p className="text-white/50 text-xs mt-1">Candidates</p>
          </div>
          <div className="glass-card rounded-xl px-4 py-4 text-center">
            <p className="text-2xl font-extrabold text-white">₹199</p>
            <p className="text-white/50 text-xs mt-1">One-time</p>
          </div>
          <div className="glass-card rounded-xl px-4 py-4 text-center">
            <p className="text-2xl font-extrabold text-white">1:1</p>
            <p className="text-white/50 text-xs mt-1">Specialist Call</p>
          </div>
        </div>
      </div>
    </section>
  );
}
