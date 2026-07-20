import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { navLinks } from "../../public/constants/data.js";
import { BarsDescendingAlignRight, Minus } from "@gravity-ui/icons";

const Navbar = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [menuOpen, setMenuOpen] = useState(false);

    const socialLinks = [
        { href: "#instagram", icon: "/assets/instagram-logo.svg", alt: "Instagram logo" },
        { href: "#tiktok", icon: "/assets/tiktok-logo.svg", alt: "TikTok logo" },
    ];

    return (
        <div className="sticky top-0 z-50 bg-white mx-5 my-2.5">
            <div className="flex justify-between items-center">
                <div className="logo text-2xl text-center text-[#3B308F] font-bold">
                    Robyn Sultana
                </div>

                {/* Desktop Navigation Links */}
                {!isMobile && (
                    <ul className="flex items-center justify-center gap-4">
                        {navLinks.map((link, index) => (
                            <li key={index} className="bg-fuchsia-500 text-white font-semibold border-0 rounded-full text-center p-2.5">
                                <a href={link}>{link}</a>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Social Icons — desktop only, mobile moves these into the dropdown */}
                {!isMobile && (
                    <ul className="flex gap-4">
                        {socialLinks.map((social, index) => (
                            <li key={index} className="bg-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center">
                                <a href={social.href} className="w-6 h-6 flex items-center justify-center">
                                    <img src={social.icon} alt={social.alt} className="w-full h-full object-contain invert brightness-0" />
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="bg-fuchsia-500 text-white flex items-center gap-2.5 font-semibold border-0 rounded-full text-center p-2.5 cursor-pointer"
                    >
                        {menuOpen ? 'Close' : 'Menu'}
                        {menuOpen ? <Minus /> : <BarsDescendingAlignRight />}
                    </button>
                )}
            </div>

            {/* Mobile Dropdown Menu — overlays content below, links + socials fit-content, left-aligned */}
            {isMobile && menuOpen && (
                <ul className="absolute right-0 top-full flex flex-col items-end gap-2.5 mt-2.5 p-2.5 shadow-lg rounded-full w-fit">
                    {navLinks.map((link, index) => (
                        <li
                            key={index}
                            className="w-fit bg-fuchsia-500 text-white font-semibold border-0 rounded-full text-center p-2.5"
                        >
                            <a href={link} onClick={() => setMenuOpen(false)}>{link}</a>
                        </li>
                    ))}
                    {socialLinks.map((social, index) => (
                        <li
                            key={`social-${index}`}
                            className="w-fit bg-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center p-1"
                        >
                            <a href={social.href} onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center">
                                <img src={social.icon} alt={social.alt} className="w-full h-full object-contain invert brightness-0" />
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Navbar;