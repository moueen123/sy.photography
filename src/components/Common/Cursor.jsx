import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Custom cursor for photography portfolio
 * States: default, view, drag, next
 * Disabled on touch devices
 */
const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorState, setCursorState] = useState('default');

  useEffect(() => {
    // Check if device is touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);

    if (isTouchDevice) return;

    // Add custom cursor class to body
    document.body.classList.add('custom-cursor');

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    // Mouse move handler
    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    // Listen for cursor state changes
    const handleCursorGrow = () => setCursorState('view');
    const handleCursorNormal = () => setCursorState('default');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('cursor-grow', handleCursorGrow);
    window.addEventListener('cursor-normal', handleCursorNormal);

    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('cursor-grow', handleCursorGrow);
      window.removeEventListener('cursor-normal', handleCursorNormal);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`
            border border-warm-white rounded-full transition-all duration-300
            ${cursorState === 'view' ? 'w-16 h-16' : 'w-8 h-8'}
          `}
        />
      </div>

      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-1 h-1 bg-warm-white rounded-full" />
      </div>

      {/* Cursor text */}
      {cursorState === 'view' && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <span className="metadata text-warm-white">VIEW</span>
        </div>
      )}
    </>
  );
};

export default Cursor;
