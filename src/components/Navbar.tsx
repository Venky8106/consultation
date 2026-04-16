import { useState, useEffect } from 'react';
import { Menu, X, Check } from 'lucide-react';

interface NavbarProps {
  onBookNow: () => void;
}

const navLinks = [
  { label: 'Why This Call', href: '#why-this-call' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQs', href: '#faqs' },
];

const trustItems = [
  'Structured Process',
  'Specialist Led',
  'Candidate First',
];

export default function Navbar({ onBookNow }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/10 ${
          scrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 bg-[#0066ff] rounded-full flex items-center justify-center">
                <span className="text-white font-extrabold text-xs tracking-tight">Q</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Qual Score</span>
            </div>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-150"
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={onBookNow}
                className="hidden md:inline-flex items-center gradient-primary text-white text-sm font-bold px-5 py-2 rounded-full shadow-glow-blue animate-pulse-glow transition-all duration-150"
              >
                Book for ₹199
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-[#0d1117] border-t border-white/10 py-4 space-y-1">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="block w-full text-left px-2 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/10 mt-3">
                <button
                  onClick={() => { setMenuOpen(false); onBookNow(); }}
                  className="w-full gradient-primary text-white text-sm font-bold px-4 py-3 rounded-full shadow-glow-blue transition-all duration-150"
                >
                  Book for ₹199
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Trust bar */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-[#0066ff] text-white text-xs overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 py-2 whitespace-nowrap justify-center">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 flex-shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
