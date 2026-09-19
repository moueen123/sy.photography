import { useEffect, useRef, useState } from 'react';

/**
 * Frame sequence manager for hero canvas
 * Handles frame loading, caching, and progress tracking
 *
 * @param {Object} options - Configuration options
 * @param {number} options.frameCount - Total number of frames
 * @param {string} options.framePathTemplate - Path template with {index} placeholder
 * @param {number} options.startFrame - Starting frame number (default: 1)
 * @param {number} options.paddingLength - Zero-padding length (default: 3)
 * @returns {Object} Frame sequence state and methods
 */
export const useFrameSequence = ({
  frameCount,
  framePathTemplate = '/hero/frames/frame-{index}.webp',
  startFrame = 1,
  paddingLength = 3,
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const framesCache = useRef([]);
  const loadingInProgress = useRef(false);

  // Generate frame path with zero-padding
  const getFramePath = (index) => {
    const paddedIndex = String(index).padStart(paddingLength, '0');
    return framePathTemplate.replace('{index}', paddedIndex);
  };

  // Load a single frame
  const loadFrame = (index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const framePath = getFramePath(index);

      img.onload = () => {
        framesCache.current[index] = img;
        resolve(img);
      };

      img.onerror = () => {
        console.warn(`Failed to load frame: ${framePath}`);
        reject(new Error(`Frame ${index} failed to load`));
      };

      img.src = framePath;
    });
  };

  // Load all frames progressively
  const loadAllFrames = async () => {
    if (loadingInProgress.current) return;
    loadingInProgress.current = true;

    const totalFrames = frameCount;
    let loadedCount = 0;

    // Load first frame immediately for quick display
    try {
      await loadFrame(startFrame);
      loadedCount++;
      setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
    } catch (error) {
      console.error('Failed to load first frame:', error);
    }

    // Load remaining frames
    const framePromises = [];
    for (let i = startFrame + 1; i < startFrame + frameCount; i++) {
      const promise = loadFrame(i)
        .then(() => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
        })
        .catch(() => {
          // Frame failed to load, continue with others
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
        });

      framePromises.push(promise);
    }

    await Promise.allSettled(framePromises);
    setIsLoaded(true);
    loadingInProgress.current = false;
  };

  // Get frame by index
  const getFrame = (index) => {
    const frameIndex = Math.max(startFrame, Math.min(index, startFrame + frameCount - 1));
    return framesCache.current[frameIndex] || framesCache.current[startFrame];
  };

  // Get frame index from progress (0-1)
  const getFrameIndexFromProgress = (progress) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const frameIndex = Math.round(clampedProgress * (frameCount - 1)) + startFrame;
    return frameIndex;
  };

  useEffect(() => {
    loadAllFrames();
  }, [frameCount]);

  return {
    loadingProgress,
    isLoaded,
    getFrame,
    getFrameIndexFromProgress,
    frameCount,
  };
};
