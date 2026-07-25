import { Sparkles } from '@gravity-ui/icons';

const CommissionRoadmap = () => {
    const steps = [
        { num: '01', title: 'INQUIRY', desc: 'Send your idea, character references, and tier preference.', badge: 'STEP 1' },
        { num: '02', title: 'QUOTE & TIMELINE', desc: "Receive a custom price quote and turnaround estimate.", badge: 'STEP 2' },
        { num: '03', title: 'DEPOSIT', desc: '50% initial deposit locks in your slot on the board.', badge: 'STEP 3' },
        { num: '04', title: 'SKETCH REVIEW', desc: 'Composition and line-art review with adjustments.', badge: 'STEP 4' },
        { num: '05', title: 'FINAL DELIVERY', desc: 'High-res artwork delivered upon final payment.', badge: 'STEP 5' },
    ];

    return (
        <section className="my-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
            {/* Mint Canvas Block (Signifiya Buddy Style) */}
            <div className="bg-[#d2f3e0] border-[3px] border-black rounded-[2.5rem] p-6 sm:p-12 shadow-[8px_8px_0px_#000] relative overflow-hidden">

                {/* Signature Decorative Corner Dot */}
                <div className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-black mb-6 shadow-[2px_2px_0px_#000]" />

                {/* Dual-Font Header */}
                <div className="text-center mb-12">
                    <h2 className="text-black font-['Futura',sans-serif] font-black text-4xl sm:text-6xl uppercase tracking-tight flex items-center justify-center gap-3 flex-wrap">
                        <span>COMMISSION</span>
                        <span className="font-serif italic font-black text-emerald-700 tracking-normal lowercase">roadmap</span>
                    </h2>
                    <p className="text-black font-semibold text-xs sm:text-sm uppercase tracking-widest mt-2">
                        Clear, step-by-step workflow from initial draft to final render
                    </p>
                </div>

                {/* Event-Card Style Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    {steps.map((step, idx) => (
                        <div
                            key={step.num}
                            className={`bg-white border-[3px] border-black rounded-[1.5rem] p-5 shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between ${
                                idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
                            }`}
                        >
                            <div>
                                {/* Top Category Badge */}
                                <div className="flex justify-between items-center mb-4">
                  <span className="bg-black text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                    {step.badge}
                  </span>
                                    <span className="text-black font-black text-xl font-['Futura',sans-serif]">
                    #{step.num}
                  </span>
                                </div>

                                <h3 className="text-black font-['Futura',sans-serif] font-black text-lg uppercase tracking-wide mb-2 leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-gray-800 text-xs font-semibold leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Status Indicator Bar */}
                            <div className="mt-6 pt-3 border-t-2 border-black/10 flex items-center justify-between text-[10px] font-black text-black uppercase">
                                <span>Phase {step.num}</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 border border-black" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommissionRoadmap;