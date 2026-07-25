import { useState, useRef, useEffect } from 'react';
import { Xmark, Sparkles } from '@gravity-ui/icons';
import gsap from 'gsap';
import { prefersReducedMotion } from '../hooks/useGSAP';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (!marqueeRef.current || prefersReducedMotion()) return;

    const tween = gsap.to(marqueeRef.current, {
      x: -marqueeRef.current.scrollWidth / 2,
      duration: 25,
      ease: 'none',
      repeat: -1,
    });

    return () => tween.kill();
  }, [isVisible]);

  const handleDismiss = () => {
    if (prefersReducedMotion()) {
      setIsVisible(false);
      sessionStorage.setItem('promoBannerDismissed', 'true');
      return;
    }

    gsap.to(containerRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsVisible(false);
        sessionStorage.setItem('promoBannerDismissed', 'true');
      },
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem('promoBannerDismissed')) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
      <section className="py-6 px-4 sm:px-6 md:px-8 bg-[var(--accent-3)]/10 border-y border-[var(--accent-3)]/30 backdrop-blur-md">
        <div
            ref={containerRef}
            className="max-w-6xl mx-auto rounded-[var(--radius-md)] bg-[var(--accent-3)] text-[var(--bg-primary)] p-6 sm:p-8 relative shadow-2xl overflow-hidden border border-[var(--accent-3)]/40"
        >
          {/* Close Button */}
          <button
              onClick={handleDismiss}
              data-cursor="hover"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--bg-primary)]/10 hover:bg-[var(--bg-primary)]/20 flex items-center justify-center text-[var(--bg-primary)] transition-all duration-200"
              aria-label="Dismiss banner"
          >
            <Xmark size={18} />
          </button>

          {/* Content Header */}
          <div className="text-center mb-6">
            <p className="text-[var(--bg-primary)] text-xs font-['Futura',sans-serif] font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
              <Sparkles size={14} /> Limited Time Offer
            </p>
            <h3 className="text-[var(--bg-primary)] font-['Futura',sans-serif] font-bold text-2xl sm:text-3xl uppercase tracking-tight mb-1">
              Commissions Now Open!
            </h3>
            <p className="text-[var(--bg-primary)]/80 text-xs sm:text-sm font-body font-semibold">
              First 5 new commissions this month receive a 10% discount.
            </p>
          </div>

          {/* Infinite Marquee Strip */}
          <div className="relative overflow-hidden bg-[var(--bg-primary)]/15 rounded-md py-3 mb-6 border border-[var(--bg-primary)]/10">
            <div
                ref={marqueeRef}
                className="flex gap-8 whitespace-nowrap"
                style={{ width: 'fit-content' }}
            >
              {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-[var(--bg-primary)] font-['Futura',sans-serif] font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2">
                <Sparkles size={12} /> COMMISSIONS OPEN <Sparkles size={12} /> LIMITED SLOTS AVAILABLE <Sparkles size={12} /> CLAIM YOUR SLOT TODAY
              </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a
                href="#commission"
                data-cursor="hover"
                className="inline-block px-8 py-3.5 bg-[var(--bg-primary)] text-[var(--accent-3)] font-['Futura',sans-serif] font-bold text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 shadow-xl active:scale-95"
            >
              View Pricing & Tiers
            </a>
          </div>
        </div>
      </section>
  );
};

export default PromoBanner;