import { useEffect, useRef } from 'react';
import { Star, TrendingUp } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Software Engineer',
    company: 'Landed at Flipkart',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: 'Offer in Hand',
    outcomeColor: 'text-[#16a34a] bg-[#16a34a]/15',
    stars: 5,
    quote: "After three rejections I had no idea what I was doing wrong. One session with Qual Score gave me complete clarity — I was underselling my impact and had no structure to my answers. Two interviews later I had an offer from Flipkart.",
  },
  {
    name: 'Sneha Reddy',
    role: 'Product Manager',
    company: 'Now at PhonePe',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: '40% Salary Jump',
    outcomeColor: 'text-[#ff7033] bg-[#ff7033]/15',
    stars: 5,
    quote: "I was getting to final rounds but kept losing offers. Qual Score identified that my positioning was completely off for PM roles. They helped me reframe my entire story. The next final round, I didn't just get the offer — I negotiated 40% higher.",
  },
  {
    name: 'Rahul Kumar',
    role: 'Frontend Developer',
    company: 'Placed at Razorpay',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: 'Dream Company',
    outcomeColor: 'text-[#0066ff] bg-[#0066ff]/15',
    stars: 5,
    quote: "The feedback was brutally honest and that's exactly what I needed. No fluff, no generic tips — they pinpointed the exact moments in my interview where I was losing the evaluator. Fixed those things and cracked Razorpay on the next attempt.",
  },
  {
    name: 'Priya Sharma',
    role: 'Data Analyst',
    company: 'Joined Meesho',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: 'Clarity Found',
    outcomeColor: 'text-[#16a34a] bg-[#16a34a]/15',
    stars: 4,
    quote: "I was so stuck in my job search. Qual Score helped me realize my resume was telling the wrong story entirely. After restructuring my narrative, I started getting callbacks from companies I thought were out of reach.",
  },
  {
    name: 'Vikram Nair',
    role: 'DevOps Engineer',
    company: 'Now at Swiggy',
    photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: 'Got the Role',
    outcomeColor: 'text-[#0066ff] bg-[#0066ff]/15',
    stars: 5,
    quote: "My technical skills were solid but I kept failing the behavioral rounds. Qual Score showed me exactly how evaluators judge culture fit and what signals I was sending wrong. Cracked Swiggy's final round on the first try after that.",
  },
  {
    name: 'Ananya Bose',
    role: 'UX Designer',
    company: 'Placed at CRED',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: 'Level Up',
    outcomeColor: 'text-[#ff7033] bg-[#ff7033]/15',
    stars: 4,
    quote: "As a designer, I struggled to articulate my process in a way that resonated with non-designers on the panel. Qual Score coached me on translating design thinking into business impact language. That shift was the difference maker.",
  },
  {
    name: 'Karan Malhotra',
    role: 'Backend Engineer',
    company: 'Landed at Zepto',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: '30% Hike',
    outcomeColor: 'text-[#16a34a] bg-[#16a34a]/15',
    stars: 5,
    quote: "I kept second-guessing myself in system design rounds. Qual Score gave me a clear framework and showed me where I was losing confidence mid-answer. Walked into Zepto's interview calm and structured — got the offer with a 30% hike.",
  },
  {
    name: 'Divya Menon',
    role: 'Business Analyst',
    company: 'Moved to Groww',
    photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: 'Offer Received',
    outcomeColor: 'text-[#0066ff] bg-[#0066ff]/15',
    stars: 4,
    quote: "I had been job hunting for 5 months with no success. Qual Score reviewed my entire interview approach and identified that I was overexplaining and burying my key points. One session changed how I communicated entirely.",
  },
  {
    name: 'Rohan Gupta',
    role: 'Mobile Developer',
    company: 'Joined Dunzo',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: 'Breakthrough',
    outcomeColor: 'text-[#ff7033] bg-[#ff7033]/15',
    stars: 5,
    quote: "The score they gave me was a wake-up call. I thought I was performing well but my actual score was 54/100. After working through their feedback, I retook the mock, scored 82, and landed two offers the following month.",
  },
  {
    name: 'Ishita Joshi',
    role: 'Marketing Manager',
    company: 'Now at Nykaa',
    photo: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    outcome: 'Dream Role',
    outcomeColor: 'text-[#16a34a] bg-[#16a34a]/15',
    stars: 5,
    quote: "I was pivoting from agency to in-house and didn't know how to position myself. Qual Score helped me build a narrative that connected my past work to what Nykaa actually needed. They didn't just prep me — they helped me understand my own value.",
  },
];

