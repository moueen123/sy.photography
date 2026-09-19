import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroCanvas from "./HeroCanvas";
import { useFrameSequence } from "../../hooks/useFrameSequence";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// collections covers
import album1 from "../../albums/1.JPG";
import album2 from "../../albums/2.jpg";
import album3 from "../../albums/3.JPG";
import album4 from "../../albums/4.JPG";
import album6 from "../../albums/6.png";
import album7 from "../../albums/7.png";

// collections photos
import album1_1 from "../../albums/1/_DSC3415.JPG";
import album1_2 from "../../albums/1/_DSC3436.JPG";
import album1_3 from "../../albums/1/_DSC3461.JPG";
import album1_4 from "../../albums/1/_DSC3475.JPG";
import album1_5 from "../../albums/1/_DSC3537.JPG";
import album1_6 from "../../albums/1/_DSC3561.JPG";
import album1_7 from "../../albums/1/_DSC4049.JPG";
import album1_8 from "../../albums/1/_DSC4125.JPG";
import album1_9 from "../../albums/1/_DSC4207.JPG";
import album1_10 from "../../albums/1/_DSC4224.JPG";
import album1_11 from "../../albums/1/_DSC0203.JPG";
import album1_12 from "../../albums/1/DSC04395.JPG";
import album1_13 from "../../albums/1/DSC04402.JPG";
import album1_14 from "../../albums/1/DSC04407.JPG";
import album1_15 from "../../albums/1/DSC04409.JPG";
import album1_16 from "../../albums/1/DSC04435.JPG";
import album1_17 from "../../albums/1/DSC04438.JPG";
import album1_18 from "../../albums/1/DSC04453.JPG";
import album1_19 from "../../albums/1/DSC04486.JPG";
import album1_20 from "../../albums/1/DSC04543.JPG";
import album1_21 from "../../albums/1/DSC06122.jpg";
import album1_22 from "../../albums/1/DSC06138.jpg";
import album1_23 from "../../albums/1/DSC06145.jpg";
import album1_24 from "../../albums/1/DSC06159.jpg";
import album1_25 from "../../albums/1/DSC06166.jpg";
import album1_26 from "../../albums/1/DSC06183.jpg";
import album1_27 from "../../albums/1/DSC06195.jpg";
import album1_28 from "../../albums/1/DSC06216.jpg";
import album1_29 from "../../albums/1/DSC06260.JPG";
import album1_30 from "../../albums/1/DSC06261.JPG";
import album1_31 from "../../albums/1/DSC06781.jpg";
import album1_32 from "../../albums/1/DSC06799.jpg";
import album1_33 from "../../albums/1/DSC06808.jpg";
import album1_34 from "../../albums/1/DSC06822.jpg";
import album1_35 from "../../albums/1/DSC06845.jpg";
import album1_36 from "../../albums/1/DSC06858.jpg";
import album1_37 from "../../albums/1/DSC06869.jpg";
import album1_38 from "../../albums/1/DSC06904.jpg";
import album1_39 from "../../albums/1/DSC06906.jpg";
import album1_40 from "../../albums/1/DSC06913.jpg";
import album1_41 from "../../albums/1/DSC02448.JPG";
import album1_42 from "../../albums/1/DSC02462.JPG";
import album1_43 from "../../albums/1/DSC02546.JPG";
import album1_44 from "../../albums/1/DSC02549.JPG";
import album1_45 from "../../albums/1/IMG_1624.JPG";
import album1_46 from "../../albums/1/IMG_1631.JPG";
import album1_47 from "../../albums/1/IMG_8982.JPG";
import album1_48 from "../../albums/1/IMG_8987.JPG";
import album1_49 from "../../albums/1/IMG_5802.JPG";
import album1_50 from "../../albums/1/IMG_5804.JPG";
import album1_51 from "../../albums/1/IMG_5841.JPG";
import album1_52 from "../../albums/1/IMG_5842.JPG";

import album2_1 from "../../albums/2/2.jpg";
import album2_2 from "../../albums/2/3.jpg";
import album2_3 from "../../albums/2/4.jpg";
import album2_4 from "../../albums/2/5.jpg";
import album2_5 from "../../albums/2/6.jpg";
import album2_6 from "../../albums/2/7.jpg";
import album2_7 from "../../albums/2/8.jpg";

import albums3_1 from "../../albums/3/DSC08407.JPG";
import albums3_2 from "../../albums/3/DSC08431.JPG";
import albums3_3 from "../../albums/3/DSC08443.JPG";
import albums3_4 from "../../albums/3/DSC08450.JPG";
import albums3_5 from "../../albums/3/DSC08457.JPG";
import albums3_6 from "../../albums/3/DSC08476.JPG";
import albums3_7 from "../../albums/3/DSC08568.JPG";
import albums3_8 from "../../albums/3/DSC08585.JPG";
import albums3_9 from "../../albums/3/DSC08659.JPG";

import album4_1 from "../../albums/4/DSC00180.JPG";
import album4_2 from "../../albums/4/DSC00198.JPG";
import album4_3 from "../../albums/4/DSC00207.JPG";
import album4_4 from "../../albums/4/DSC00209.JPG";
import album4_5 from "../../albums/4/DSC00372.JPG";
import album4_6 from "../../albums/4/DSC00378.JPG";
import album4_7 from "../../albums/4/DSC00402.JPG";
import album4_8 from "../../albums/4/DSC00415.JPG";
import album4_9 from "../../albums/4/DSC00437.JPG";
import album4_10 from "../../albums/4/DSC00439.JPG";

