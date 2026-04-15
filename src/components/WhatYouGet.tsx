import { FileSearch, MessageSquare, Lightbulb, CheckSquare, Navigation } from 'lucide-react';

const benefits = [
  {
    icon: FileSearch,
    title: 'Pre-call profile review',
    desc: 'Your submitted details are reviewed internally before the specialist connects with you.',
  },
  {
    icon: MessageSquare,
    title: 'Problem discovery discussion',
    desc: 'A structured conversation focused on understanding your current situation and challenge.',
  },
  {
    icon: Lightbulb,
    title: 'Basic direction on what may be going wrong',
    desc: 'An honest assessment of the likely blockers based on your profile and experience level.',
  },
  {
    icon: CheckSquare,
    title: 'QualScore relevance check',
    desc: 'You will understand clearly whether a full Qual Score evaluation is suited for your case.',
  },
  {
    icon: Navigation,
    title: 'Clear next-step recommendation',
    desc: 'Walk away with a structured view of what to focus on or consider as your next step.',
  },
];

export default function WhatYouGet() {
  return (
    <section className="py-14 sm:py-20 bg-[#0d1117] relative overflow-hidden">
      {/* Radial glow for atmosphere */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)' }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[#0066ff] font-semibold uppercase tracking-widest text-sm mb-3">What's Included</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            What is included in this booking
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 mb-8">
          {benefits.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="glass-card rounded-xl px-5 py-4 flex items-start gap-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#ff7033]/10 border border-[#ff7033]/20 rounded-xl px-5 py-4 flex items-start gap-3">
            <span className="text-[#ff7033] text-base mt-0.5 flex-shrink-0">—</span>
            <p className="text-sm text-[#ff7033] font-medium leading-relaxed">
              This is a short paid consultation, not a full evaluation. The objective is to understand your situation and decide the right next step together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
