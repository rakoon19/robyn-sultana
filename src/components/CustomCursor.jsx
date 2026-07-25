import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const innerDotRef = useRef(null);

    useEffect(() => {
        const shouldHideCursor =
            typeof window !== "undefined" &&
            (
                window.matchMedia("(pointer: coarse)").matches ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            );

        if (shouldHideCursor) {
            return;
        }

        const innerDot = innerDotRef.current;
        if (!innerDot) return;

        const handleMouseMove = (e) => {
            gsap.set(innerDot, {
                x: e.clientX,
                y: e.clientY,
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={innerDotRef}
            className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]"
            style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--accent-1)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--accent-1)',
            }}
        />
    );
};

export default CustomCursor;