// --- collections videos ------------------------------------------------
import poster6_1 from "../../albums/8.png";
import poster6_2 from "../../albums/6.png";
import poster7_1 from "../../albums/7.png";

gsap.registerPlugin(ScrollTrigger);

const albums = [
  {
    id: 1,
    title: "Weddings",
    cover: album1,
    mediaType: "photo",
    imageCount: 52,
    photos: [
      album1_1,
      album1_2,
      album1_3,
      album1_4,
      album1_5,
      album1_6,
      album1_7,
      album1_8,
      album1_9,
      album1_10,
      album1_11,
      album1_12,
      album1_13,
      album1_14,
      album1_15,
      album1_16,
      album1_17,
      album1_18,
      album1_19,
      album1_20,
      album1_21,
      album1_22,
      album1_23,
      album1_24,
      album1_25,
      album1_26,
      album1_27,
      album1_28,
      album1_29,
      album1_30,
      album1_31,
      album1_32,
      album1_33,
      album1_34,
      album1_35,
      album1_36,
      album1_37,
      album1_38,
      album1_39,
      album1_40,
      album1_41,
      album1_42,
      album1_43,
      album1_44,
      album1_45,
      album1_46,
      album1_47,
      album1_48,
      album1_49,
      album1_50,
      album1_51,
      album1_52,
    ],
    videos: [],
  },
  {
    id: 2,
    title: "Fashion & Branding",
    cover: album2,
    mediaType: "photo",
    imageCount: 7,
    photos: [
      album2_1,
      album2_2,
      album2_3,
      album2_4,
      album2_5,
      album2_6,
      album2_7,
    ],
    videos: [],
  },
  {
    id: 3,
    title: "Film & Cinematic",
    cover: album3,
    mediaType: "photo",
    imageCount: 9,
    photos: [
      albums3_1,
      albums3_2,
      albums3_3,
      albums3_4,
      albums3_5,
      albums3_6,
      albums3_7,
      albums3_8,
      albums3_9,
    ],
    videos: [],
  },
  {
    id: 4,
    title: "Portraits & Lifestyle",
    cover: album4,
    mediaType: "photo",
    imageCount: 10,
    photos: [
      album4_1,
      album4_2,
      album4_3,
      album4_4,
      album4_5,
      album4_6,
      album4_7,
      album4_8,
      album4_9,
      album4_10,
    ],
    videos: [],
  },
  {
    id: 6,
    title: "Couple Songs",
    cover: album6,
    mediaType: "video",
    imageCount: 2,
    photos: [],
    videos: [],
  },
  {
    id: 7,
    title: "Songs & Music Videos",
    cover: album7,
    mediaType: "video",
    imageCount: 1,
    photos: [],
    videos: [],
  },
];

const mediaCountOf = (album) =>
  album.mediaType === "video" ? album.videos.length : album.imageCount;

const mediaLabelOf = (album) => {
  const count = mediaCountOf(album);

  if (album.mediaType === "video") {
    return count === 1 ? "Video" : "Videos";
  }

  return count === 1 ? "Photo" : "Photos";
};

