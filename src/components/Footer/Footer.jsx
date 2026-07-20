import React from 'react';
import CcReserveDevFooter from "./CcReserveDevFooter.jsx";
import {ArrowRight, CircleFill} from "@gravity-ui/icons";

const Footer = () => {
    return (
        <div className="font-semibold bg-[#3B308F] text-white ">
            <div className="container md:flex block justify-around p-4">

                <div className="flex flex-col gap-4">
                    <p>Now, I am listening to </p>
                    <a href="#song" className="flex items-center justify-end">
                        Taylor Swift
                        <CircleFill className="mx-1 h-2"  />
                        The Fate of Ophelia
                        <ArrowRight />
                    </a>
                </div>

                <div>{/* image of something */}</div>

                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <a href="mailto:afruza.sultana2706@gmail.com">afruza.sultana2706@gmail.com</a>
                        <italic>+8801516560994</italic>
                    </div>

                    <div>
                        <span>Momo Art Book</span><br />
                        <span>1100 Dhaka</span>
                    </div>

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

            </div>
            <CcReserveDevFooter />
        </div>
    );
};

export default Footer;