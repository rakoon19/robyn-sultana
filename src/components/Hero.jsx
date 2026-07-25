import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from '@gravity-ui/icons';
import { illustratorInfo } from '../config/illustrator';
import { useArtworks } from '../hooks/useArtworks';
import gsap from 'gsap';

const Hero = () => {
  const { artworks, loading } = useArtworks();
  const heroArtworks = artworks.slice(0, 4);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (loading || heroArtworks.length === 0) return;

    const cards = cardsRef.current.filter(Boolean);
    const tweens = [];

    // Smooth, slow, fluid wave-like continuous looping motion across cards
    cards.forEach((card, idx) => {
      const tween = gsap.to(card, {
        y: (idx % 2 === 0 ? -1 : 1) * 20,
        rotation: (idx % 2 === 0 ? -1 : 1) * 5,
        repeat: -1,
        yoyo: true,
        duration: 2.2,
        ease: 'sine.inOut',
        delay: idx * 0.4
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [loading, heroArtworks]);

  return (
      <section className="relative flex flex-col items-center justify-center py-20 sm:py-28 px-0 text-center bg-[var(--bg-primary)] text-[var(--ink)] border-b-3 border-[var(--ink)] overflow-hidden transition-colors duration-300">

        {/* Background Halftone Dots */}
        <div className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none bg-[radial-gradient(var(--ink)_2px,transparent_2px)] [background-size:24px_24px] transition-opacity" />

        {/* Top Left Pixelated Anime Star Vector Icon */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 pointer-events-none animate-bounce duration-1000">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="pixelated drop-shadow-[3px_3px_0px_var(--ink)]">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#ffde59" stroke="var(--ink)" strokeWidth="2" />
          </svg>
        </div>

        {/* Bottom Right Pixelated Anime Heart Vector Icon */}
        <div className="absolute bottom-10 right-8 sm:bottom-16 sm:right-16 pointer-events-none animate-pulse">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="pixelated drop-shadow-[3px_3px_0px_var(--ink)]">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#ff5757" stroke="var(--ink)" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10 w-full px-4 sm:px-6">

          {/* Location / Status Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-300 border-3 border-[var(--ink)] shadow-[4px_4px_0px_var(--ink)] -rotate-1">
            <span className="w-3 h-3 rounded-full bg-rose-500 border-2 border-[var(--ink)] animate-ping" />
            <span className="font-body text-xs font-black tracking-widest text-black uppercase">
              {illustratorInfo.location || "Available for Commissions"}
            </span>
          </div>

          {/* Oversized Name / Studio Wordmark */}
          <div className="space-y-3">
            <h1
                className="font-['Futura',sans-serif] font-black uppercase tracking-tight text-[var(--ink)] text-5xl sm:text-7xl md:text-8xl select-none leading-none drop-shadow-[4px_4px_0px_var(--shadow-drop,rgba(0,0,0,0.2))] transition-colors"
                data-cursor="hover"
            >
              {illustratorInfo.name}
            </h1>
            <p className="font-body text-[var(--ink)] text-xs sm:text-sm font-black uppercase tracking-widest bg-[var(--bg-surface)] inline-block px-4 py-1.5 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] rotate-1">
              Anime & Character Illustration Studio
            </p>
          </div>

          {/* Overlapping Infinite Wave-Motion Cards Showcase */}
          <div className="py-8 relative w-full flex justify-center">
            {loading ? (
                <div className="flex gap-4 animate-pulse justify-center">
                  {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="w-48 h-60 bg-[var(--bg-surface)] rounded-3xl border-3 border-[var(--ink)] shadow-[5px_5px_0px_var(--ink)]" />
                  ))}
                </div>
            ) : heroArtworks.length > 0 ? (
                <div className="relative flex items-center justify-center py-4">
                  <div className="flex items-center justify-center -space-x-12 sm:-space-x-16">
                    {heroArtworks.map((art, idx) => {
                      const imageSrc = art.image || art.imageUrl || art.cover || art.url;
                      const baseRotationsClass = ['-rotate-6', 'rotate-3', '-rotate-3', 'rotate-6'];
                      const zIndices = [10, 20, 30, 40];

                      return (
                          <div
                              key={art._id || art.id || idx}
                              ref={(el) => (cardsRef.current[idx] = el)}
                              className={`w-44 sm:w-60 aspect-[4/5] bg-[var(--bg-surface)] rounded-[2rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] overflow-hidden origin-bottom ${baseRotationsClass[idx]}`}
                              style={{ zIndex: zIndices[idx] }}
                          >
                            <div className="w-full h-full bg-[var(--bg-surface)] overflow-hidden m-0 p-0">
                              {imageSrc ? (
                                  <img
                                      src={imageSrc}
                                      alt="Artwork"
                                      className="w-full h-full object-cover m-0 p-0 block pointer-events-none"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-art.png";
                                      }}
                                  />
                              ) : (
                                  <div className="w-full h-full flex items-center justify-center font-['Futura',sans-serif] font-black text-xs uppercase text-[var(--ink)]">
                                    Art 0{idx + 1}
                                  </div>
                              )}
                            </div>
                          </div>
                      );
                    })}
                  </div>
                </div>
            ) : (
                <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border-3 border-[var(--ink)] shadow-[5px_5px_0px_var(--ink)] text-center">
                  <p className="font-['Futura',sans-serif] text-xs font-black uppercase text-[var(--ink)]">
                    Welcome to the studio archive
                  </p>
                </div>
            )}
          </div>

          {/* Emotion-Driven Tagline Box */}
          <div className="max-w-2xl mx-auto bg-[var(--bg-surface)] text-[var(--ink)] p-6 sm:p-8 rounded-[2rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] rotate-1 transition-colors">
            <p className="font-body text-sm sm:text-base font-black leading-relaxed uppercase tracking-wider">
              Breathing soul into lines, shadows, and color — crafting expressive character worlds that evoke raw emotion and unforgettable stories.
            </p>
          </div>

          {/* Interactive CTA Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">

            {/* Primary Action Button */}
            <a
                href="#featured"
                data-cursor="hover"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--ink)] text-[var(--bg-primary)] font-['Futura',sans-serif] font-black text-xs uppercase tracking-widest border-3 border-[var(--ink)] shadow-[5px_5px_0px_var(--ink)] hover:bg-purple-600 hover:text-white hover:shadow-[8px_8px_0px_var(--ink)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Explore Featured <ArrowRight size={16} />
            </a>

            {/* Secondary Gallery Button */}
            <Link
                to="/gallery"
                data-cursor="hover"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-300 text-black font-['Futura',sans-serif] font-black text-xs uppercase tracking-widest border-3 border-[var(--ink)] shadow-[5px_5px_0px_var(--ink)] hover:bg-cyan-300 hover:shadow-[8px_8px_0px_var(--ink)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> Full Gallery
            </Link>

          </div>

        </div>
      </section>
  );
};

export default Hero;