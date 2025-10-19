// --- FILE: frontend/src/hooks/useTilt.js ---
import { useRef, useEffect } from 'react';

export function useTilt() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = element.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      // The intensity of the tilt. Higher number = more tilt.
      const tiltIntensity = 15;

      const rotateY = tiltIntensity * (x - 0.5);
      const rotateX = -tiltIntensity * (y - 0.5);

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      // Reset the card to its flat state when the mouse leaves.
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function to remove event listeners.
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
}