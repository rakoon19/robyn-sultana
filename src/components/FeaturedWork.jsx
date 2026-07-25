import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from '@gravity-ui/icons';
import { SECTION_THEMES } from '../utils/sectionStyles';
import { useArtworks } from '../hooks/useArtworks';
import { getResizedImageUrl } from './ArtworkCard'; // Import your resize helper

const FeaturedWork = () => {
  const { artworks, loading: isLoading } = useArtworks();
  const theme = SECTION_THEMES.featured;

  const displayArtworks = artworks.length > 0
      ? artworks.filter(art => art.isFeatured || art.featured).length > 0
          ? artworks.filter(art => art.isFeatured || art.featured)
          : artworks.slice(0, 2)
      : [];

  return (
      <section id="featured" className={`py-16 sm:py-20 px-4 sm:px-6 md:px-8 ${theme.bg} rounded-[2.5rem] border-3 border-[var(--ink)] shadow-[8px_8px_0px_var(--ink)] relative overflow-hidden transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.badgeBg} ${theme.badgeText} font-body text-xs font-black uppercase tracking-widest border-2 border-[var(--ink)] shadow-[3px_3px_0px_var(--ink)] -rotate-1 mb-4`}>
                <Sparkles size={14} /> Selected Portfolio
              </span>
              <h2 className="text-[var(--ink)] font-['Futura',sans-serif] font-black text-4xl sm:text-6xl uppercase tracking-tighter">
                Featured Work
              </h2>
            </div>
            <p className="text-[var(--ink-muted)] text-base font-semibold max-w-md">
              A curated showcase of key commissions, original character art, and personal visual concepts.
            </p>
          </div>

          {isLoading && (
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2].map((n) => (
                    <div key={n} className="bg-[var(--bg-surface)] rounded-[2rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] p-4 animate-pulse">
                      <div className="aspect-[4/3] bg-[var(--ink)]/10 rounded-xl border-2 border-[var(--ink)] mb-4" />
                      <div className="h-6 bg-[var(--ink)]/10 rounded w-1/2 mb-2" />
                      <div className="h-4 bg-[var(--ink)]/10 rounded w-3/4" />
                    </div>
                ))}
              </div>
          )}

          {!isLoading && displayArtworks.length === 0 && (
              <div className="bg-[var(--bg-surface)] p-12 rounded-[2rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] text-center">
                <p className="text-[var(--ink-muted)] font-['Futura',sans-serif] font-black text-xl uppercase tracking-wider mb-4">
                  No featured artworks found
                </p>
                <Link
                    to="/gallery"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-1)] text-[var(--bg-primary)] font-['Futura',sans-serif] font-black text-xs uppercase tracking-widest border-2 border-[var(--ink)] shadow-[4px_4px_0px_var(--ink)] hover:-translate-y-0.5 transition-all"
                >
                  Browse Full Gallery <ArrowRight size={16} />
                </Link>
              </div>
          )}

          {!isLoading && displayArtworks.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {displayArtworks.map((art, idx) => {
                  const rawImageSrc = art.image || art.imageUrl || art.cover || art.url;
                  // Resize featured image to appropriate dimensions
                  const imageSrc = getResizedImageUrl(rawImageSrc, { width: 900, height: 700, crop: 'fill' });

                  return (
                      <div
                          key={art._id || art.id || idx}
                          className={`group bg-[var(--bg-surface)] rounded-[2rem] border-3 border-[var(--ink)] shadow-[6px_6px_0px_var(--ink)] hover:shadow-[10px_10px_0px_var(--ink)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden ${
                              idx % 2 === 0 ? '-rotate-1' : 'rotate-1'
                          }`}
                      >
                        <div className="aspect-[4/3] bg-[var(--bg-primary)] relative overflow-hidden border-b-3 border-[var(--ink)]">
                          {imageSrc ? (
                              <img
                                  src={imageSrc}
                                  alt={art.title || "Artwork"}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/placeholder-art.png";
                                  }}
                              />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[var(--accent-2)]/20 text-[var(--ink)] font-black text-xs uppercase">
                                Image Not Available
                              </div>
                          )}
                          {art.category && (
                              <span className="absolute top-4 left-4 px-3 py-1 bg-[var(--bg-surface)] border-2 border-[var(--ink)] rounded-full text-xs font-black uppercase tracking-wider text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]">
                        {art.category}
                      </span>
                          )}
                        </div>
                        <div className="p-6 sm:p-8 flex items-center justify-between">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-['Futura',sans-serif] font-black text-[var(--ink)] uppercase">
                              {art.title || "Untitled Artwork"}
                            </h3>
                            {art.description && (
                                <p className="text-[var(--ink-muted)] text-sm font-semibold mt-1">
                                  {art.description}
                                </p>
                            )}
                          </div>
                          <Link
                              to={`/gallery`}
                              aria-label="View Artwork"
                              className="w-12 h-12 rounded-2xl bg-[var(--accent-1)] text-[var(--bg-primary)] border-2 border-[var(--ink)] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[3px_3px_0px_var(--ink)] shrink-0 ml-4"
                          >
                            <ArrowRight size={20} />
                          </Link>
                        </div>
                      </div>
                  );
                })}
              </div>
          )}
        </div>
      </section>
  );
};

export default FeaturedWork;