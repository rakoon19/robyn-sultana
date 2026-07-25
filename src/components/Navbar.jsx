import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BarsDescendingAlignRight, Minus, Person } from "@gravity-ui/icons";
import { illustratorInfo } from '../config/illustrator';
import gsap from 'gsap';

const Navbar = () => {
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const underlineRef = useRef(null);
    const containerRef = useRef(null);
    const navLinksRef = useRef([]);

    const navLinks = [
        { label: 'Work', href: '/gallery' },
        { label: 'Commission', href: '/#hire-me' },
    ];

    const socialLinks = [
        { href: illustratorInfo.socials.instagram, label: "Instagram" },
        { href: illustratorInfo.socials.twitter, label: "Twitter" },
        { href: illustratorInfo.socials.pixiv, label: "Pixiv" },
        { href: illustratorInfo.socials.kofi, label: "Ko-fi" },
    ];

    const getActiveIndex = useCallback(() => {
        return navLinks.findIndex((link) => {
            if (link.href.includes('#')) {
                const [path, hash] = link.href.split('#');
                return (
                    (location.pathname === path || (path === '/' && location.pathname === '')) &&
                    location.hash === `#${hash}`
                );
            }
            return link.href === location.pathname && !location.hash;
        });
    }, [location, navLinks]);

    const animateUnderline = useCallback((index, speed = 0.3) => {
        if (isMobile || !underlineRef.current || !containerRef.current) return;

        if (index === -1) {
            gsap.to(underlineRef.current, { opacity: 0, scaleX: 0, duration: speed, ease: 'power2.out' });
            return;
        }

        const linkEl = navLinksRef.current[index];
        if (!linkEl) return;

        const textSpan = linkEl.querySelector('.nav-label');
        if (!textSpan) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const textRect = textSpan.getBoundingClientRect();

        const relativeLeft = textRect.left - containerRect.left;

        gsap.to(underlineRef.current, {
            x: relativeLeft,
            width: textRect.width,
            opacity: 1,
            scaleX: 1,
            duration: speed,
            ease: 'back.out(1.7)',
        });
    }, [isMobile]);

    useEffect(() => {
        const activeIdx = getActiveIndex();
        animateUnderline(activeIdx, 0.35);

        const handleResize = () => animateUnderline(getActiveIndex(), 0.1);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [location, getActiveIndex, animateUnderline]);

    const handleNavClick = (e, href) => {
        if (href.includes('#')) {
            const [path, hash] = href.split('#');
            const targetPath = path === '' ? '/' : path;

            if (location.pathname === targetPath) {
                e.preventDefault();
                const elem = document.getElementById(hash);
                if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${hash}`);
                }
            } else {
                e.preventDefault();
                navigate(`/#${hash}`);
            }
        }
        setMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full px-4 py-4 md:px-8 bg-[var(--bg-primary)] text-[var(--ink)] border-b-3 border-[var(--ink)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">

                {/* Logo Capsule */}
                <Link
                    to="/"
                    data-cursor="hover"
                    className="flex items-center h-12 px-6 bg-[var(--bg-surface)] text-[var(--ink)] rounded-full border-3 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_var(--ink)] transition-all duration-200"
                >
                    <span className="font-['Futura',sans-serif] font-black text-lg md:text-xl uppercase tracking-tight">
                        {illustratorInfo.name}
                    </span>
                </Link>

                {/* Floating Nav Capsule */}
                {!isMobile && (
                    <div
                        ref={containerRef}
                        className="relative flex items-center h-12 bg-[var(--bg-surface)] text-[var(--ink)] px-3 rounded-full border-3 border-[var(--ink)] shadow-[4px_4px_0px_var(--ink)]"
                        onMouseLeave={() => animateUnderline(getActiveIndex(), 0.3)}
                    >
                        {/* Dynamic Pill Indicator */}
                        <div
                            ref={underlineRef}
                            className="absolute bottom-2.5 h-[3px] bg-[var(--ink)] rounded-full opacity-0 pointer-events-none"
                            style={{ left: 0 }}
                        />

                        <ul className="flex items-center gap-2 relative z-10">
                            {navLinks.map((link, index) => {
                                const activeIdx = getActiveIndex();
                                const isActive = activeIdx === index;

                                return (
                                    <li key={index} ref={(el) => (navLinksRef.current[index] = el)}>
                                        <Link
                                            to={link.href}
                                            data-cursor="hover"
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            onMouseEnter={() => animateUnderline(index, 0.25)}
                                            className={`font-body text-xs uppercase tracking-widest px-5 py-2 block rounded-full transition-all duration-200 select-none font-black ${
                                                isActive
                                                    ? 'bg-[var(--ink)] text-[var(--bg-primary)] shadow-[2px_2px_0px_var(--ink)]'
                                                    : 'text-[var(--ink)] hover:bg-amber-300 border border-transparent hover:border-[var(--ink)]'
                                            }`}
                                        >
                                            <span className="nav-label inline-block">{link.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* About Profile Action */}
                {!isMobile && (
                    <div className="flex items-center">
                        <Link
                            to="/#about"
                            data-cursor="hover"
                            onClick={(e) => handleNavClick(e, '/#about')}
                            title="About"
                            className="group flex items-center justify-center w-12 h-12 bg-cyan-300 border-3 border-[var(--ink)] text-black rounded-full shadow-[3px_3px_0px_var(--ink)] hover:bg-rose-400 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_var(--ink)] transition-all duration-200"
                        >
                            <Person className="w-5 h-5 text-black" />
                        </Link>
                    </div>
                )}

                {/* Mobile Toggle */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="w-12 h-12 rounded-full bg-cyan-300 border-3 border-[var(--ink)] flex items-center justify-center text-black shadow-[3px_3px_0px_var(--ink)]"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <Minus className="w-5 h-5" /> : <BarsDescendingAlignRight className="w-5 h-5" />}
                    </button>
                )}
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobile && menuOpen && (
                <div className="mt-3 max-w-7xl mx-auto rounded-[2rem] bg-[var(--bg-surface)] text-[var(--ink)] border-3 border-[var(--ink)] p-6 shadow-[6px_6px_0px_var(--ink)]">
                    <ul className="flex flex-col gap-3">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link
                                    to={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="font-['Futura',sans-serif] font-black text-lg text-[var(--ink)] hover:bg-amber-300 hover:text-black block px-4 py-3 rounded-2xl border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] transition-all"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/#about"
                                onClick={(e) => handleNavClick(e, '/#about')}
                                className="font-['Futura',sans-serif] font-black text-lg text-black flex items-center gap-3 px-4 py-3 rounded-2xl bg-cyan-300 border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)]"
                            >
                                <Person className="w-5 h-5" />
                                <span>About Me</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="border-t-2 border-[var(--ink)]/15 pt-5 mt-5">
                        <p className="font-body text-[var(--ink)] text-xs uppercase tracking-widest mb-3 px-2 font-black">
                            Connect
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-xl bg-rose-300 border-2 border-[var(--ink)] text-black hover:bg-[var(--ink)] hover:text-[var(--bg-primary)] transition-all flex items-center justify-center text-xs font-black shadow-[2px_2px_0px_var(--ink)]"
                                >
                                    {social.label.charAt(0)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;