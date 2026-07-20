import React from 'react';

const CcReserveDevFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className='bg-black text-[#797979] md:flex block justify-around text-xs'>
            <small>©{currentYear} Aardvark Book Club. All rights reserved.</small> <br />
            <small>
                <a href="#">Design & Developed by Rahat Akondo</a>
            </small>
        </div>
    );
};

export default CcReserveDevFooter;