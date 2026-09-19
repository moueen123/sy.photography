import { useEffect, useRef, useState } from 'react';

export const useFrameSequence = ({
  frameCount,
  framePathTemplate = '/hero/frames/frame-{index}.webp',
  startFrame = 1,
  paddingLength = 3,
  batchSize = 8,
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const framesCache = useRef([]);
  const loadingInProgress = useRef(false);

  const getFramePath = (index) => {
    const paddedIndex = String(index).padStart(
      paddingLength,
      '0'
    );

    return framePathTemplate.replace(
      '{index}',
      paddedIndex
    );
  };

  const loadFrame = (index) => {
    return new Promise((resolve) => {
      const img = new Image();
      const framePath = getFramePath(index);

      img.onload = () => {
        framesCache.current[index] = img;
        resolve(true);
      };

      img.onerror = () => {
        console.warn(
          `Failed to load frame: ${framePath}`
        );
        resolve(false);
      };

      img.src = framePath;
    });
  };

  const loadAllFrames = async () => {
    if (loadingInProgress.current) return;

    loadingInProgress.current = true;

    let loadedCount = 0;

    // Load first frame
    const firstFrameLoaded = await loadFrame(startFrame);

    loadedCount++;

    setLoadingProgress(
      Math.round((loadedCount / frameCount) * 100)
    );

    console.log(
      'FIRST FRAME FINISHED',
      firstFrameLoaded
    );

    // Load remaining frames in batches
    for (
      let batchStart = startFrame + 1;
      batchStart < startFrame + frameCount;
      batchStart += batchSize
    ) {
      console.log('LOADING BATCH', batchStart);

      const batchEnd = Math.min(
        batchStart + batchSize,
        startFrame + frameCount
      );

      const batch = [];

      for (
        let index = batchStart;
        index < batchEnd;
        index++
      ) {
        batch.push(loadFrame(index));
      }

      const results = await Promise.all(batch);

      loadedCount += results.length;

      setLoadingProgress(
        Math.min(
          100,
          Math.round(
            (loadedCount / frameCount) * 100
          )
        )
      );
    }

    setLoadingProgress(100);
    setIsLoaded(true);
    loadingInProgress.current = false;

    console.log('ALL FRAMES LOADED');
  };

  const getFrame = (index) => {
    const frameIndex = Math.max(
      startFrame,
      Math.min(
        index,
        startFrame + frameCount - 1
      )
    );

    return (
      framesCache.current[frameIndex] ||
      framesCache.current[startFrame]
    );
  };

  const getFrameIndexFromProgress = (progress) => {
    const clampedProgress = Math.max(
      0,
      Math.min(1, progress)
    );

    return (
      Math.round(
        clampedProgress * (frameCount - 1)
      ) + startFrame
    );
  };

  useEffect(() => {
    loadAllFrames();

    return () => {
      // Don't cancel the loading process.
      // React Strict Mode can mount/unmount effects
      // during development.
    };
  }, [
    frameCount,
    framePathTemplate,
    startFrame,
    paddingLength,
    batchSize,
  ]);

  return {
    loadingProgress,
    isLoaded,
    getFrame,
    getFrameIndexFromProgress,
    frameCount,
  };
};