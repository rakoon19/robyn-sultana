import React, { useEffect } from 'react';
import { Xmark, Sparkles } from '@gravity-ui/icons';
import { getResizedImageUrl } from '../utils/cloudinaryHelper'; // Import your helper

const ImageModal = ({ artwork, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (artwork) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [artwork, onClose]);

    if (!artwork) return null;

    const rawImageSrc = artwork.imageUrl || artwork.url;

    // Use a higher resolution (e.g., width 1400) for the popup modal viewer so it looks crisp and detailed
    const modalImageSrc = getResizedImageUrl(rawImageSrc, {
        width: 1400,
        height: 1400,
        crop: 'fit'
    });

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[var(--bg-primary)]/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[90vh] bg-[var(--bg-surface)] rounded-[var(--radius-lg)] overflow-hidden flex flex-col md:flex-row border border-[var(--ink)]/15 shadow-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    data-cursor="hover"
                    className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[var(--bg-primary)]/70 text-[var(--ink)] flex items-center justify-center hover:bg-[var(--accent-1)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-lg"
                    aria-label="Close modal"
                >
                    <Xmark size={18} />
                </button>

                {/* Artwork Display Container */}
                <div className="flex-1 bg-[var(--bg-primary)]/50 p-6 flex items-center justify-center min-h-[300px] md:min-h-[500px] relative overflow-hidden">
                    <img
                        src={modalImageSrc}
                        alt={artwork.title || 'Artwork Details'}
                        className="max-w-full max-h-[75vh] object-contain rounded-md drop-shadow-2xl"
                    />
                </div>

                {/* Artwork Metadata Sidebar */}
                <div className="w-full md:w-80 p-6 sm:p-8 flex flex-col justify-between bg-[var(--bg-surface)] border-t md:border-t-0 md:border-l border-[var(--ink)]/15">
                    <div className="space-y-4">
                        <div>
              <span className="font-body text-[10px] uppercase font-bold tracking-widest text-[var(--accent-1)] flex items-center gap-1.5">
                <Sparkles size={10} /> {artwork.category || 'Portfolio Artwork'}
              </span>
                            <h3 className="font-['Futura',sans-serif] font-bold text-xl sm:text-2xl text-[var(--ink)] uppercase tracking-wide mt-1">
                                {artwork.title || 'Untitled'}
                            </h3>
                        </div>

                        {artwork.description && (
                            <p className="font-body text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed font-medium">
                                {artwork.description}
                            </p>
                        )}
                    </div>

                    <div className="pt-6 border-t border-[var(--ink)]/10 mt-6 flex items-center justify-between font-body text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <span>
              {artwork.createdAt || artwork.date
                  ? new Date(artwork.createdAt || artwork.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                  })
                  : 'Selected Work'}
            </span>
                        <span className="text-[var(--accent-2)] font-bold inline-flex items-center gap-1">
              <Sparkles size={12} /> High Res
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;