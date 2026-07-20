import React from 'react';
import {navLinks} from "../../public/constants/data.js";

const Navbar = () => {
    return (
        <div className="flex justify-between mx-5 my-2.5">

            <div className="logo text-2xl text-center text-[#3B308F] font-bold">Robyn Sultana</div>

            <ul className="flex items-center justify-center gap-4">
            {navLinks.map((link, index) => (
                    <li key={index} className="bg-fuchsia-500 text-white font-semibold border-0 rounded-full text-center p-2.5">
                        <a href={link}>
                            {link}
                        </a>
                    </li>
            ))}
            </ul>

            <ul className="flex gap-4">
                <li className="bg-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center ">
                    <a href="#instagram" className="w-6 h-6 flex items-center justify-center">
                        <img src="/assets/instagram-logo.svg" alt="Instagram logo" className="w-full h-full object-contain invert brightness-0" />
                    </a>
                </li>
                <li className="bg-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center ">
                    <a href="#tiktok" className="w-6 h-6 flex items-center justify-center">
                        <img src="/assets/tiktok-logo.svg" alt="TikTok logo" className="w-full h-full object-contain invert brightness-0" />
                    </a>
                </li>
            </ul>

        </div>
    );
};

export default Navbar;