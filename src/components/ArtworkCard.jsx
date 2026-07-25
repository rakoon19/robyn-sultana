import React from 'react';

/**
 * Helper function to safely inject Cloudinary transformation parameters on the fly.
 */
export const getResizedImageUrl = (imageUrl, options = {}) => {
    if (!imageUrl || typeof imageUrl !== 'string') {
        return '';
    }

    const uploadSegment = '/image/upload/';
    const uploadIndex = imageUrl.indexOf(uploadSegment);

    // If it's not a Cloudinary URL or missing the upload path, return it as-is
    if (uploadIndex === -1) {
        return imageUrl;
    }

    const {
        width = 'auto',
        height = 'auto',
        crop = 'fill',
        format = 'auto',
        quality = 'auto'
    } = options;

    const transformationString = `w_${width},h_${height},c_${crop},f_${format},q_${quality}/`;
    const insertPosition = uploadIndex + uploadSegment.length;

    // Inject transformations right after /image/upload/
    return imageUrl.slice(0, insertPosition) + transformationString + imageUrl.slice(insertPosition);
};

const ArtworkCard = ({ artwork, onClick }) => {
    const rawImageSrc = artwork?.imageUrl || artwork?.url || '';

    // Generate optimized sizes on the fly
    const backdropSrc = getResizedImageUrl(rawImageSrc, {
        width: 300,
        height: 300,
        crop: 'fill'
    });

    const mainImageSrc = getResizedImageUrl(rawImageSrc, {
        width: 800,
        height: 800,
        crop: 'fit'
    });

    return (
        <div
            onClick={onClick}
            data-cursor="artwork"
            data-cursor-label="VIEW"
            className="group cursor-pointer aspect-square rounded-[var(--radius-md)] sm:rounded-[var(--radius-lg)] overflow-hidden transition-all duration-500 relative bg-[var(--bg-surface)] border border-[var(--ink)]/10 hover:border-[var(--accent-1)]/50 shadow-xl hover:shadow-[0_0_30px_rgba(255,59,92,0.15)] flex items-center justify-center"
        >
            {/* Ambient Blurred Artwork Backdrop */}
            <img
                src={backdropSrc}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-125 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
            />

            {/* Absolute Bounding Box for Full Image Fit */}
            <div className="absolute inset-0 p-4 sm:p-5 flex items-center justify-center z-10 pointer-events-none overflow-hidden">
                <img
                    src={mainImageSrc}
                    alt={artwork?.title || 'Artwork'}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-2xl rounded-lg pointer-events-auto"
                    loading="lazy"
                />
            </div>

            {/* Gradient Hover Vignette & Caption */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6 pointer-events-none">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-display text-sm sm:text-base font-extrabold text-[var(--ink)] line-clamp-1 uppercase tracking-wide">
                        {artwork?.title || 'Untitled Artwork'}
                    </p>
                    {artwork?.category && (
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