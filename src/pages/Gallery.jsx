import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtworkCard from '../components/ArtworkCard';
import ImageModal from '../components/ImageModal';
import { useArtworks } from '../hooks/useArtworks';

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const { artworks, loading, error } = useArtworks();

  const selectedCategory = searchParams.get('category');
  const selectedSort = searchParams.get('sort') || 'date-desc';

  const categories = useMemo(() => {
    const uniqueCats = [...new Set(artworks.map((art) => art.category).filter(Boolean))];
    return ['all', ...uniqueCats];
  }, [artworks]);

  const filteredArtworks = useMemo(() => {
    let filtered = artworks;

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter((art) => art.category === selectedCategory);
    }

    return [...filtered].sort((a, b) => {
      if (selectedSort === 'date-desc') return new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0);
      if (selectedSort === 'date-asc') return new Date(a.createdAt || a.date || 0) - new Date(b.createdAt || b.date || 0);
      if (selectedSort === 'title-asc') return (a.title || '').localeCompare(b.title || '');
      if (selectedSort === 'title-desc') return (b.title || '').localeCompare(a.title || '');
      return 0;
    });
  }, [artworks, selectedCategory, selectedSort]);

  const handleCategoryChange = (category) => {
    setSearchParams({
      category: category === 'all' ? '' : category,
      sort: selectedSort,
    });
  };

  const handleSortChange = (sort) => {
    setSearchParams({
      category: selectedCategory || '',
      sort,
    });
  };

  return (
      <section className="my-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Main Canvas Container */}
        <div className="bg-[var(--bg-primary)] text-[var(--ink)] border-3 border-[var(--ink)] rounded-[2.5rem] p-6 sm:p-12 shadow-[8px_8px_0px_var(--ink)] relative overflow-hidden transition-colors duration-300">

          {/* Signature Decorative Corner Dot */}
          <div className="w-5 h-5 rounded-full bg-indigo-400 border-2 border-[var(--ink)] mb-6 shadow-[2px_2px_0px_var(--ink)]" />

          {/* Dual-Font Header */}
          <div className="text-center mb-12">
            <h1 className="font-['Futura',sans-serif] font-black uppercase tracking-tight text-[var(--ink)] text-4xl sm:text-6xl flex items-center justify-center gap-3 flex-wrap">
              <span>EXPLORE</span>
              <span className="font-serif italic font-black text-indigo-600 dark:text-indigo-400 tracking-normal lowercase">gallery</span>
            </h1>
            <p className="text-[var(--ink-muted)] font-semibold text-xs sm:text-sm uppercase tracking-widest mt-2">
              Take a scroll, stay a while — browse our complete illustration archive
            </p>
          </div>

          {/* Filter & Sort Bar */}
          <div className="bg-[var(--bg-surface)] text-[var(--ink)] border-3 border-[var(--ink)] rounded-[2rem] p-4 sm:p-6 mb-8 shadow-[6px_6px_0px_var(--ink)] transition-colors">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">

              {/* Categories Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
                {categories.map((category) => {
                  const isActive =
                      (category === 'all' && !selectedCategory) || selectedCategory === category;
                  return (
                      <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`font-['Futura',sans-serif] text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 px-4 py-2 rounded-full border-2 border-[var(--ink)] ${
                              isActive
                                  ? 'bg-[var(--ink)] text-[var(--bg-primary)] shadow-[2px_2px_0px_var(--ink)]'
                                  : 'bg-cyan-200 text-black shadow-[2px_2px_0px_var(--ink)] hover:bg-amber-300 hover:-translate-y-0.5'
                          }`}
                      >
                        {category}
                      </button>
                  );
                })}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center justify-end gap-3 self-end lg:self-auto">
                <span className="text-xs uppercase tracking-widest text-[var(--ink)] font-black whitespace-nowrap">
                  Sort By:
                </span>
                <select
                    value={selectedSort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="bg-amber-200 text-black font-['Futura',sans-serif] text-xs font-black uppercase px-3 py-2 rounded-xl border-2 border-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] focus:outline-none cursor-pointer"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                </select>
              </div>

            </div>
          </div>

          {/* Responsive Grid Canvas Area */}
          <div className="bg-[var(--bg-surface)] text-[var(--ink)] border-3 border-[var(--ink)] rounded-[2rem] p-6 sm:p-8 shadow-[6px_6px_0px_var(--ink)] transition-colors">
            {loading ? (
                <div className="text-center py-16">
                  <p className="font-['Futura',sans-serif] font-black text-base text-[var(--ink)] uppercase tracking-wider animate-pulse">
                    Loading gallery items...
                  </p>
                </div>
            ) : error ? (
                <div className="text-center py-16">
                  <p className="font-['Futura',sans-serif] font-black text-base text-rose-600 uppercase tracking-wider">
                    Failed to load artworks. Please try again later.
                  </p>
                </div>
            ) : filteredArtworks.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-['Futura',sans-serif] font-black text-base text-[var(--ink)] uppercase tracking-wider">
                    No artworks found.
                  </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtworks.map((artwork) => (
                      <div key={artwork.id || artwork._id} className="transition-transform hover:-translate-y-1">
                        <ArtworkCard
                            artwork={artwork}
                            onClick={() => setSelectedArtwork(artwork)}
                        />
                      </div>
                  ))}
                </div>
            )}
          </div>

        </div>

        {/* Modal */}
        <ImageModal
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
        />
      </section>
  );
};

export default Gallery;