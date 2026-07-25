import React, { useRef, useEffect } from 'react';
import { Sparkles, Cpu, Layers, Brush, Star } from '@gravity-ui/icons';
import { useScrollReveal, createIdleLoop } from '../hooks/useGSAP';
import { getSectionBg } from '../utils/sectionStyles';
import { illustratorInfo } from '../config/illustrator';

const About = () => {
  const contentRef = useRef(null);
  const decorRef = useRef(null);
  const avatarRef = useRef(null);
  useScrollReveal(contentRef);

  useEffect(() => {
    if (decorRef.current) {
      createIdleLoop(decorRef.current, 'rotation', 12, 1);
    }
    if (avatarRef.current) {
      createIdleLoop(avatarRef.current, 'y', 6, 2.5);
    }
  }, []);

  return (
      <section id="about" className={`py-24 px-4 sm:px-6 md:px-8 ${getSectionBg(3)} rounded-[2rem] overflow-hidden relative border-3 border-[var(--ink)] shadow-[8px_8px_0px_var(--ink)]`}>
        {/* Background Decorative Ambient Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--accent-2)]/15 blur-[100px] rounded-full pointer-events-none -z-10" />

        {/* Animated Floating Star Decor */}
        <div ref={decorRef} className="absolute top-8 right-8 text-[var(--ink)] pointer-events-none">
          <Sparkles size={48} />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-2)] text-[var(--bg-primary)] font-body text-xs font-black uppercase tracking-widest border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] -rotate-1 mb-4">
            <Sparkles size={14} /> Behind the Canvas
          </span>
            <h2 className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-4xl sm:text-6xl uppercase tracking-tighter">
              About Me
            </h2>
          </div>

          {/* Content Grid */}
          <div ref={contentRef} className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">

            {/* Left Column: Bio & Avatar */}
            <div className="md:col-span-7 flex flex-col gap-6">
              {/* Bio Section */}
              <div className="bg-[var(--bg-surface)] p-8 sm:p-10 rounded-[1.5rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] relative group hover:-translate-y-1 transition-transform">
                <p className="text-[var(--ink)] text-base sm:text-lg leading-relaxed font-semibold">
                  {illustratorInfo.longBio}
                </p>
              </div>

              {/* Illustrator Avatar Card (Image Only) */}
              <div ref={avatarRef} className="bg-[var(--accent-1)]/10 p-6 sm:p-8 rounded-[1.5rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                  <Star size={120} />
                </div>

                <div className="relative w-40 h-40 sm:w-48 sm:h-48 shrink-0 rounded-2xl border-3 border-[var(--ink)] bg-[var(--bg-surface)] overflow-hidden shadow-[4px_4px_0px_var(--ink)] rotate-2">
                  <img
                      src={illustratorInfo.avatar.url || "/avatar-placeholder.png"}
                      alt={illustratorInfo.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Tools & Details Column */}
            <div className="md:col-span-5 space-y-6">

              {/* Tools Pill Cloud */}
              <div className="p-6 sm:p-8 rounded-[1.5rem] bg-[var(--bg-surface)] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)]">
                <h3 className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Cpu size={18} className="text-[var(--accent-1)]" /> Creative Arsenal
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {illustratorInfo.tools.map((tool, idx) => (
                      <span
                          key={tool}
                          data-cursor="hover"
                          className={`px-3.5 py-1.5 bg-[var(--bg-primary)] border-2 border-[var(--ink)] text-[var(--ink)] font-body text-xs font-black uppercase tracking-wider rounded-full hover:bg-[var(--accent-1)] hover:text-[var(--bg-primary)] hover:scale-105 transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_var(--ink)] ${
                              idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
                          }`}
                      >
                    {tool}
                  </span>
                  ))}
                </div>
              </div>

              {/* Aesthetic Style */}
              <div className="p-6 sm:p-8 rounded-[1.5rem] bg-[var(--bg-surface)] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)]">
                <h3 className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Brush size={18} className="text-[var(--accent-2)]" /> Visual Style
                </h3>
                <p className="text-[var(--ink-muted)] text-sm font-semibold leading-relaxed">
                  Specializing in anime aesthetics with a strong emphasis on expressive character dynamics and rich cinematic lighting.
                </p>
              </div>

              {/* Experience */}
              <div className="p-6 sm:p-8 rounded-[1.5rem] bg-[var(--bg-surface)] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)]">
                <h3 className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Layers size={18} className="text-[var(--accent-3)]" /> Experience
                </h3>
                <p className="text-[var(--ink-muted)] text-sm font-semibold leading-relaxed">
                  5+ years of professional digital illustration, delivering high-impact visual artwork for global clients and personal original IPs.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
  );
};

export default About;