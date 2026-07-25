import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Palette, Xmark, Sparkles } from '@gravity-ui/icons';
import gsap from 'gsap';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'cyberDark';
  });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const orbRefs = useRef([]);

  // 4 Distinct Themes (2 Dark, 2 Light)
  const themes = useMemo(
      () => ({
        cyberDark: {
          label: 'Cyber Pink (Dark)',
          color: '#FF3B5C',
          isDark: true,
          vars: {
            '--bg-primary': '#0B0B0F',
            '--bg-surface': '#16161D',
            '--ink': '#F5F3EF',
            '--ink-muted': '#A6A4B0',
            '--accent-1': '#FF3B5C',
            '--accent-2': '#7C5CFF',
            '--accent-3': '#FFC94A',
            '--accent-4': '#3CD6C4',
          },
        },
        matrixGreen: {
          label: 'Neon Matrix (Dark)',
          color: '#00FF88',
          isDark: true,
          vars: {
            '--bg-primary': '#05140C',
            '--bg-surface': '#0C2417',
            '--ink': '#E0FFE8',
            '--ink-muted': '#62B880',
            '--accent-1': '#00FF88',
            '--accent-2': '#00D9FF',
            '--accent-3': '#FFD700',
            '--accent-4': '#FF0088',
          },
        },
        solarWarm: {
          label: 'Solar Amber (Light)',
          color: '#F59E0B',
          isDark: false,
          vars: {
            '--bg-primary': '#FBF7F0',
            '--bg-surface': '#F0EAE1',
            '--ink': '#1C1917',
            '--ink-muted': '#78716C',
            '--accent-1': '#E11D48',
            '--accent-2': '#C97706',
            '--accent-3': '#F59E0B',
            '--accent-4': '#6366F1',
          },
        },
        sakuraGlow: {
          label: 'Sakura Glow (Light)',
          color: '#FF69B4',
          isDark: false,
          vars: {
            '--bg-primary': '#FEF8F5',
            '--bg-surface': '#FAE8E0',
            '--ink': '#4A4A4A',
            '--ink-muted': '#8B7B7B',
            '--accent-1': '#FF69B4',
            '--accent-2': '#DDA0DD',
            '--accent-3': '#FFB6C1',
            '--accent-4': '#87CEEB',
          },
        },
      }),
      []
  );

  // Sync variables to root
  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme.vars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      localStorage.setItem('portfolio-theme', currentTheme);
    }
  }, [currentTheme, themes]);

  // Click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
          buttonRef.current &&
          !buttonRef.current.contains(e.target) &&
          menuRef.current &&
          !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Arc Fan Animation
  useEffect(() => {
    const themeEntries = Object.entries(themes);
    const radius = 120;
    const startAngle = Math.PI; // 180°
    const endAngle = (3 * Math.PI) / 2; // 270°

    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power3.out',
      });

      themeEntries.forEach(([key], index) => {
        const step = (endAngle - startAngle) / (themeEntries.length - 1);
        const angle = startAngle + index * step;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (orbRefs.current[index]) {
          gsap.fromTo(
              orbRefs.current[index],
              { x: 0, y: 0, scale: 0, opacity: 0 },
              {
                x: x,
                y: y,
                scale: 1,
                opacity: 1,
                duration: 0.4,
                delay: index * 0.04,
                ease: 'back.out(2)',
              }
          );
        }
      });
    } else {
      themeEntries.forEach(([key], index) => {
        if (orbRefs.current[index]) {
          gsap.to(orbRefs.current[index], {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            duration: 0.2,
            delay: (themeEntries.length - 1 - index) * 0.02,
            ease: 'power2.in',
          });
        }
      });

      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 0.7,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [isOpen, themes]);

  const activeTheme = themes[currentTheme] || themes.cyberDark;

  return (
      <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
        {/* ARC MENU CONTAINER */}
        <div
            ref={menuRef}
            className="absolute pointer-events-none opacity-0 scale-75 flex items-center justify-center"
            style={{ width: '300px', height: '300px' }}
        >
          <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
              viewBox="0 0 300 300"
          >
            <path
                d="M 30 150 A 120 120 0 0 1 150 30"
                fill="none"
                stroke={activeTheme.color}
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
            />
          </svg>

          {Object.entries(themes).map(([key, theme], index) => {
            const isSelected = currentTheme === key;

            return (
                <button
                    key={key}
                    ref={(el) => (orbRefs.current[index] = el)}
                    onClick={() => {
                      setCurrentTheme(key);
                      setIsOpen(false);
                    }}
                    title={theme.label}
                    data-cursor="hover"
                    className="absolute w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-125 focus:outline-none group z-20"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${theme.color}, ${
                          theme.isDark ? '#0B0B0F' : '#E0E0E0'
                      })`,
                      boxShadow: `0 0 16px ${theme.color}70`,
                      border: isSelected ? '2.5px solid #FFFFFF' : '1px solid rgba(255,255,255,0.3)',
                    }}
                >
                  <div
                      className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        border: `2px solid ${theme.color}`,
                        boxShadow: `0 0 10px ${theme.color}`,
                      }}
                  />

                  <div className="absolute right-14 whitespace-nowrap bg-black/90 text-white font-mono text-[11px] px-3 py-1 rounded-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.color }} />
                    {theme.label} {isSelected && <Sparkles size={10} />}
                  </div>

                  <div
                      className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                          isSelected ? 'bg-white scale-125 shadow-[0_0_8px_#fff]' : 'bg-white/60'
                      }`}
                  />
                </button>
            );
          })}
        </div>

        {/* MAIN TRIGGER BUTTON */}
        <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Theme Selector"
            data-cursor="hover"
            className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none z-30 group"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${activeTheme.color}, #050508)`,
              boxShadow: `0 0 25px ${activeTheme.color}80`,
              border: '2px solid rgba(255,255,255,0.3)',
            }}
        >
          <div
              className={`absolute inset-[-6px] rounded-full border-2 border-dashed transition-all duration-500 pointer-events-none ${
                  isOpen ? 'rotate-180 scale-110 opacity-100' : 'rotate-0 opacity-40 group-hover:opacity-80'
              }`}
              style={{
                borderColor: activeTheme.color,
                animation: 'spinTech 12s linear infinite',
              }}
          />

          <div className="relative z-10 flex items-center justify-center text-white select-none">
            {isOpen ? <Xmark size={22} /> : <Palette size={24} />}
          </div>
        </button>

        <style>{`
        @keyframes spinTech {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      </div>
  );
};

export default ThemeSwitcher;