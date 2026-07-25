// src/hooks/useArtworks.js
import { useState, useEffect } from 'react';
import { fetchArtworks } from '../services/api';

export const useArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const getArtworks = async () => {
            try {
                setLoading(true);
                const data = await fetchArtworks();
                if (isMounted) setArtworks(data);
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        getArtworks();

        return () => {
            isMounted = false;
        };
    }, []);

    return { artworks, loading, error };
};