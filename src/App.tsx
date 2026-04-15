import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhoIsItFor from './components/WhoIsItFor';
import WhatYouGet from './components/WhatYouGet';
import WhatThisIsNot from './components/WhatThisIsNot';
import HowItWorks from './components/HowItWorks';
import WhyMatters from './components/WhyMatters';
import AboutQualScore from './components/AboutQualScore';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Testimonials from './components/Testimonials';
import StickyMobileCTA from './components/StickyMobileCTA';
import BookingModal from './components/BookingModal';
import SuccessPage from './components/SuccessPage';
import type { FormData } from './types';

export default function App() {
  const [successData, setSuccessData] = useState<FormData | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const openBooking = () => setShowBooking(true);
  const closeBooking = () => setShowBooking(false);

  const handleSuccess = (data: FormData) => {
    setShowBooking(false);
    setSuccessData(data);
  };

  useEffect(() => {
    if (successData) {
      setShowToast(true);
      const t = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(t);
    }
  }, [successData]);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (successData) {
    return (
      <>
        <SuccessPage
          data={successData}
          onBack={() => {
            setSuccessData(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
            showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3 bg-[#16a34a] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg shadow-[#16a34a]/30 whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            Booking confirmed! We'll contact you shortly.
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-[#0d1117]">
      {showBooking && (
        <BookingModal onClose={closeBooking} onSuccess={handleSuccess} />
      )}

      <Navbar onBookNow={openBooking} />

      <main className="pt-[calc(3.5rem+1.5rem)]">
        <Hero onBookNow={openBooking} onHowItWorks={scrollToHowItWorks} />
        <WhoIsItFor />
        <WhatYouGet />
        <WhatThisIsNot />
        <HowItWorks />
        <Testimonials />
        <WhyMatters />
        <AboutQualScore />
        <FAQ />
        <FinalCTA onBookNow={openBooking} />
      </main>

      <footer className="bg-[#0a0f17] border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#0066ff] rounded-full flex items-center justify-center">
                <span className="text-white font-extrabold text-xs">Q</span>
              </div>
              <span className="text-white font-bold text-base tracking-tight">Qual Score</span>
            </div>
            <p className="text-white/30 text-sm text-center">
              Structured career evaluation for serious candidates.
            </p>
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Qual Score
            </p>
          </div>
        </div>
      </footer>

      <StickyMobileCTA onBookNow={openBooking} />
    </div>
  );
}
