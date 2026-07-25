import { Envelope } from '@gravity-ui/icons';

const WhyCommission = () => {
  return (
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {/* Contact Block */}
        <div className="p-8 rounded-[2rem] bg-[var(--accent-3)]/15 border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] flex flex-col justify-between -rotate-1">
          <div>
            <div className="flex items-center gap-2 text-[var(--ink)] font-['Futura',sans-serif] font-black text-lg uppercase mb-2">
              <Envelope size={18} className="text-[var(--accent-1)]" /> Get In Touch
            </div>
            <p className="text-[var(--ink)] text-xs sm:text-sm font-semibold leading-relaxed mb-6">
              Have custom project requirements, commercial proposals, or questions? Drop an email directly.
            </p>
          </div>
          <a
              href="mailto:contact@example.com"
              className="w-full py-3.5 rounded-full bg-[var(--bg-surface)] text-[var(--ink)] font-body text-xs font-black uppercase tracking-widest border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] hover:bg-[var(--accent-1)] hover:text-[var(--bg-primary)] transition-all flex items-center justify-center gap-2"
          >
            <Envelope size={14} /> Send Direct Email
          </a>
        </div>

        {/* Accepted Payments Block */}
        <div className="p-8 rounded-[2rem] bg-[var(--accent-4)]/15 border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] flex flex-col justify-between rotate-1">
          <div>
            <h4 className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-lg uppercase mb-4">
              Accepted Payments
            </h4>
            <div className="space-y-2.5 mb-6">
              {['PayPal', 'Stripe', 'Ko-fi'].map((pay) => (
                  <div key={pay} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[var(--accent-1)] border border-[var(--ink)] shadow-[1px_1px_0px_var(--ink)]" />
                    <span className="text-[var(--ink)] text-xs font-black uppercase tracking-wider">{pay}</span>
                  </div>
              ))}
            </div>
          </div>
          <p className="text-[var(--ink)] text-[11px] font-semibold italic border-t-2 border-[var(--ink)]/15 pt-4">
            * 50% deposit required upon sketch approval, remaining balance due on final image completion.
          </p>
        </div>
      </div>
  );
};

export default WhyCommission;