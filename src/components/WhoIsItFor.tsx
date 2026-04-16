import { GraduationCap, Briefcase, ArrowLeftRight, TrendingDown, HelpCircle } from 'lucide-react';

const cards = [
  {
    icon: GraduationCap,
    title: 'Freshers',
    desc: 'You are applying but not getting enough visibility. Your profile may not be communicating the right signals.',
  },
  {
    icon: Briefcase,
    title: 'Early Professionals',
    desc: 'You have experience, but your profile is not converting into better opportunities or the right interviews.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Career Switchers',
    desc: 'You want to move into a new role or domain but are unsure how to position yourself for that shift.',
  },
  {
    icon: TrendingDown,
    title: 'Stuck Candidates',
    desc: 'You are putting in effort, but results are still not coming. Something is off and you cannot identify what.',
  },
  {
    icon: HelpCircle,
    title: 'Candidates Needing Clarity',
    desc: 'You need clarity before investing more time, money, or energy into your next career move.',
  },
];

export default function WhoIsItFor() {
  return (
    <section className="py-14 sm:py-20 bg-[#f0f4f8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[#0066ff] font-semibold uppercase tracking-widest text-sm mb-3">Who It's For</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
            Who should book this consultation
          </h2>
          <p className="text-[#475569] text-base max-w-lg mx-auto">
            This call is useful for candidates at different stages who need a clearer picture of where they stand.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[#0f172a] font-bold text-base mb-2">{title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
