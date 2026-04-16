import { BarChart2, MessageSquare, Award, FileText } from 'lucide-react';

const dimensions = [
  { icon: BarChart2, label: 'Technical readiness' },
  { icon: MessageSquare, label: 'Communication clarity' },
  { icon: Award, label: 'Overall employability' },
  { icon: FileText, label: 'Profile credibility' },
];

export default function AboutQualScore() {
  return (
    <section className="py-14 sm:py-20 bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <p className="text-[#0066ff] text-sm font-semibold uppercase tracking-widest mb-3">About</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5">
              What is Qual Score
            </h2>
          </div>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
            Qual Score is a structured evaluation system designed to help candidates present themselves with greater clarity across technical, communication, and overall employability dimensions.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {dimensions.map(({ icon: Icon, label }, i) => (
              <div key={i} className="glass-card rounded-xl flex items-center gap-3 px-5 py-4">
                <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium text-sm">{label}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#0066ff]/10 border border-[#0066ff]/20 rounded-xl px-6 py-5">
            <p className="text-white text-sm leading-relaxed font-medium">
              This ₹199 consultation helps determine whether that deeper evaluation process is relevant for your case — before you commit to anything further.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
