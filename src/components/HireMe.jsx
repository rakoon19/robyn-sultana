import { useState } from 'react';
import { Plus, Minus, Envelope } from '@gravity-ui/icons';

const HireMe = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How do I request a custom commission slot?',
      a: 'Send a detailed email or message containing your reference images, character descriptions, and preferred tier to lock in your slot.',
    },
    {
      q: 'What is the standard turnaround time?',
      a: 'Depending on complexity, sketches take 3-5 days, while full rendered illustrations take 7-14 business days.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'I accept payments via PayPal, Stripe, and Ko-fi with a 50% initial deposit required before sketch approval.',
    },
    {
      q: 'Can I use the commissioned artwork commercially?',
      a: 'Commercial rights can be added to any full illustration package upon agreement.',
    },
  ];

  return (
      <section id="hire-me" className="my-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-8">

        {/* FAQ Block */}
        <div className="bg-[var(--bg-primary)] text-[var(--ink)] border-3 border-[var(--ink)] rounded-[2.5rem] p-6 sm:p-12 shadow-[8px_8px_0px_var(--ink)] relative overflow-hidden transition-colors duration-300">

          {/* Signature Corner Sticker Dot */}
          <div className="w-5 h-5 rounded-full bg-purple-400 border-2 border-[var(--ink)] mb-6 shadow-[2px_2px_0px_var(--ink)]" />

          {/* Dual-Font Header */}
          <div className="text-center mb-12">
            <h2 className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-3xl sm:text-5xl uppercase tracking-tight flex items-center justify-center gap-3 flex-wrap">
              <span>FREQUENTLY</span>
              <span className="font-serif italic font-black text-purple-600 dark:text-purple-400">asked</span>
              <span>QUESTIONS</span>
            </h2>
            <p className="text-[var(--ink-muted)] font-semibold text-xs sm:text-sm uppercase tracking-widest mt-2">
              Got questions? We have answers for our community.
            </p>
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
                <div
                    key={idx}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="bg-[var(--bg-surface)] text-[var(--ink)] border-3 border-[var(--ink)] rounded-[2rem] px-6 py-4 shadow-[4px_4px_0px_var(--ink)] cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-4">
                <span className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-sm sm:text-base uppercase tracking-tight">
                  {faq.q}
                </span>
                    <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-[var(--ink)] flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_var(--ink)]">
                      {openFaq === idx ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </div>

                  {openFaq === idx && (
                      <div className="mt-4 pt-3 border-t-2 border-[var(--ink)]/10 text-[var(--ink-muted)] text-xs sm:text-sm font-semibold leading-relaxed">
                        {faq.a}
                      </div>
                  )}
                </div>
            ))}
          </div>
        </div>

      </section>
  );
};

export default HireMe;