function StarRating({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? 'fill-[#ff7033] text-[#ff7033]' : 'fill-white/10 text-white/10'}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="w-[320px] sm:w-[360px] flex-shrink-0 rounded-2xl p-5 flex flex-col gap-4 border border-white/10 bg-[#131920] hover:border-white/20 transition-all duration-300 mx-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={t.photo}
            alt={t.name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-white/10"
          />
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
            <p className="text-white/45 text-xs mt-0.5">{t.role}</p>
            <p className="text-white/30 text-xs">{t.company}</p>
          </div>
        </div>
        <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${t.outcomeColor}`}>
          <TrendingUp className="w-3 h-3" />
          {t.outcome}
        </span>
      </div>

      <StarRating count={t.stars} />

      <blockquote className="text-white/65 text-sm leading-relaxed">
        "{t.quote}"
      </blockquote>
    </div>
  );
}

export default function Testimonials() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const animFrame1 = useRef<number>(0);
  const animFrame2 = useRef<number>(0);
  const pos1 = useRef(0);
  const pos2 = useRef(0);

  const row1 = [...testimonials.slice(0, 5), ...testimonials.slice(0, 5)];
  const row2 = [...testimonials.slice(5), ...testimonials.slice(5)];

  useEffect(() => {
    const speed = 0.5;

    const animRow1 = () => {
      if (!row1Ref.current) return;
      pos1.current -= speed;
      const half = row1Ref.current.scrollWidth / 2;
      if (Math.abs(pos1.current) >= half) pos1.current = 0;
      row1Ref.current.style.transform = `translateX(${pos1.current}px)`;
      animFrame1.current = requestAnimationFrame(animRow1);
    };

    const animRow2 = () => {
      if (!row2Ref.current) return;
      pos2.current += speed;
      const half = row2Ref.current.scrollWidth / 2;
      if (pos2.current >= 0) pos2.current = -half / 2;
      row2Ref.current.style.transform = `translateX(${pos2.current}px)`;
      animFrame2.current = requestAnimationFrame(animRow2);
    };

    pos2.current = -(row2Ref.current?.scrollWidth ?? 0) / 4;

    animFrame1.current = requestAnimationFrame(animRow1);
    animFrame2.current = requestAnimationFrame(animRow2);

    return () => {
      cancelAnimationFrame(animFrame1.current);
      cancelAnimationFrame(animFrame2.current);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(0,102,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(255,112,51,0.06) 0%, transparent 60%), #0d1117' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[#0066ff]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-[#ff7033]/8 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <p className="text-[#0066ff] font-semibold uppercase tracking-widest text-xs sm:text-sm mb-3">
            Real Results. Real People.
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Candidates Who Got{' '}
            <span className="text-[#ff7033]">Clarity</span>
          </h2>
          <p className="mt-4 text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            Not just prep advice — real structural feedback that changed outcomes.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0d1117, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0d1117, transparent)' }}
        />

        <div className="mb-5 overflow-hidden">
          <div ref={row1Ref} className="flex will-change-transform">
            {row1.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div ref={row2Ref} className="flex will-change-transform">
            {row2.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t, i) => (
                <img
                  key={i}
                  src={t.photo}
                  alt={t.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0d1117] flex-shrink-0"
                />
              ))}
            </div>
            <p className="text-sm text-white/60">
              <span className="text-[#16a34a] font-semibold">200+</span> candidates got clarity this quarter
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#ff7033] text-[#ff7033]" />
            ))}
            <span className="text-white/60 text-sm ml-1">4.9 / 5 average rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
