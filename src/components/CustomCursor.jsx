import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const innerDotRef = useRef(null);
    const outerRingRef = useRef(null);
    const cursorStateRef = useRef({ x: 0, y: 0, size: 14, state: 'default' });

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
        const outerRing = outerRingRef.current;
        if (!innerDot || !outerRing) return;

        // Smooth physics-based follower
        const xTo = gsap.quickTo(outerRing, 'x', { duration: 0.45, ease: 'power3.out' });
        const yTo = gsap.quickTo(outerRing, 'y', { duration: 0.45, ease: 'power3.out' });

        const handleMouseMove = (e) => {
            // Instant center dot
            gsap.set(innerDot, {
                x: e.clientX,
                y: e.clientY,
            });

            // Smooth trailing outer ring
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const handleElementHover = (e) => {
            const target =
                e.target instanceof Element
                    ? e.target.closest(
                        '[data-cursor], a, button, [role="button"], input, textarea'
                    )
                    : null;
            if (!target) return;

            let newSize = 14;
            let newState = 'default';
            let label = '';
            let bgOpacity = 0.1;

            const cursorAttr = target.getAttribute('data-cursor');
            const customLabel = target.getAttribute('data-cursor-label');

            if (cursorAttr === 'view' || cursorAttr === 'artwork') {
                newSize = 80;
                newState = 'view';
                label = customLabel || 'EXPLORE';
                bgOpacity = 0.85;
            } else if (cursorAttr === 'drag') {
                newSize = 70;
                newState = 'drag';
                label = customLabel || 'DRAG';
                bgOpacity = 0.85;
            } else if (
                cursorAttr === 'hover' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.getAttribute('role') === 'button'
            ) {
                newSize = 52;
                newState = 'hover';
                bgOpacity = 0.2;
            }

            gsap.to(outerRing, {
                width: newSize,
                height: newSize,
                backgroundColor: newState === 'view' || newState === 'drag'
                    ? 'var(--accent-1)'
                    : 'rgba(255, 59, 92, ' + bgOpacity + ')',
                borderColor: 'var(--accent-1)',
                duration: 0.3,
                ease: 'back.out(1.7)',
            });

            cursorStateRef.current.size = newSize;

            const labelEl = outerRing.querySelector('[data-label]');
            if (labelEl) {
                if (label) {
                    labelEl.textContent = label;
                    gsap.to(labelEl, { opacity: 1, scale: 1, duration: 0.2 });
                } else {
                    gsap.to(labelEl, { opacity: 0, scale: 0.8, duration: 0.1 });
                }
            }
        };

        const handleElementLeave = () => {
            gsap.to(outerRing, {
                width: 14,
                height: 14,
                backgroundColor: 'transparent',
                borderColor: 'var(--accent-1)',
                duration: 0.3,
                ease: 'power2.out',
            });

            const labelEl = outerRing.querySelector('[data-label]');
            if (labelEl) {
                gsap.to(labelEl, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.15,
                    onComplete: () => {
                        labelEl.textContent = '';
                    },
                });
            }

            cursorStateRef.current.size = 14;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleElementHover, true);
        document.addEventListener('mouseout', handleElementLeave, true);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleElementHover, true);
            document.removeEventListener('mouseout', handleElementLeave, true);
        };
    }, []);


    return (
        <>
            {/* Inner Precision Dot */}
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

            {/* Trailing Interactive Ring */}
            <div
                ref={outerRingRef}
                className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] flex items-center justify-center text-center"
                style={{
                    width: '14px',
                    height: '14px',
                    border: '1.5px solid var(--accent-1)',
                    borderRadius: '50%',
                    backdropFilter: 'blur(4px)',
                    transition: 'border-color 0.3s ease, background-color 0.3s ease',
                }}
            >
                <span
                    data-label
                    className="font-display font-extrabold tracking-widest uppercase text-white pointer-events-none"
                    style={{
                        fontSize: '0.6rem',
                        opacity: 0,
                    }}
                />
            </div>
        </>
    );
};

export default CustomCursor;