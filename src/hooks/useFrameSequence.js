import { useEffect, useRef, useState } from 'react';

export const useFrameSequence = ({
  frameCount,
  framePathTemplate = '/hero/frames/frame-{index}.webp',
  startFrame = 1,
  paddingLength = 3,
  batchSize = 8,
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [framesRevision, setFramesRevision] = useState(0);

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

    let settledCount = 0;

    // Let the page start as soon as its first usable frame arrives.
    const firstFrameLoaded = await loadFrame(startFrame);
    let ready = firstFrameLoaded;
    settledCount++;
    if (ready) setIsReady(true);
    setLoadingProgress(
      Math.max(1, Math.round((settledCount / frameCount) * 100))
    );

    // Load remaining frames in batches
    for (
      let batchStart = startFrame + 1;
      batchStart < startFrame + frameCount;
      batchStart += batchSize
    ) {
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

      settledCount += results.length;
      setFramesRevision((revision) => revision + 1);

      if (!ready && results.some(Boolean)) {
        ready = true;
        setIsReady(true);
      }

      setLoadingProgress(
        Math.min(
          100,
          Math.round((settledCount / frameCount) * 100)
        )
      );
    }

    setLoadingProgress(100);
    setIsReady(true);
    setIsLoaded(true);
    loadingInProgress.current = false;
  };

  const getFrame = (index) => {
    const frameIndex = Math.max(
      startFrame,
      Math.min(
        index,
        startFrame + frameCount - 1
      )
    );

    if (framesCache.current[frameIndex]) {
      return framesCache.current[frameIndex];
    }

    // While later frames are downloading, use the closest earlier frame.
    for (
      let fallbackIndex = frameIndex - 1;
      fallbackIndex >= startFrame;
      fallbackIndex--
    ) {
      if (framesCache.current[fallbackIndex]) {
        return framesCache.current[fallbackIndex];
      }
    }

    // The first image can fail independently; fall forward to any loaded frame.
    for (
      let fallbackIndex = startFrame + 1;
      fallbackIndex < startFrame + frameCount;
      fallbackIndex++
    ) {
      if (framesCache.current[fallbackIndex]) {
        return framesCache.current[fallbackIndex];
      }
    }

    return undefined;
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
    isReady,
    isLoaded,
    framesRevision,
    getFrame,
    getFrameIndexFromProgress,
    frameCount,
  };
};