const formatDuration = (seconds) => {
  if (!seconds || !isFinite(seconds)) return null;

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${String(secs).padStart(2, "0")}`;
};

// -------------------------------------------------------------------------
// Responsive card sizing
// -------------------------------------------------------------------------

const MAX_CARD_WIDTH = 680;
const MAX_TRAIN_GAP = 40;

const getResponsiveCardDims = () => {
  if (typeof window === "undefined") {
    return {
      width: MAX_CARD_WIDTH,
      gap: MAX_TRAIN_GAP,
      peekVisible: MAX_CARD_WIDTH / 2,
    };
  }

  const vw = window.innerWidth;

  if (vw < 480) {
    const width = Math.round(vw * 0.8);

    return {
      width,
      gap: 12,
      peekVisible: 14,
    };
  }

  if (vw < 768) {
    const width = Math.min(460, Math.round(vw * 0.74));

    return {
      width,
      gap: 18,
      peekVisible: 26,
    };
  }

  if (vw < 1024) {
    const width = Math.min(560, Math.round(vw * 0.6));

    return {
      width,
      gap: 28,
      peekVisible: 80,
    };
  }

  if (vw < 1280) {
    const width = Math.min(620, Math.round(vw * 0.5));

    return {
      width,
      gap: 34,
      peekVisible: 160,
    };
  }

  return {
    width: MAX_CARD_WIDTH,
    gap: MAX_TRAIN_GAP,
    peekVisible: MAX_CARD_WIDTH / 2,
  };
};

const getPeekOffset = (
  viewportWidth,
  cardWidth,
  peekVisible,
) => {
  return (
    viewportWidth / 2 +
    cardWidth / 2 -
    peekVisible
  );
};

// -------------------------------------------------------------------------
// Lazy-loaded photo tile
// -------------------------------------------------------------------------

const EAGER_PHOTO_COUNT = 6;

const PhotoTile = ({
  src,
  alt,
  eager,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden bg-warm-white/5"
      style={{
        marginBottom: "clamp(16px, 3vw, 32px)",
        WebkitColumnBreakInside: "avoid",
        pageBreakInside: "avoid",
        breakInside: "avoid",
        display: "inline-block",
        width: "100%",
        minHeight: loaded
          ? undefined
          : "280px",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      />
    </div>
  );
};

const SNAP_DURATION = 0.6;
const SNAP_EASE = "power2.out";

const WS_DURATION = 0.7;
const WS_EASE = "power3.inOut";

const PLAYER_DURATION = 0.45;
const PLAYER_EASE = "power3.out";

const HeroSequence = () => {
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const highlightCardRef = useRef(null);
  const titleRef = useRef(null);
  const wsSectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Video player refs
  const playerOverlayRef = useRef(null);
  const playerFrameRef = useRef(null);
  const playerVideoRef = useRef(null);
  const previewVideoRefs = useRef([]);

  const isFullscreenRef = useRef(false);
  const activeVideoRef = useRef(null);

  const centerIndexRef = useRef(-2);

  const peekOffsetRef = useRef(0);
  const farOffsetRef = useRef(0);

  const cardWidthRef = useRef(MAX_CARD_WIDTH);
  const cardGapRef = useRef(MAX_TRAIN_GAP);

  const [cardWidth, setCardWidth] =
    useState(MAX_CARD_WIDTH);

  const scrollTriggerRef = useRef(null);
  const currentFrameRef = useRef(null);
  const heroCompleteRef = useRef(false);
  const resizeTimeoutRef = useRef(null);

  const [currentFrame, setCurrentFrame] =
    useState(0);

  const [heroComplete, setHeroComplete] =
    useState(false);

  const [displayedIndex, setDisplayedIndex] = useState(-1);

  // -----------------------------------------------------------------------
  // LOADER
  // -----------------------------------------------------------------------

  const [loaderVisible, setLoaderVisible] =
    useState(true);

  const loaderRef = useRef(null);
  const loaderProgressRef = useRef(null);

  // Works showcase
  const [selectedAlbumIndex, setSelectedAlbumIndex] =
    useState(null);

  const [isWsOpen, setIsWsOpen] =
    useState(false);

  // Video player
  const [activeVideo, setActiveVideo] =
    useState(null);

  const [durations, setDurations] =
    useState({});

  const prefersReducedMotion =
    useReducedMotion();

  // -----------------------------------------------------------------------
  // Frame phase
  // -----------------------------------------------------------------------

  const FRAME_COUNT = 291;
  const FRAME_SCROLL_DISTANCE = 3;

  // -----------------------------------------------------------------------
  // Cards phase
  // -----------------------------------------------------------------------

  const CARDS_SCROLL_DISTANCE = 7;
  const HIGHLIGHT_FADE_FRACTION = 0.2;

  const TOTAL_SCROLL_DISTANCE =
    FRAME_SCROLL_DISTANCE +
    CARDS_SCROLL_DISTANCE;

  const FRAME_FRACTION =
    FRAME_SCROLL_DISTANCE /
    TOTAL_SCROLL_DISTANCE;

  const NUM_CARDS = albums.length;

  const SEGMENT_SIZE =
    1 / NUM_CARDS;

  const getStep = () =>
    cardWidthRef.current +
    cardGapRef.current;

  const [contactHovered, setContactHovered] =
    useState(false);

  // -----------------------------------------------------------------------
  // FRAME SEQUENCE
  // -----------------------------------------------------------------------

  const {
    loadingProgress,
    isLoaded,
    getFrame,
    getFrameIndexFromProgress,
  } = useFrameSequence({
    frameCount: FRAME_COUNT,
    framePathTemplate:
      "/hero/frames/frame.{index}.jpeg",
    startFrame: 1,
    paddingLength: 3,
  });

  // -----------------------------------------------------------------------
  // LOADER FINISH
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!isLoaded) return;

    const loader = loaderRef.current;

    if (!loader) {
      setLoaderVisible(false);
      return;
    }

    // Make absolutely sure the progress reaches 100%.
    gsap.set(
      loaderProgressRef.current,
      {
        width: "100%",
      },
    );

    // Give the user a short moment to actually see "100%".
    const timer = setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: prefersReducedMotion
          ? 0
          : 1,
        ease: "power2.inOut",
        onComplete: () => {
          setLoaderVisible(false);
        },
      });
    }, prefersReducedMotion ? 0 : 500);

    return () => clearTimeout(timer);
  }, [
    isLoaded,
    prefersReducedMotion,
  ]);

  // -----------------------------------------------------------------------
  // FRAME UPDATE
  // -----------------------------------------------------------------------

  const updateFrame = (progress) => {
    const frameIndex =
      getFrameIndexFromProgress(progress);

    const frame =
      getFrame(frameIndex);

    if (
      frame &&
      frame !== currentFrameRef.current
    ) {
      currentFrameRef.current = frame;
      setCurrentFrame(frame);
    }
  };

  // -----------------------------------------------------------------------
  // CARD POSITIONING
  // -----------------------------------------------------------------------

  const targetXForCard = (
    i,
    centerIndex,
  ) => {
    if (centerIndex === -2) {
      return farOffsetRef.current;
    }

    if (i === centerIndex) {
      return 0;
    }

    const step = getStep();

    if (i > centerIndex) {
      const distanceAhead =
        i - centerIndex;

      return (
        peekOffsetRef.current +
        (distanceAhead - 1) * step
      );
    }

    const distanceBehind =
      centerIndex - i;

    return -(
      peekOffsetRef.current +
      (distanceBehind - 1) * step
    );
  };

  const applyCenterIndex = (
    newCenterIndex,
  ) => {
    if (
      centerIndexRef.current ===
      newCenterIndex
    ) {
      return;
    }

    centerIndexRef.current =
      newCenterIndex;

    cardRefs.current.forEach(
      (el, i) => {
        if (!el) return;

        gsap.to(el, {
          x: targetXForCard(
            i,
            newCenterIndex,
          ),
          duration: SNAP_DURATION,
          ease: SNAP_EASE,
          overwrite: "auto",
        });
      },
    );

    setDisplayedIndex(
      newCenterIndex >= 0
        ? newCenterIndex
        : -1,
    );
  };

  // -----------------------------------------------------------------------
  // WORKS SHOWCASE
  // -----------------------------------------------------------------------

  const openWsSection = (index) => {
    setSelectedAlbumIndex(index);
    setIsWsOpen(true);
  };

  const closeWsSection = () => {
    closeVideo();
    setIsWsOpen(false);
  };

  // -----------------------------------------------------------------------
  // VIDEO PLAYER
  // -----------------------------------------------------------------------

  const resetPreview = (el) => {
    if (!el) return;

    el.pause();
    el.currentTime = 0;
    el.load();
  };

  const openVideo = (video) => {
    previewVideoRefs.current.forEach(
      resetPreview,
    );

    setActiveVideo(video);
  };

  const closeVideo = () => {
    if (!activeVideo) return;

    const finish = () => {
      setActiveVideo(null);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    if (playerVideoRef.current) {
      playerVideoRef.current.pause();
    }

    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement
    ) {
      (
        document.exitFullscreen ||
        document.webkitExitFullscreen
      )?.call(document);
    }

    if (
      prefersReducedMotion ||
      !playerOverlayRef.current
    ) {
      finish();
      return;
    }

    gsap.to(
      playerFrameRef.current,
      {
        scale: 0.96,
        y: 16,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
      },
    );

    gsap.to(
      playerOverlayRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: finish,
      },
    );
  };

  // -----------------------------------------------------------------------
  // PLAYER ENTRANCE
  // -----------------------------------------------------------------------

  useGSAP(() => {
    if (
      !activeVideo ||
      !playerOverlayRef.current
    ) {
      return;
    }

    gsap.fromTo(
      playerOverlayRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration:
          prefersReducedMotion
            ? 0
            : 0.3,
        ease: "power2.out",
        overwrite: "auto",
      },
    );

    gsap.fromTo(
      playerFrameRef.current,
      {
        scale:
          prefersReducedMotion
            ? 1
            : 0.94,

        y:
          prefersReducedMotion
            ? 0
            : 24,

        opacity: 0,
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration:
          prefersReducedMotion
            ? 0
            : PLAYER_DURATION,
        ease: PLAYER_EASE,
        overwrite: "auto",
      },
    );
  }, [
    activeVideo,
    prefersReducedMotion,
  ]);

  // -----------------------------------------------------------------------
  // ACTIVE VIDEO REF
  // -----------------------------------------------------------------------

  useEffect(() => {
    activeVideoRef.current =
      activeVideo;
  }, [activeVideo]);

  // -----------------------------------------------------------------------
  // FULLSCREEN
  // -----------------------------------------------------------------------

  useEffect(() => {
    const onFullscreenChange = () => {
      isFullscreenRef.current =
        Boolean(
          document.fullscreenElement ||
            document.webkitFullscreenElement,
        );
    };

    document.addEventListener(
      "fullscreenchange",
      onFullscreenChange,
    );

    document.addEventListener(
      "webkitfullscreenchange",
      onFullscreenChange,
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        onFullscreenChange,
      );

      document.removeEventListener(
        "webkitfullscreenchange",
        onFullscreenChange,
      );
    };
  }, []);

  // -----------------------------------------------------------------------
  // ESC
  // -----------------------------------------------------------------------

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;

      if (activeVideo) {
        closeVideo();
      } else if (isWsOpen) {
        setIsWsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
  }, [
    activeVideo,
    isWsOpen,
  ]);

  // -----------------------------------------------------------------------
  // WORKS SHOWCASE ANIMATION
  // -----------------------------------------------------------------------

  useGSAP(() => {
    if (!wsSectionRef.current) return;

    if (isWsOpen) {
      gsap.to(
        wsSectionRef.current,
        {
          y: "0%",
          duration:
            prefersReducedMotion
              ? 0
              : WS_DURATION,
          ease: WS_EASE,
          overwrite: "auto",
        },
      );
    } else {
      gsap.to(
        wsSectionRef.current,
        {
          y: "100%",
          duration:
            prefersReducedMotion
              ? 0
              : WS_DURATION,
          ease: WS_EASE,
          overwrite: "auto",
          onComplete: () => {
            setSelectedAlbumIndex(null);
          },
        },
      );
    }
  }, [
    isWsOpen,
    prefersReducedMotion,
  ]);

  // -----------------------------------------------------------------------
  // MAIN SCROLLTRIGGER
  // -----------------------------------------------------------------------

  useGSAP(() => {
    if (
      !isLoaded ||
      prefersReducedMotion
    ) {
      return;
    }

    const container =
      containerRef.current;

    const viewportWidth =
      window.innerWidth;

    const {
      width,
      gap,
      peekVisible,
    } = getResponsiveCardDims();

    cardWidthRef.current =
      width;

    cardGapRef.current =
      gap;

    setCardWidth(width);

    peekOffsetRef.current =
      getPeekOffset(
        viewportWidth,
        width,
        peekVisible,
      );

    farOffsetRef.current =
      viewportWidth / 2 +
      width / 2 +
      40;

    centerIndexRef.current =
      -2;

    cardRefs.current.forEach(
      (el) => {
        if (el) {
          gsap.set(el, {
            x: farOffsetRef.current,
          });
        }
      },
    );

    // Hero starts visible.
    gsap.set(
      canvasWrapperRef.current,
      {
        opacity: 1,
      },
    );

    gsap.set(
      highlightCardRef.current,
      {
        opacity: 0,
      },
    );

    gsap.set(titleRef.current, {
      opacity: 0,
    });

    gsap.set(wsSectionRef.current, {
      y: "100%",
    });

    scrollTriggerRef.current =
      ScrollTrigger.create({
        trigger: container,

        start: "top top",

        end: `+=${
          window.innerHeight *
          TOTAL_SCROLL_DISTANCE
        }`,

        pin: true,

        pinSpacing: true,

        anticipatePin: 1,

        scrub: 0.5,

        onUpdate: (self) => {
          const progress =
            self.progress;

          if (
            progress <=
            FRAME_FRACTION
          ) {
            const frameProgress =
              progress /
              FRAME_FRACTION;

            updateFrame(
              frameProgress,
            );

            gsap.set(
              canvasWrapperRef.current,
              {
                opacity: 1,
              },
            );

            gsap.set(
              highlightCardRef.current,
              {
                opacity: 0,
              },
            );

            gsap.set(
              titleRef.current,
              {
                opacity: 0,
              },
            );

            applyCenterIndex(-2);

            if (
              heroCompleteRef.current
            ) {
              heroCompleteRef.current =
                false;

              setHeroComplete(false);
            }
          } else {
            const cardsProgress =
              (progress -
                FRAME_FRACTION) /
              (1 -
                FRAME_FRACTION);

            const canvasOpacity =
              gsap.utils.clamp(
                0,
                1,
                1 -
                  cardsProgress /
                    0.2,
              );

            gsap.set(
              canvasWrapperRef.current,
              {
                opacity:
                  canvasOpacity,
              },
            );

            const highlightOpacity =
              gsap.utils.clamp(
                0,
                1,
                cardsProgress /
                  HIGHLIGHT_FADE_FRACTION,
              );

            gsap.set(
              highlightCardRef.current,
              {
                opacity:
                  highlightOpacity,
              },
            );

            gsap.set(
              titleRef.current,
              {
                opacity:
                  highlightOpacity,
              },
            );

            const rawIndex =
              cardsProgress /
              SEGMENT_SIZE;

            const activeIndex =
              gsap.utils.clamp(
                0,
                NUM_CARDS - 1,
                Math.floor(
                  rawIndex,
                ),
              );

            const localProgress =
              gsap.utils.clamp(
                0,
                1,
                rawIndex -
                  activeIndex,
              );

            const crossedHalf =
              localProgress >=
              0.5;

            const centerIndex =
              crossedHalf
                ? activeIndex
                : activeIndex - 1;

            applyCenterIndex(
              centerIndex,
            );

            if (
              !heroCompleteRef.current
            ) {
              heroCompleteRef.current =
                true;

              setHeroComplete(true);
            }
          }
        },
      });

    updateFrame(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      if (
        scrollTriggerRef.current
      ) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [
    isLoaded,
    prefersReducedMotion,
  ]);

  // -----------------------------------------------------------------------
  // RESIZE
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      if (
        isFullscreenRef.current ||
        activeVideoRef.current
      ) {
        return;
      }

      if (resizeTimeoutRef.current) {
        clearTimeout(
          resizeTimeoutRef.current,
        );
      }

      resizeTimeoutRef.current =
        setTimeout(() => {
          if (
            isFullscreenRef.current ||
            activeVideoRef.current
          ) {
            return;
          }

          const viewportWidth =
            window.innerWidth;

          const {
            width,
            gap,
            peekVisible,
          } =
            getResponsiveCardDims();

          cardWidthRef.current =
            width;

          cardGapRef.current =
            gap;

          setCardWidth(width);

          peekOffsetRef.current =
            getPeekOffset(
              viewportWidth,
              width,
              peekVisible,
            );

          farOffsetRef.current =
            viewportWidth / 2 +
            width / 2 +
            40;

          cardRefs.current.forEach(
            (el, i) => {
              if (!el) return;

              gsap.set(el, {
                x: targetXForCard(
                  i,
                  centerIndexRef.current,
                ),
              });
            },
          );

          if (
            scrollTriggerRef.current
          ) {
            ScrollTrigger.refresh();
          }
        }, 150);
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );

      if (
        resizeTimeoutRef.current
      ) {
        clearTimeout(
          resizeTimeoutRef.current,
        );
      }
    };
  }, [isLoaded]);

  // -----------------------------------------------------------------------
  // REDUCED MOTION
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (
      prefersReducedMotion &&
      isLoaded
    ) {
      const lastFrame =
        getFrame(FRAME_COUNT);

      setCurrentFrame(
        lastFrame,
      );

      setHeroComplete(true);

      setDisplayedIndex(
        NUM_CARDS - 1,
      );

      if (
        canvasWrapperRef.current
      ) {
        gsap.set(
          canvasWrapperRef.current,
          {
            opacity: 0,
          },
        );
      }

      if (
        highlightCardRef.current
      ) {
        gsap.set(
          highlightCardRef.current,
          {
            opacity: 1,
          },
        );
      }

      if (titleRef.current) {
        gsap.set(
          titleRef.current,
          {
            opacity: 1,
          },
        );
      }

      if (wsSectionRef.current) {
        gsap.set(
          wsSectionRef.current,
          {
            y: "100%",
          },
        );
      }

      const viewportWidth =
        window.innerWidth;

      const { width } =
        getResponsiveCardDims();

      cardWidthRef.current =
        width;

      setCardWidth(width);

      const far =
        viewportWidth / 2 +
        width / 2 +
        40;

      cardRefs.current.forEach(
        (el, i) => {
          if (!el) return;

          gsap.set(el, {
            x:
              i ===
              NUM_CARDS - 1
                ? 0
                : -far,
          });
        },
      );
    }
  }, [
    prefersReducedMotion,
    isLoaded,
  ]);

  // -----------------------------------------------------------------------
  // BODY SCROLL LOCK
  // -----------------------------------------------------------------------

  useEffect(() => {
    document.body.classList.toggle(
      "ws-open",
      isWsOpen,
    );

    const html =
      document.documentElement;

    const prevHtmlOverflow =
      html.style.overflow;

    const prevBodyOverflow =
      document.body.style.overflow;

    if (isWsOpen) {
      html.style.overflow =
        "hidden";

      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.body.classList.remove(
        "ws-open",
      );

      html.style.overflow =
        prevHtmlOverflow;

      document.body.style.overflow =
        prevBodyOverflow;
    };
  }, [isWsOpen]);

  // -----------------------------------------------------------------------
  // CURRENT ALBUMS
  // -----------------------------------------------------------------------

  const displayedAlbum =
    displayedIndex >= 0
      ? albums[displayedIndex]
      : null;

  const selectedAlbum =
    selectedAlbumIndex !== null
      ? albums[selectedAlbumIndex]
      : null;

  // -----------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------

  return (
    <>
      {/* ================================================================
          CINEMATIC LOADER
          IMPORTANT: This is OUTSIDE the main container.
          It therefore cannot inherit the hero's opacity.
      ================================================================= */}

      {loaderVisible && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[99999] bg-black text-white flex items-center justify-center"
          style={{
            opacity: 1,
            pointerEvents: "all",
          }}
        >
          <div className="w-full max-w-md px-8 sm:px-10">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/40 mb-3">
                  SY.PHOTOGRAPHY
                </p>

                <p className="text-lg sm:text-xl tracking-wide font-light">
                  {loadingProgress >=
                  100
                    ? "READY"
                    : "INITIALIZING"}
                </p>
              </div>

              <span className="text-3xl sm:text-4xl font-light tabular-nums">
                {String(
                  loadingProgress,
                ).padStart(2, "0")}

                <span className="text-white/30 text-base sm:text-lg ml-1">
                  %
                </span>
              </span>
            </div>

            <div className="relative w-full h-[2px] bg-white/15 overflow-hidden">
              <div
                ref={
                  loaderProgressRef
                }
                className="absolute inset-y-0 left-0 bg-white"
                style={{
                  width: `${loadingProgress}%`,
                }}
              />
            </div>

            <div className="flex justify-between mt-3 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-white/25">
              <span>
                Loading visual
                sequence
              </span>

              <span>
                {FRAME_COUNT} frames
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================
          MAIN PORTFOLIO
      ================================================================= */}

      <div
        ref={containerRef}
        className="relative w-screen h-screen bg-black overflow-hidden"
        style={{
          fontFamily:
            "'Oswald', sans-serif",
        }}
      >
        {/* Contact Now */}
        <button
          onClick={() => {
            window.open(
              "https://wa.me/03490452872",
              "_blank",
              "noopener,noreferrer",
            );
          }}
          onMouseEnter={() =>
            setContactHovered(true)
          }
          onMouseLeave={() =>
            setContactHovered(false)
          }
          className="group fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 cursor-pointer"
          style={{
            fontFamily:
              "'Oswald', sans-serif",
          }}
        >
          <div className="relative flex items-center justify-center gap-2 sm:gap-4 bg-black/40 backdrop-blur-sm border border-warm-white/20 rounded-full transition-all duration-300 group-hover:border-warm-white/60 group-hover:bg-black/70 w-[170px] h-[56px] px-5 sm:w-[260px] sm:h-[80px] sm:px-8">
            <span className="text-warm-white text-base sm:text-2xl tracking-wide whitespace-nowrap">
              Contact Now
            </span>

            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 sm:w-7 sm:h-7 text-warm-white transition-transform duration-300 group-hover:translate-x-1 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
              />

              <polyline points="12 5 19 12 12 19" />
            </svg>

            <span
              className="absolute -top-1 -left-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-warm-white transition-opacity duration-200"
              style={{
                opacity:
                  contactHovered
                    ? 1
                    : 0,
              }}
            />

            <span
              className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-warm-white transition-opacity duration-200"
              style={{
                opacity:
                  contactHovered
                    ? 1
                    : 0,
              }}
            />

            <span
              className="absolute -bottom-1 -left-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-warm-white transition-opacity duration-200"
              style={{
                opacity:
                  contactHovered
                    ? 1
                    : 0,
              }}
            />

            <span
              className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-warm-white transition-opacity duration-200"
              style={{
                opacity:
                  contactHovered
                    ? 1
                    : 0,
              }}
            />
          </div>
        </button>

        {/* ================================================================
            HERO CANVAS
        ================================================================= */}

        <div
          ref={canvasWrapperRef}
          className="absolute inset-0"
          style={{
            pointerEvents:
              heroComplete
                ? "none"
                : "auto",
          }}
        >
          {currentFrame && (
            <HeroCanvas
              currentFrame={
                currentFrame
              }
              className="opacity-100"
            />
          )}
        </div>

        {/* ================================================================
            COLLECTION TITLE
        ================================================================= */}

        <div
          ref={titleRef}
          className="relative z-30 w-screen justify-center flex px-4"
          style={{
            paddingTop:
              "calc(var(--navbar-h, 90px) + clamp(16px, 4vw, 40px))",
            pointerEvents: "none",
          }}
        >
          <h1 className="text-warm-white text-4xl sm:text-5xl md:text-7xl text-center">
            Collections.
          </h1>
        </div>

        {/* ================================================================
            COLLECTION CARDS
        ================================================================= */}

        {albums.map(
          (album, i) => (
            <div
              key={album.id}
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
              <div
                ref={(el) =>
                  (cardRefs.current[i] =
                    el)
                }
                onClick={() =>
                  openWsSection(i)
                }
                className="shrink-0 aspect-video rounded-lg overflow-hidden relative bg-black cursor-pointer"
                style={{
                  pointerEvents:
                    heroComplete
                      ? "auto"
                      : "none",

                  width: `${cardWidth}px`,
                }}
              >
                <img
                  src={album.cover}
                  alt={album.title}
                  className={`w-full h-full ${
                    [3, 4, 5].includes(
                      album.id,
                    )
                      ? "object-contain"
                      : "object-cover"
                  }`}
                />

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>
            </div>
          ),
        )}

        {/* ================================================================
            DISPLAYED ALBUM INFO
        ================================================================= */}

        {displayedAlbum && (
          <div className="absolute bottom-8 left-6 sm:bottom-16 sm:left-16 z-30 max-w-[80vw]">
            <h3 className="text-warm-white text-2xl sm:text-4xl md:text-5xl font-light">
              {
                displayedAlbum.title
              }
            </h3>

            <p className="text-warm-white/60 text-base sm:text-lg md:text-xl mt-2">
              {String(
                mediaCountOf(
                  displayedAlbum,
                ),
              ).padStart(2, "0")}{" "}
              {mediaLabelOf(
                displayedAlbum,
              )}
            </p>
          </div>
        )}

        {/* ================================================================
            HIGHLIGHT CARD
        ================================================================= */}

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div
            ref={highlightCardRef}
            className="relative aspect-video"
            style={{
              width: `${cardWidth + 15}px`,
            }}
          >
            <span className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-4 sm:border-t-8 md:border-t-10 border-l-4 sm:border-l-8 md:border-l-10 border-white" />

            <span className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-4 sm:border-t-8 md:border-t-10 border-r-4 sm:border-r-8 md:border-r-10 border-white" />

            <span className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-4 sm:border-b-8 md:border-b-10 border-l-4 sm:border-l-8 md:border-l-10 border-white" />

            <span className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-4 sm:border-b-8 md:border-b-10 border-r-4 sm:border-r-8 md:border-r-10 border-white" />
          </div>
        </div>

        {/* ================================================================
            WORKS SHOWCASE
        ================================================================= */}

        <div
          ref={wsSectionRef}
          className="absolute inset-0 z-50 bg-black overflow-y-auto overscroll-contain"
          style={{
            pointerEvents:
              isWsOpen
                ? "auto"
                : "none",
          }}
        >
          {selectedAlbum && (
            <>
              <div className="sticky top-0 z-50 h-0">
                <button
                  onClick={
                    closeWsSection
                  }
                  aria-label="Close"
                  className="absolute top-4 left-4 sm:top-8 sm:left-8 text-warm-white text-2xl sm:text-3xl md:text-4xl font-light hover:opacity-60 transition-opacity cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="min-h-screen px-4 sm:px-8 md:px-16 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24">
                <div className="flex flex-col items-center">
                  <h2 className="text-warm-white text-3xl sm:text-4xl md:text-6xl font-light text-center px-8">
                    <div className="spacer w-full h-6 sm:h-8 md:h-10" />

                    {
                      selectedAlbum.title
                    }
                  </h2>

                  <div className="spacer w-full h-6 sm:h-8 md:h-10" />

                  <p className="text-warm-white/60 text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6">
                    {String(
                      mediaCountOf(
                        selectedAlbum,
                      ),
                    ).padStart(
                      2,
                      "0",
                    )}{" "}
                    {mediaLabelOf(
                      selectedAlbum,
                    )}
                  </p>
                </div>

                {selectedAlbum.mediaType ===
                "video" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 xl:gap-8 mt-8 sm:mt-10">
                    {selectedAlbum.videos.map(
                      (
                        video,
                        idx,
                      ) => (
                        <button
                          key={
                            video.src
                          }
                          type="button"
                          onClick={() =>
                            openVideo(
                              video,
                            )
                          }
                          onMouseEnter={(
                            e,
                          ) => {
                            if (
                              prefersReducedMotion
                            )
                              return;

                            const el =
                              e.currentTarget.querySelector(
                                "video",
                              );

                            if (el) {
                              el.play().catch(
                                () => {},
                              );
                            }
                          }}
                          onMouseLeave={(
                            e,
                          ) =>
                            resetPreview(
                              e.currentTarget.querySelector(
                                "video",
                              ),
                            )
                          }
                          aria-label={`Play ${
                            video.title ||
                            selectedAlbum.title
                          }`}
                          className="group relative block w-full aspect-video rounded-lg overflow-hidden bg-warm-white/5 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-white/80"
                        >
                          <video
                            ref={(el) =>
                              (previewVideoRefs.current[
                                idx
                              ] = el)
                            }
                            src={
                              video.src
                            }
                            poster={
                              video.poster
                            }
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            onLoadedMetadata={(
                              e,
                            ) => {
                              const secs =
                                e.currentTarget
                                  .duration;

                              setDurations(
                                (
                                  prev,
                                ) =>
                                  prev[
                                    video.src
                                  ]
                                    ? prev
                                    : {
                                        ...prev,
                                        [video.src]:
                                          secs,
                                      },
                              );
                            }}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-warm-white/40 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:border-warm-white/80 group-hover:bg-black/60">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5 sm:w-6 sm:h-6 text-warm-white translate-x-[1px]"
                                fill="currentColor"
                              >
                                <polygon points="6 4 20 12 6 20" />
                              </svg>
                            </span>
                          </span>

                          <span className="absolute top-2 left-2 w-5 h-5 sm:w-7 sm:h-7 border-t-2 border-l-2 border-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                          <span className="absolute top-2 right-2 w-5 h-5 sm:w-7 sm:h-7 border-t-2 border-r-2 border-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                          <span className="absolute bottom-2 left-2 w-5 h-5 sm:w-7 sm:h-7 border-b-2 border-l-2 border-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                          <span className="absolute bottom-2 right-2 w-5 h-5 sm:w-7 sm:h-7 border-b-2 border-r-2 border-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                          <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 px-4 pb-3 sm:px-5 sm:pb-4 pointer-events-none">
                            <span className="text-warm-white text-base sm:text-lg font-light leading-tight">
                              {video.title ||
                                `${selectedAlbum.title} ${
                                  idx + 1
                                }`}
                            </span>

                            {formatDuration(
                              durations[
                                video.src
                              ],
                            ) && (
                              <span className="text-warm-white/60 text-sm sm:text-base shrink-0">
                                {formatDuration(
                                  durations[
                                    video.src
                                  ],
                                )}
                              </span>
                            )}
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                ) : (
                  <div
                    className="columns-1 sm:columns-2 md:columns-3 mt-8 sm:mt-10"
                    style={{
                      columnGap:
                        "clamp(16px, 3vw, 32px)",
                    }}
                  >
                    {selectedAlbum.photos.map(
                      (
                        photo,
                        idx,
                      ) => (
                        <PhotoTile
                          key={idx}
                          src={photo}
                          alt={`${selectedAlbum.title} ${
                            idx + 1
                          }`}
                          eager={
                            idx <
                            EAGER_PHOTO_COUNT
                          }
                        />
                      ),
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ================================================================
            FULLSCREEN VIDEO PLAYER
        ================================================================= */}

        {activeVideo && (
          <div
            ref={
              playerOverlayRef
            }
            onClick={closeVideo}
            role="dialog"
            aria-modal="true"
            aria-label={
              activeVideo.title ||
              "Video"
            }
            className="absolute inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md px-3 sm:px-8 pt-16 pb-10 sm:pt-20 sm:pb-14"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeVideo();
              }}
              aria-label="Close video"
              className="absolute top-3 right-3 sm:top-5 sm:right-6 text-warm-white text-2xl sm:text-3xl md:text-4xl leading-none font-light hover:opacity-60 transition-opacity cursor-pointer z-10"
            >
              ✕
            </button>

            <div
              ref={
                playerFrameRef
              }
              onClick={(e) =>
                e.stopPropagation()
              }
              className="relative w-full max-w-[1400px]"
            >
              <video
                ref={
                  playerVideoRef
                }
                src={
                  activeVideo.src
                }
                poster={
                  activeVideo.poster
                }
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                onLoadedMetadata={(
                  e,
                ) => {
                  const secs =
                    e.currentTarget
                      .duration;

                  setDurations(
                    (prev) =>
                      prev[
                        activeVideo.src
                      ]
                        ? prev
                        : {
                            ...prev,
                            [activeVideo.src]:
                              secs,
                          },
                  );
                }}
                className="w-full max-h-[72vh] sm:max-h-[78vh] rounded-lg bg-black object-contain"
              />

              <span className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-10 sm:h-10 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-warm-white pointer-events-none" />

              <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-10 sm:h-10 border-t-2 sm:border-t-4 border-r-2 sm:border-r-4 border-warm-white pointer-events-none" />

              <span className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-6 h-6 sm:w-10 sm:h-10 border-b-2 sm:border-b-4 border-l-2 sm:border-l-4 border-warm-white pointer-events-none" />

              <span className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-6 h-6 sm:w-10 sm:h-10 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-warm-white pointer-events-none" />

              {activeVideo.title && (
                <p className="text-warm-white text-lg sm:text-2xl font-light mt-5 sm:mt-7 text-center">
                  {
                    activeVideo.title
                  }
                </p>
              )}
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        {isLoaded &&
          !prefersReducedMotion &&
          !heroComplete && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator" />
          )}

        <style>{`
          @keyframes scroll-line {
            0% {
              transform: translateY(-100%);
            }

            100% {
              transform: translateY(100%);
            }
          }

          .animate-scroll-line {
            animation: scroll-line 2s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-scroll-line {
              animation: none;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default HeroSequence;