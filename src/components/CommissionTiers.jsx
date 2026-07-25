import { Check, Envelope } from '@gravity-ui/icons';

const CommissionTiers = () => {
    const tiers = [
        {
            badge: 'ENTRY LEVEL',
            badgeBg: 'bg-cyan-300',
            title: 'SKETCH TIER',
            price: '$45+',
            eta: 'EST. 3-5 DAYS',
            desc: 'Clean linework character draft with basic grayscale value shading.',
            features: ['High-res PNG lineart', 'Rough composition sketch', '1 revision round'],
        },
        {
            badge: 'BESTSELLER',
            badgeBg: 'bg-amber-300',
            title: 'FLAT COLOR',
            price: '$85+',
            eta: 'EST. 5-7 DAYS',
            desc: 'Finished lineart filled with vibrant flat color palettes and simple backgrounds.',
            features: ['Full character lineart', 'Flat color palette', 'Transparent background', '2 revision rounds'],
            popular: true,
        },
        {
            badge: 'PREMIUM ART',
            badgeBg: 'bg-rose-300',
            title: 'FULL ILLUSTRATION',
            price: '$150+',
            eta: 'EST. 7-14 DAYS',
            desc: 'Complete detailed artwork featuring full shading, lighting effects, and rendered background.',
            features: ['Full rendered artwork', 'Detailed lighting & FX', 'Commercial license ready', '3 revision rounds'],
        },
    ];

    return (
        <section className="my-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
            {/* Warm Cream Canvas Block (Signifiya Merchandise Style) */}
            <div className="bg-[#fef3c7] border-[3px] border-black rounded-[2.5rem] p-6 sm:p-12 shadow-[8px_8px_0px_#000] relative overflow-hidden">

                {/* Signature Decorative Corner Dot */}
                <div className="w-5 h-5 rounded-full bg-amber-400 border-2 border-black mb-6 shadow-[2px_2px_0px_#000]" />

                {/* Dual-Font Header */}
                <div className="text-center mb-12">
                    <h2 className="text-black font-['Futura',sans-serif] font-black text-4xl sm:text-6xl uppercase tracking-tight flex items-center justify-center gap-3 flex-wrap">
                        <span>COMMISSION</span>
                        <span className="font-serif italic font-black text-rose-600 tracking-normal">tiers</span>
                    </h2>
                    <p className="text-black font-semibold text-xs sm:text-sm uppercase tracking-widest mt-2">
                        Select your desired complexity level & commission slot
                    </p>
                </div>

                {/* Tier Cards Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {tiers.map((tier, idx) => (
                        <div
                            key={tier.title}
                            className={`bg-white border-[3px] border-black rounded-[2rem] p-6 sm:p-8 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between relative ${
                                idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
                            }`}
                        >
                            <div>
                                {/* Pinned Top Category Badge */}
                                <div className="flex justify-between items-center mb-6">
                  <span className={`${tier.badgeBg} text-black border-2 border-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-[2px_2px_0px_#000]`}>
                    {tier.badge}
                  </span>
                                    <span className="text-xs font-black uppercase tracking-wider text-black bg-gray-100 border border-black px-2 py-0.5 rounded">
                    {tier.eta}
                  </span>
                                </div>

                                <h3 className="text-black font-['Futura',sans-serif] font-black text-2xl uppercase tracking-tight mb-2">
                                    {tier.title}
                                </h3>
                                <p className="text-gray-700 text-xs font-semibold mb-6 leading-relaxed">
                                    {tier.desc}
                                </p>

                                {/* Price Display Block */}
                                <div className="bg-[#fef9c3] border-2 border-black rounded-xl p-4 mb-6 text-center shadow-[3px_3px_0px_#000]">
                  <span className="text-black font-['Futura',sans-serif] font-black text-4xl uppercase">
                    {tier.price}
                  </span>
                                    <span className="block text-[10px] font-black uppercase text-gray-700 mt-0.5">
                    Starting Base Price
                  </span>
                                </div>

                                {/* Feature Bullet Points */}
                                <div className="space-y-3 mb-8 border-t-2 border-black/10 pt-6">
                                    {tier.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-emerald-300 text-black flex items-center justify-center border border-black shrink-0 shadow-[1px_1px_0px_#000]">
                                                <Check size={12} />
                                            </div>
                                            <span className="text-black text-xs font-bold">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Signifiya Style Solid Black Pill CTA Button */}
                            <button
                                type="button"
                                className="w-full py-3.5 px-6 rounded-full bg-black text-white font-['Futura',sans-serif] font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-rose-500 hover:text-white hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                            >
                                <Envelope size={16} /> Book This Tier
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommissionTiers;