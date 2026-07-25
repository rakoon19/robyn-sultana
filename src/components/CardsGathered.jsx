import { useRef } from 'react';
import { ArrowRight, Layers } from '@gravity-ui/icons';
import { useStaggerReveal } from '../hooks/useGSAP';
import { getSectionBg } from '../utils/sectionStyles';
import { useArtworks } from '../hooks/useArtworks';

const CardsGathered = () => {
  const containerRef = useRef(null);
  useStaggerReveal(containerRef);
  const { artworks, loading } = useArtworks();

  const categories = ['original', 'fanart', 'commissions', 'sketches'];
  const collections = categories.map((cat) => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: artworks.filter((a) => a.category === cat).length,
  }));

  if (loading) {
    return (
        <section className={`py-20 px-6 ${getSectionBg(2)} rounded-[2rem] text-center border-3 border-[var(--ink)] shadow-[8px_8px_0px_var(--ink)]`}>
          <div className="inline-flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[var(--accent-2)] animate-ping" />
            <p className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-xs uppercase tracking-widest">
              Loading Collections...
            </p>
          </div>
        </section>
    );
  }

  return (
      <section className={`py-20 px-4 sm:px-6 md:px-8 ${getSectionBg(2)} rounded-[2rem] relative border-3 border-[var(--ink)] shadow-[8px_8px_0px_var(--ink)]`}>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-2)] text-[var(--bg-primary)] font-body text-xs font-black uppercase tracking-widest border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] -rotate-1 mb-4">
            <Layers size={14} /> Curated Repositories
          </span>
            <h2 className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-4xl sm:text-6xl uppercase tracking-tighter mb-3">
              Collections
            </h2>
            <p className="text-[var(--ink-muted)] text-base sm:text-lg font-semibold">
              Browse artwork organized by category and creative style.
            </p>
          </div>

          {/* Stacked Cards */}
          <div ref={containerRef} className="space-y-5">
            {collections.map((collection, idx) => (
                <a
                    key={collection.id}
                    href={`/gallery?category=${collection.id}`}
                    data-card
                    data-cursor="hover"
                    className="group relative block p-6 sm:p-8 rounded-[1.5rem] bg-[var(--bg-surface)] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] hover:shadow-[10px_10px_0px_var(--ink)] hover:-translate-y-1 transition-all duration-200"
                    style={{
                      transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
                      zIndex: collections.length - idx,
                    }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-3xl font-['Futura',sans-serif] font-black text-[var(--ink)] uppercase tracking-tight group-hover:text-[var(--accent-1)] transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-[var(--ink-muted)] font-body text-xs font-black uppercase tracking-wider mt-1">
                        {collection.count} {collection.count === 1 ? 'Artwork' : 'Artworks'}
                      </p>
                    </div>

                    {/* Arrow Button */}
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-1)] text-[var(--bg-primary)] border-2 border-[var(--ink)] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[3px_3px_0px_var(--ink)]">
                      <ArrowRight size={22} />
                    </div>
                  </div>
                </a>
            ))}
          </div>
        </div>
      </section>
  );
};

export default CardsGathered;