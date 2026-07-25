import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Standard scroll-triggered fade & slide up reveal
 * @param {HTMLElement} element - Element to animate
 * @param {object} options - ScrollTrigger options
 */
export const createScrollReveal = (element, options = {}) => {
  if (prefersReducedMotion()) {
    // Simple fade only
    gsap.set(element, { opacity: 0 });
    gsap.to(element, {
      opacity: 1,
      duration: 0.6,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true,
        ...options,
      },
    });
    return;
  }

  // Full motion: fade + slide up + stagger
  gsap.set(element, { opacity: 0, y: 60 });
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      once: true,
      ...options,
    },
  });
};

/**
 * Stagger children on scroll reveal
 * @param {HTMLElement} container - Container with children
 * @param {object} options - ScrollTrigger options
 */
export const createStaggerReveal = (container, options = {}) => {
  if (!container) return;

  const children = Array.from(container.children);
  
  if (prefersReducedMotion()) {
    gsap.set(children, { opacity: 0 });
    gsap.to(children, {
      opacity: 1,
      duration: 0.6,
      stagger: 0,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
        ...options,
      },
    });
    return;
  }

  gsap.set(children, { opacity: 0, y: 60 });
  gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      once: true,
      ...options,
    },
  });
};

/**
 * Hover scale animation for images/cards
 * @param {HTMLElement} element - Element to animate
 * @param {number} scale - Scale value (default 1.05)
 */
export const createHoverScale = (element, scale = 1.05) => {
  if (!element || prefersReducedMotion()) return;

  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  });
};

/**
 * Idle animation loop (e.g., rotation, bounce)
 * @param {HTMLElement} element - Element to animate
 * @param {string} property - CSS property to animate ('rotation', 'y', etc.)
 * @param {number} value - Value to animate to
 * @param {number} duration - Duration of loop
 */
export const createIdleLoop = (element, property = 'rotation', value = 6, duration = 2) => {
  if (!element || prefersReducedMotion()) return;

  gsap.to(element, {
    [property]: value,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Draw SVG stroke animation
 * @param {SVGElement} element - SVG path element
 * @param {object} options - Options
 */
export const createStrokeDraw = (element, options = {}) => {
  if (!element || prefersReducedMotion()) {
    gsap.set(element, { strokeDashoffset: 0 });
    return;
  }

  const length = element.getTotalLength();
  gsap.set(element, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(element, {
    strokeDashoffset: 0,
    duration: options.duration || 1.5,
    ease: options.ease || 'power2.inOut',
    scrollTrigger: {
      trigger: element,
      start: 'top 75%',
      once: true,
      ...options.scrollTriggerOptions,
    },
  });
};

/**
 * Infinite marquee/scroll animation
 * @param {HTMLElement} element - Element to scroll
 * @param {number} duration - Duration of one loop
 */
export const createInfiniteMarquee = (element, duration = 20) => {
  if (!element) return;

  gsap.set(element, { x: 0 });
  gsap.to(element, {
    x: -element.scrollWidth,
    duration,
    ease: 'linear',
    repeat: -1,
  });
};

/**
 * React hook for scroll reveal
 */
export const useScrollReveal = (ref, options = {}) => {
  useEffect(() => {
    if (ref.current) {
      createScrollReveal(ref.current, options);
    }
  }, [ref, options]);
};

/**
 * React hook for stagger reveal
 */
export const useStaggerReveal = (ref, options = {}) => {
  useEffect(() => {
    if (ref.current) {
      createStaggerReveal(ref.current, options);
    }
  }, [ref, options]);
};

export default {
  prefersReducedMotion,
  createScrollReveal,
  createStaggerReveal,
  createHoverScale,
  createIdleLoop,
  createStrokeDraw,
  createInfiniteMarquee,
  useScrollReveal,
  useStaggerReveal,
};
