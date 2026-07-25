// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const fetchArtworks = async () => {
    try {
        const res = await fetch(`${API_URL}/api/artworks`);
        if (!res.ok) throw new Error('Failed to fetch artworks');
        const data = await res.json();
        // Normalize data (ensures fallback values for Cloudinary helpers & keys)
        return data.map((art) => ({
            ...art,
            id: art._id || art.id,
            cloudinaryPublicId: art.cloudinaryPublicId || '',
            tags: art.tags || [],
        }));
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};