import React from 'react';
import CcReserveDevFooter from "./CcReserveDevFooter.jsx";
import { ArrowRight, CircleFill } from "@gravity-ui/icons";

const Footer = () => {
    return (
        <div className="font-semibold bg-[#3B308F] text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-around items-center md:items-start gap-8 md:gap-4 p-6 md:p-4 text-center md:text-left">

                <div className="flex flex-col gap-4 items-center md:items-start">
                    <p>Now, I am listening to</p>
                    <a href="#song" className="flex flex-wrap items-center justify-center md:justify-end gap-1">
                        Taylor Swift
                        <CircleFill className="mx-1 h-2" />
                        The Fate of Ophelia
                        <ArrowRight />
                    </a>
                </div>

                <div className="hidden md:block">{/* image of something */}</div>

                <div className="flex flex-col gap-6 md:gap-8 items-center md:items-start">
                    <div className="flex flex-col gap-1 items-center md:items-start">
                        <a href="mailto:afruza.sultana2706@gmail.com">afruza.sultana2706@gmail.com</a>
                        <i>+8801516560994</i>
                    </div>

                    <div>
                        <span>Momo Art Book</span><br />
                        <span>1100 Dhaka</span>
                    </div>

                    <ul className="flex gap-4">
                        <li className="bg-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center">
                            <a href="#instagram" className="w-6 h-6 flex items-center justify-center">
                                <img src="/assets/instagram-logo.svg" alt="Instagram logo" className="w-full h-full object-contain invert brightness-0" />
                            </a>
                        </li>
                        <li className="bg-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center">
                            <a href="#tiktok" className="w-6 h-6 flex items-center justify-center">
                                <img src="/assets/tiktok-logo.svg" alt="TikTok logo" className="w-full h-full object-contain invert brightness-0" />
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
            <CcReserveDevFooter />
        </div>
    );
};

export default Footer;