# Cinematic Photography Portfolio

An extraordinary, immersive photography portfolio built with React, GSAP, and modern web technologies.

## Features

- **Canvas Frame Sequence Hero**: Scroll-controlled frame-by-frame sequence (photographer → camera → lens → black)
- **Cinematic Collections**: One-at-a-time collection reveals with varied animations
- **Editorial Layouts**: Photography-first design with asymmetric, sophisticated layouts
- **Fullscreen Image Viewer**: Keyboard navigation, touch gestures
- **Smooth Scrolling**: Lenis integration for buttery smooth scroll
- **Custom Cursor**: Photography-focused cursor states (disabled on touch devices)
- **Accessibility**: Reduced motion support, keyboard navigation, semantic HTML
- **Responsive**: Mobile-first design that works beautifully on all devices

## Tech Stack

- React 19
- Vite 8
- GSAP 3.15 + ScrollTrigger
- React Router DOM 6
- Lenis (smooth scroll)
- Tailwind CSS 4
- Google Fonts (Cormorant + Inter)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Critical: Upload Hero Frames

**The hero frame sequence is ready but frames are not included.**

### To add hero frames:

1. Extract frames from your source video using FFmpeg:

```bash
ffmpeg -i your-video.mp4 -vf "fps=30,scale=1920:-1" public/hero/frames/frame-%03d.webp
```

2. Or manually place frames in `public/hero/frames/` with naming pattern:
   - `frame-001.webp`
   - `frame-002.webp`
   - `frame-003.webp`
   - etc.

3. Update `FRAME_COUNT` in `src/components/HeroSequence/HeroSequence.jsx` to match your total frames

**Without frames**, the hero will show a loading state. The rest of the site will work normally.

## Add Photography Collections

Replace placeholder images in:

```
public/photography/
  collection-01/
    cover.webp
    01.webp
    02.webp
    03.webp
    04.webp
  collection-02/
    cover.webp
    ...
  collection-03/
    cover.webp
    ...
```

Update collection data in `src/data/collections.js` with:
- Real titles
- Descriptions
- Locations
- Years
- Categories

## Customization

### Update Photographer Name

Edit `src/components/Navigation/Navigation.jsx`:

```jsx
<Link to="/">PHOTOGRAPHER</Link>
```

Change to your actual name.

### Update Contact Info

Edit `src/pages/Contact.jsx` with your:
- Email
- Instagram
- Other social links

### Typography

Current fonts: Cormorant (display) + IBM Plex Sans (body)

To change fonts, edit `src/index.css`:

```css
@import url('your-google-fonts-url');

@theme {
  --font-display: "YourFont", serif;
  --font-body: "YourBodyFont", sans-serif;
}
```

### Colors

Edit color palette in `src/index.css`:

```css
@theme {
  --color-near-black: #0a0a0a;
  --color-charcoal: #1a1a1a;
  --color-warm-white: #f8f8f8;
  --color-muted-gray: #888888;
}
```

## Project Structure

```
src/
├── components/
│   ├── HeroSequence/     # Canvas frame sequence
│   ├── Collections/      # Collection cards & reveals
│   ├── CollectionPage/   # Individual collection components
│   ├── Navigation/       # Main navigation
│   └── Common/           # Cursor, etc.
├── data/
│   └── collections.js    # Collection metadata
├── hooks/
│   ├── useFrameSequence.js
│   └── useReducedMotion.js
├── pages/
│   ├── Home.jsx
│   ├── CollectionPage.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Reduced motion fallback for accessibility

## Performance Notes

- Canvas rendering optimized for high-DPI displays
- Lazy loading for collection images
- Frame caching for smooth playback
- RequestAnimationFrame for efficient rendering

## License

All rights reserved.

---

Built with Claude Code 2026
