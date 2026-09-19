// Collection data structure
// NOTE: Images are placeholders. Replace with actual photography when available.

export const collections = [
  {
    id: "01",
    slug: "urban-shadows",
    title: "Urban Shadows",
    year: "2026",
    category: "Street Photography",
    location: "New York",
    description: "Exploring the interplay of light and shadow in the concrete jungle.",
    cover: "/photography/collection-01/cover.webp", // Placeholder - upload actual image
    images: [
      "/photography/collection-01/01.webp",
      "/photography/collection-01/02.webp",
      "/photography/collection-01/03.webp",
      "/photography/collection-01/04.webp",
    ]
  },
  {
    id: "02",
    slug: "quiet-moments",
    title: "Quiet Moments",
    year: "2025",
    category: "Portrait",
    location: "Paris",
    description: "Intimate portraits capturing stillness in a chaotic world.",
    cover: "/photography/collection-02/cover.webp", // Placeholder - upload actual image
    images: [
      "/photography/collection-02/01.webp",
      "/photography/collection-02/02.webp",
      "/photography/collection-02/03.webp",
      "/photography/collection-02/04.webp",
    ]
  },
  {
    id: "03",
    slug: "natural-forms",
    title: "Natural Forms",
    year: "2024",
    category: "Landscape",
    location: "Iceland",
    description: "Raw beauty of untouched landscapes and geological formations.",
    cover: "/photography/collection-03/cover.webp", // Placeholder - upload actual image
    images: [
      "/photography/collection-03/01.webp",
      "/photography/collection-03/02.webp",
      "/photography/collection-03/03.webp",
      "/photography/collection-03/04.webp",
    ]
  },
];

// Helper function to get collection by slug
export const getCollectionBySlug = (slug) => {
  return collections.find(collection => collection.slug === slug);
};

// Helper function to get next collection
export const getNextCollection = (currentSlug) => {
  const currentIndex = collections.findIndex(c => c.slug === currentSlug);
  const nextIndex = (currentIndex + 1) % collections.length;
  return collections[nextIndex];
};

// Helper function to get previous collection
export const getPreviousCollection = (currentSlug) => {
  const currentIndex = collections.findIndex(c => c.slug === currentSlug);
  const prevIndex = currentIndex === 0 ? collections.length - 1 : currentIndex - 1;
  return collections[prevIndex];
};
