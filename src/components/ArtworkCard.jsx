import React from 'react';
import { getResizedImageUrl } from '../utils/cloudinaryHelper'; // Import your helper

const ArtworkCard = ({ artwork, onClick }) => {
    const rawImageSrc = artwork.imageUrl || artwork.url;

    // Generate optimized sizes on the fly
    // 1. Smaller width for the blurred background to save bandwidth
    const backdropSrc = getResizedImageUrl(rawImageSrc, {
        width: 300,
        height: 300,
        crop: 'fill'
    });

    // 2. Crisp, appropriately sized version for the main display container
    const mainImageSrc = getResizedImageUrl(rawImageSrc, {
        width: 800,
        height: 800,
        crop: 'fit' // Keeps proportions intact without cropping
    });

    return (
        <div
            onClick={onClick}
            data-cursor="artwork"
            data-cursor-label="VIEW"
            className="group cursor-pointer aspect-square rounded-[var(--radius-md)] sm:rounded-[var(--radius-lg)] overflow-hidden transition-all duration-500 relative bg-[var(--bg-surface)] border border-[var(--ink)]/10 hover:border-[var(--accent-1)]/50 shadow-xl hover:shadow-[0_0_30px_rgba(255,59,92,0.15)] flex items-center justify-center"
        >
            {/* Ambient Blurred Artwork Backdrop (Using lightweight resized version) */}
            <img
                src={backdropSrc}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-125 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
            />

            {/* Absolute Bounding Box for Full Image Fit (No Crop) */}
            <div className="absolute inset-0 p-4 sm:p-5 flex items-center justify-center z-10 pointer-events-none overflow-hidden">
                <img
                    src={mainImageSrc}
                    alt={artwork.title || 'Artwork'}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-2xl rounded-lg pointer-events-auto"
                    loading="lazy"
                />
            </div>

            {/* Gradient Hover Vignette & Caption */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6 pointer-events-none">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-display text-sm sm:text-base font-extrabold text-[var(--ink)] line-clamp-1 uppercase tracking-wide">
                        {artwork.title || 'Untitled Artwork'}
                    </p>
                    {artwork.category && (
                        <p className="font-body text-xs text-[var(--accent-1)] uppercase font-semibold tracking-wider mt-0.5">
                            {artwork.category}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;