import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's no hash (e.g. navigating from /gallery to /), scroll to top
        if (!hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant', // Use 'smooth' if you prefer an animated scroll
            });
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;