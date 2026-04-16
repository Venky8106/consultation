import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Is this a job guarantee?',
    a: 'No. This is a paid consultation to understand your situation and identify what may be blocking your progress. It is not a guarantee of any job outcome.',
  },
  {
    q: 'Will I get a full QualScore report for ₹199?',
    a: 'No. The full Qual Score evaluation is a separate, structured process. This booking is only for the initial consultation and profile intake.',
  },
  {
    q: 'Who will contact me after I book?',
    a: 'A specialist from the Qual Score consultation team will reach out to you at your preferred callback time.',
  },
  {
    q: 'What will be discussed on the call?',
    a: 'Your background, current work situation, the challenge you are facing, and whether a full Qual Score evaluation would be relevant for your profile.',
  },
  {
    q: 'Is this useful for experienced candidates?',
    a: 'Yes. The consultation is structured for freshers, early professionals, and experienced candidates who are facing role stagnation, career switches, or unclear outcomes.',
  },
  {
    q: 'Is this a placement service?',
    a: 'No. Qual Score is not a placement or recruitment service. This consultation is focused on evaluation and career clarity.',
  },
];

interface FAQItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ q, a, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="text-[#0f172a] font-semibold text-sm group-hover:text-[#0066ff] transition-colors duration-150">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 bg-[#f0f4f8] border border-gray-200 rounded-full flex items-center justify-center transition-colors group-hover:border-[#0066ff]/30">
          {isOpen
            ? <Minus className="w-3 h-3 text-[#0066ff]" />
            : <Plus className="w-3 h-3 text-[#0066ff]" />}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 sm:pb-5 pr-6 sm:pr-10">
          <p className="text-[#475569] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-[#f0f4f8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-[#0066ff] font-semibold uppercase tracking-widest text-sm mb-3">FAQs</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm px-4 sm:px-6">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
