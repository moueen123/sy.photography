import { useEffect, useRef } from 'react';

const HeroCanvas = ({ currentFrame, className = '' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // Render frame to canvas
  const renderFrame = (frame) => {
    const canvas = canvasRef.current;
    if (!canvas || !frame) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Get display size
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    // Set actual canvas size (accounting for device pixel ratio)
    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    // Only resize the backing store when it actually needs to change —
    // avoids clearing/resetting the canvas transform on every frame.
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Reset then scale context to match (setTransform avoids compounding
    // scale() calls across repeated renders/resizes).
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Clear canvas
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Calculate dimensions to cover canvas while maintaining aspect ratio
    const frameAspect = frame.width / frame.height;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (frameAspect > canvasAspect) {
      // Frame is wider than canvas
      drawHeight = displayHeight;
      drawWidth = displayHeight * frameAspect;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Frame is taller than canvas
      drawWidth = displayWidth;
      drawHeight = displayWidth / frameAspect;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    // Draw frame
    ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle resize — debounced, and triggered by ResizeObserver rather than
  // only window resize, so orientation changes, sidebar toggles, or any
  // container-size change (not just viewport width) redraw correctly.
  const handleResize = () => {
    if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    resizeTimeoutRef.current = setTimeout(() => {
      if (currentFrame) renderFrame(currentFrame);
    }, 80);
  };

  // Render when frame changes
  useEffect(() => {
    if (currentFrame) {
      requestAnimationFrame(() => renderFrame(currentFrame));
    }
  }, [currentFrame]);

  // Observe the container for size changes (covers window resize,
  // orientation change, and layout-driven resizing alike).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(handleResize);
      observer.observe(container);
      return () => {
        observer.disconnect();
        if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      };
    }

    // Fallback for environments without ResizeObserver
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, [currentFrame]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default HeroCanvas;