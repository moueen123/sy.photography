# Photography Portfolio - Setup & Upload Guide

## Current Status

✅ Complete React application built
✅ Canvas frame sequence system ready
✅ GSAP ScrollTrigger animations configured
✅ Collection page system with editorial layouts
✅ Responsive design with mobile support
✅ Accessibility features (reduced motion, keyboard nav)
✅ Custom cursor (desktop only)
✅ Smooth scrolling with Lenis

⚠️ **NEEDS:** Hero frame sequence images
⚠️ **NEEDS:** Collection photography images

## What to Upload

### 1. Hero Frame Sequence (CRITICAL)

**Location:** `public/hero/frames/`

**Format:** WebP recommended (or JPG/PNG)

**Naming Pattern:**
```
frame-001.webp
frame-002.webp
frame-003.webp
...
frame-120.webp
```

**Requirements:**
- Zero-padded 3-digit numbering (001, 002, ..., 120)
- Sequential without gaps
- All frames same dimensions (1920x1080 recommended)
- Tells the story: Photographer → Camera → Lens → Black

**How many frames?**
- **60 frames** = Lighter file size, still smooth
- **90 frames** = Balanced
- **120 frames** = Buttery smooth (recommended)

**After uploading frames:**
1. Count total frames
2. Open `src/components/HeroSequence/HeroSequence.jsx`
3. Update line 17: `const FRAME_COUNT = 120;` to your actual count

### 2. Collection Images

**Location:** `public/photography/`

**Structure:**
```
public/photography/
  collection-01/
    cover.webp    (Collection card thumbnail)
    01.webp       (Collection image 1)
    02.webp       (Collection image 2)
    03.webp       (Collection image 3)
    04.webp       (Collection image 4+)
  collection-02/
    cover.webp
    01.webp
    02.webp
    ...
  collection-03/
    cover.webp
    01.webp
    ...
```

**Format:** WebP, JPG, or PNG
**Recommended Size:** 2400px wide (will scale responsively)

**After uploading collection images:**

Edit `src/data/collections.js` and update:
- Collection titles
- Descriptions
- Years
- Categories
- Locations
- Image paths (must match your uploaded files)

## Quick Start

```bash
# Install dependencies (if not done)
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## Testing Checklist

### Without Frames (Current State)
- [x] Build completes successfully
- [ ] Homepage shows loading state for hero
- [ ] Collections section visible (without images)
- [ ] Navigation works
- [ ] Routing to About/Contact works

### After Uploading Frames
- [ ] Hero loads and shows frame 1
- [ ] Scrolling controls frame progression
- [ ] Photographer → Camera → Lens → Black sequence visible
- [ ] Smooth scrubbing
- [ ] No frame gaps or stuttering
- [ ] Loading progress shows correctly

### After Uploading Collection Images
- [ ] Collection cards show cover images
- [ ] Hover interactions work
- [ ] Click opens collection page
- [ ] Collection page shows all images in editorial layout
- [ ] Image viewer opens on click
- [ ] Next/Previous navigation works
- [ ] Keyboard arrows work in viewer
- [ ] ESC closes viewer

### Responsive
- [ ] Mobile: Hero frames load (smaller resolution if available)
- [ ] Mobile: Collections stack vertically
- [ ] Mobile: Touch gestures work in image viewer
- [ ] Tablet: Layout adapts properly
- [ ] Desktop: Full experience works

### Accessibility
- [ ] Reduced motion: Hero shows static frame
- [ ] Keyboard: Tab navigation works
- [ ] Keyboard: Arrow keys work in viewer
- [ ] Keyboard: ESC closes modals
- [ ] Focus states visible
- [ ] Alt text present (update in collections.js)

## File Size Optimization

### Hero Frames
If frames are too large:

**Option 1:** Reduce dimensions
```bash
# 1080p instead of 1920p
ffmpeg -i input.mp4 -vf "scale=1080:-1" -q:v 2 frame-%03d.webp
```

**Option 2:** Increase compression
```bash
# Higher compression (lower quality)
ffmpeg -i input.mp4 -q:v 5 frame-%03d.webp
```

**Option 3:** Fewer frames
- Use 60 frames instead of 120
- Still smooth, half the file size

### Collection Images
- Target: 200-400KB per image
- WebP format preferred
- Use online tools: Squoosh.app, TinyPNG

## Customization After Upload

### Update Photographer Name
`src/components/Navigation/Navigation.jsx` line 27

### Update Contact Info
`src/pages/Contact.jsx`

### Update About Text
`src/pages/About.jsx`

### Adjust Colors
`src/index.css` in `@theme` section

### Change Typography
`src/index.css` - Update Google Fonts import and CSS variables

## Deployment

```bash
# Build for production
npm run build

# Output in /dist folder
# Upload /dist contents to your hosting
```

**Recommended Hosts:**
- Vercel (automatic deployment from Git)
- Netlify (drag & drop /dist folder)
- GitHub Pages
- Your own server

## Browser Support

✅ Chrome/Edge (latest 2 versions)
✅ Firefox (latest 2 versions)
✅ Safari (latest 2 versions)
✅ Mobile Safari (iOS 14+)
✅ Chrome Mobile (Android)

## Performance

Current bundle sizes (without images):
- CSS: 16.41 KB (gzipped: 4.09 KB)
- JS: 413.23 KB (gzipped: 137.63 KB)

These are reasonable for a portfolio site with GSAP animations.

## Need Help?

Common issues:

**Hero not loading?**
- Check frame naming pattern (frame-001.webp not frame-1.webp)
- Verify FRAME_COUNT matches actual frame count
- Check browser console for errors

**Collections not showing?**
- Verify image paths in collections.js match uploaded files
- Check public/photography/ structure
- Ensure image files are WebP, JPG, or PNG

**Animations not smooth?**
- Check if prefers-reduced-motion is enabled
- Verify GSAP ScrollTrigger is loaded
- Test in different browser

**Build fails?**
- Run `npm install` again
- Delete node_modules and package-lock.json, reinstall
- Check Node.js version (16+ required)

---

Portfolio built: September 2026
