import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StickyMobileCTAProps {
  onBookNow: () => void;
}

export default function StickyMobileCTA({ onBookNow }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-[#0d1117]/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
        <p className="text-white/60 text-xs text-center mb-2">Ready to get clarity?</p>
        <button
          onClick={onBookNow}
          className="w-full gradient-primary text-white font-bold py-3.5 rounded-full shadow-glow-blue transition-all duration-150 flex items-center justify-center gap-2 text-sm"
        >
          Book Consultation for ₹199
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
