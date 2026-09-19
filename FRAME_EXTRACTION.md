# Frame Extraction Guide

## If you have FFmpeg installed:

Extract 120 frames at 30fps from your video:

```bash
ffmpeg -i your-video.mp4 -vf "fps=30,scale=1920:-1:flags=lanczos" -q:v 2 public/hero/frames/frame-%03d.webp
```

### Alternative frame counts:

**60 frames** (lighter, still smooth):
```bash
ffmpeg -i your-video.mp4 -vf "fps=15,scale=1920:-1:flags=lanczos" -q:v 2 public/hero/frames/frame-%03d.webp
```

**90 frames** (balanced):
```bash
ffmpeg -i your-video.mp4 -vf "fps=22.5,scale=1920:-1:flags=lanczos" -q:v 2 public/hero/frames/frame-%03d.webp
```

## After extraction:

1. Count your frames: `ls public/hero/frames/*.webp | wc -l`
2. Update `FRAME_COUNT` in `src/components/HeroSequence/HeroSequence.jsx`
3. Test the scroll experience

## Responsive frames (optional):

Create mobile-optimized versions:

```bash
ffmpeg -i your-video.mp4 -vf "fps=30,scale=1080:-1:flags=lanczos" -q:v 2 public/hero/frames/mobile/frame-%03d.webp
```

Then update the frame loader to detect screen size and load appropriate set.

## Without FFmpeg:

1. Use online video-to-frames converter
2. Export frames from video editing software (Premiere, Final Cut, DaVinci)
3. Rename to match pattern: frame-001.webp, frame-002.webp, etc.
4. Ensure zero-padded 3-digit numbering (001, 002, 099, 100, etc.)
