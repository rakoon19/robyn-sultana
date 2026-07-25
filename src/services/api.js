// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const fetchArtworks = async () => {
    try {
        const res = await fetch(`${API_URL}/api/artworks`);
        if (!res.ok) throw new Error('Failed to fetch artworks');
        const data = await res.json();

        // Fix: Spread (...art) first so imageUrl and other fields are retained!
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