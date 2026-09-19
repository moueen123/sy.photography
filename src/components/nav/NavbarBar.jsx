// Navbar.jsx
import { useState, useEffect, useRef } from "react";

const FRAME_SCROLL_DISTANCE = 3;
const MOBILE_BREAKPOINT = 768;

const NAV_LINKS = ["Home", "Collections", "About Me"];

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const linkRefs = useRef([]);
  const navListRef = useRef(null);
  const navElRef = useRef(null); // NEW: measures the actual rendered navbar height

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // NEW: publish the navbar's real height as a CSS variable (--navbar-h) on
  // <html>, so any other component (like the hero title) can pad itself
  // below the navbar correctly instead of guessing a fixed number. Keeps
  // it in sync across breakpoints, font loading, and resizes.
  useEffect(() => {
    const el = navElRef.current;
    if (!el) return;

    const publishHeight = () => {
      document.documentElement.style.setProperty(
        "--navbar-h",
        `${el.offsetHeight}px`
      );
    };

    publishHeight();

    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(publishHeight);
      observer.observe(el);
    } else {
      window.addEventListener("resize", publishHeight);
    }

    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener("resize", publishHeight);
    };
  }, [isMobile]);

  // Tracks desktop vs mobile layout, and closes the mobile menu automatically
  // if the viewport is resized/rotated past the breakpoint while it's open
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll while the full-screen mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCollections = () => {
    const target = window.innerHeight * FRAME_SCROLL_DISTANCE;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const target = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const handleClick = (link) => {
    if (link === "Home") scrollToTop();
    else if (link === "Collections") scrollToCollections();
    else scrollToBottom();
    setMenuOpen(false); // always close the mobile menu after navigating
  };

  // Moves the sliding underline to sit under whichever link is hovered —
  // desktop-only effect, skipped entirely on mobile since there's no hover
  const handleHover = (link, index) => {
    if (isMobile) return;
    setHovered(link);
    const el = linkRefs.current[index];
    const list = navListRef.current;
    if (el && list) {
      const elRect = el.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      setUnderlineStyle({
        left: elRect.left - listRect.left,
        width: elRect.width,
        opacity: 1,
      });
    }
  };

  const handleLeave = () => {
    if (isMobile) return;
    setHovered(null);
    setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      <nav
        ref={navElRef}
        className="fixed inset-x-0 top-0 z-40 transition-all duration-500"
        style={{
          fontFamily: "'Oswald', sans-serif",
          backgroundColor: scrolled ? "rgba(0,0,0,0.6)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
        }}
      >
        <div
          className="relative flex items-center justify-between"
          style={{
            paddingLeft: "clamp(16px, 4vw, 48px)",
            paddingRight: "clamp(16px, 4vw, 48px)",
            paddingTop: "clamp(4px, 0.6vw, 6px)",
            paddingBottom: "clamp(4px, 0.6vw, 6px)",
          }}
        >
          {/* Logo — subtle scale-up on hover for a bit of life */}
          <div
            className="group flex flex-col cursor-pointer"
            onClick={scrollToTop}
          >
            <span
              className="tracking-wide text-warm-white transition-transform duration-300 group-hover:scale-105 origin-left"
              style={{ fontSize: "clamp(13px, 2.2vw, 16px)" }}
            >
              Sy.Photography
            </span>
            <span
              className="tracking-wide text-warm-white/50"
              style={{
                fontSize: "clamp(11px, 1.6vw, 13px)",
                lineHeight: 1.4,
                marginTop: "2px",
              }}
            >
              by Wajahat Hussain
            </span>
          </div>

          {/* Desktop navigation — hidden below the mobile breakpoint */}
          {!isMobile && (
            <ul
              ref={navListRef}
              className="relative flex items-center"
              style={{ gap: "clamp(18px, 3vw, 40px)" }}
              onMouseLeave={handleLeave}
            >
              {/* Sliding underline — morphs between links instead of a static hover state */}
              <span
                className="absolute -bottom-2 h-[2px] bg-warm-white transition-all duration-300 ease-out"
                style={{
                  left: `${underlineStyle.left}px`,
                  width: `${underlineStyle.width}px`,
                  opacity: underlineStyle.opacity,
                }}
              />

              {NAV_LINKS.map((link, index) => (
                <li
                  key={link}
                  className="relative"
                  onMouseEnter={() => handleHover(link, index)}
                >
                  <button
                    ref={(el) => (linkRefs.current[index] = el)}
                    onClick={() => handleClick(link)}
                    className="relative cursor-pointer text-warm-white/80 transition-colors duration-200 hover:text-warm-white flex items-baseline gap-2"
                    style={{
                      fontSize: "clamp(12px, 1.4vw, 16px)",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                  >
                    {/* Numbered prefix — small, dim, only lights up on hover */}
                    <span
                      className="text-xs tracking-widest transition-colors duration-200"
                      style={{
                        color:
                          hovered === link
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link}

                    {/* Corner brackets */}
                    <span
                      className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-warm-white transition-opacity duration-200"
                      style={{ opacity: hovered === link ? 1 : 0 }}
                    />
                    <span
                      className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-warm-white transition-opacity duration-200"
                      style={{ opacity: hovered === link ? 1 : 0 }}
                    />
                    <span
                      className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-warm-white transition-opacity duration-200"
                      style={{ opacity: hovered === link ? 1 : 0 }}
                    />
                    <span
                      className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-warm-white transition-opacity duration-200"
                      style={{ opacity: hovered === link ? 1 : 0 }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile hamburger — hidden on desktop */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-[70] flex flex-col justify-center items-center gap-[4px] cursor-pointer"
              style={{ width: "22px", height: "22px" }}
            >
              <span
                className="block bg-warm-white transition-all duration-300"
                style={{
                  width: "20px",
                  height: "2px",
                  transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block bg-warm-white transition-all duration-300"
                style={{
                  width: "20px",
                  height: "2px",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block bg-warm-white transition-all duration-300"
                style={{
                  width: "20px",
                  height: "2px",
                  transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile full-screen menu overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center transition-opacity duration-300"
          style={{
            fontFamily: "'Oswald', sans-serif",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          <ul className="flex flex-col items-center" style={{ gap: "40px" }}>
            {NAV_LINKS.map((link, index) => (
              <li key={link}>
                <button
                  onClick={() => handleClick(link)}
                  className="cursor-pointer text-warm-white flex items-baseline gap-3"
                  style={{ fontSize: "clamp(28px, 8vw, 40px)" }}
                >
                  <span className="text-sm tracking-widest text-warm-white/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;