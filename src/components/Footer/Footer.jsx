import React, { useEffect, useRef } from 'react';
import { Sparkles, Star, PaperPlane } from '@gravity-ui/icons';
import gsap from 'gsap';
import { illustratorInfo } from '../../config/illustrator';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const stickerRefs = useRef([]);

    const socialLinks = [
        {
            label: "Discord",
            href: illustratorInfo.socials.discord || "#",
            rotation: "-rotate-4",
            bg: "bg-amber-300"
        },
        {
            label: "Twitter",
            href: illustratorInfo.socials.twitter,
            rotation: "rotate-3",
            bg: "bg-cyan-300"
        },
        {
            label: "Instagram",
            href: illustratorInfo.socials.instagram,
            rotation: "-rotate-2",
            bg: "bg-rose-300"
        },
        {
            label: "YouTube",
            href: illustratorInfo.socials.youtube || "#",
            rotation: "rotate-5",
            bg: "bg-purple-300"
        },
    ];

    useEffect(() => {
        stickerRefs.current.forEach((el, index) => {
            if (!el) return;
            gsap.to(el, {
                y: index % 2 === 0 ? -6 : 6,
                rotation: `+=${index % 2 === 0 ? 1 : -1}`,
                duration: 3 + index,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });
    }, []);

    return (
        <footer className="w-full px-4 sm:px-6 md:px-8 my-8">
            <div className="w-full bg-[var(--bg-primary)] text-[var(--ink)] border-3 border-[var(--ink)] rounded-[2.5rem] p-8 sm:p-16 shadow-[8px_8px_0px_var(--ink)] relative overflow-hidden transition-colors duration-300">

                {/* Background Halftone / Floating Decorative Elements */}
                <div className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none bg-[radial-gradient(var(--ink)_2px,transparent_2px)] [background-size:24px_24px] transition-opacity" />
                <div className="absolute top-6 right-10 text-2xl animate-bounce pointer-events-none">
                    <Sparkles className="w-6 h-6 text-[var(--ink)]" />
                </div>
                <div className="absolute bottom-10 left-12 text-2xl animate-pulse pointer-events-none">
                    <Star className="w-6 h-6 text-[var(--ink)]" />
                </div>

                {/* Decorative Sticker Dot */}
                <div className="w-5 h-5 rounded-full bg-purple-400 border-2 border-[var(--ink)] mb-8 shadow-[2px_2px_0px_var(--ink)] relative z-10" />

                {/* Contact & Social Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">

                    {/* Mission Control Contact Card */}
                    <div className="flex flex-col justify-between gap-4 bg-[var(--bg-surface)] text-[var(--ink)] p-6 sm:p-8 rounded-[2rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] transition-colors">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-300 border-2 border-[var(--ink)] text-black text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 shadow-[2px_2px_0px_var(--ink)]">
                                <PaperPlane className="w-3.5 h-3.5" /> Send Me a Work
                            </div>
                            <a
                                href={`mailto:${illustratorInfo.email}`}
                                className="font-['Futura',sans-serif] text-[var(--ink)] hover:text-purple-600 transition-colors text-xl sm:text-2xl font-black underline block break-all mb-2"
                            >
                                {illustratorInfo.email}
                            </a>
                        </div>
                    </div>

                    {/* Cute Text-Only Social Sticker Cards */}
                    <div className="flex flex-col justify-between gap-4 bg-[var(--bg-surface)] text-[var(--ink)] p-6 sm:p-8 rounded-[2rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] transition-colors">
                        <p className="font-body text-[var(--ink)] text-xs uppercase tracking-widest font-black flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" /> Follow My Chaos <Sparkles className="w-3.5 h-3.5" />
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    ref={(el) => (stickerRefs.current[index] = el)}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex items-center justify-center p-4 rounded-2xl ${social.bg} border-3 border-[var(--ink)] text-black shadow-[4px_4px_0px_var(--ink)] hover:-translate-y-3 hover:shadow-[6px_8px_0px_var(--ink)] hover:rotate-6 transition-all duration-200 ${social.rotation}`}
                                >
                                    <span className="font-['Futura',sans-serif] text-xs font-black uppercase tracking-wider group-hover:scale-110 transition-transform duration-200">
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Handcrafted Divider */}
                <div className="flex items-center justify-center gap-3 my-8 text-[var(--ink)] font-black text-sm tracking-widest">
                    <span className="w-12"></span>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left bg-[var(--bg-surface)] text-[var(--ink)] p-6 rounded-2xl border-3 border-[var(--ink)] shadow-[4px_4px_0px_var(--ink)] relative z-10 transition-colors">
                    <p className="font-body text-xs font-black uppercase tracking-wider">
                        © {currentYear} {illustratorInfo.name}. All rights reserved.
                    </p>
                    <p className="font-body text-xs font-black uppercase tracking-wider">
                        Crafted with Neo-Brutalist Intention.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;