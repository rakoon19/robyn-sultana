import React from 'react';

const CcReserveDevFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className='bg-black text-[#797979] flex justify-around text-xs'>
            <small>©{currentYear} Aardvark Book Club. All rights reserved.</small>
            <small>
                <a href="#">Design & Developed by Rahat Akondo</a>
            </small>
        </div>
    );
};

export default CcReserveDevFooter;