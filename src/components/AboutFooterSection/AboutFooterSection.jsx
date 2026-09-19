import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const phoneNumbers = [
  { href: "tel:03490452872", label: "0349-0452872" },
  { href: "tel:03121484969", label: "0312-1484969" },
];

const AboutFooterSection = () => {
  const sectionRef = useRef(null);
  const aboutColRef = useRef(null);
  const connectColRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = [aboutColRef.current, connectColRef.current];

      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(elements, { opacity: 0, y: 50 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div
      ref={sectionRef}
      className="relative bg-black text-warm-white w-screen min-h-[60vh] flex flex-col md:flex-row border-t-2 border-warm-white/20 overflow-hidden"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      {/* Decorative background text - large, faint, purely visual texture */}
      <span
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 text-[18vw] font-bold text-warm-white/5 whitespace-nowrap select-none"
        aria-hidden="true"
      >
        SY.PHOTOGRAPHY
      </span>

      {/* About */}
      <div
        ref={aboutColRef}
        className="about relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-warm-white/20"
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <span className="text-xs tracking-[0.3em] text-warm-white/40 mb-4">
          01 - ABOUT
        </span>

        <h1
          className="text-5xl font-bold relative inline-block"
          style={{ marginBottom: "48px" }}
        >
          About Me
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-warm-white/40" />
        </h1>

        <p className="text-xl leading-relaxed text-center w-[85%] text-warm-white/70">
          I am a passionate photographer with a love for capturing the beauty of
          the world through my lens.
        </p>
      </div>

      {/* Connect */}
      <div
        ref={connectColRef}
        className="connect relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center"
        style={{
          paddingTop: "64px",
          paddingBottom: "64px",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <span className="text-xs tracking-[0.3em] text-warm-white/40 mb-4">
          02 - CONNECT
        </span>

        <h1
          className="text-5xl font-bold relative inline-block"
          style={{ marginBottom: "48px" }}
        >
          Connect with Me
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-warm-white/40" />
        </h1>

        <div className="flex flex-col gap-5 items-start">
          {/* Phone numbers */}
          {phoneNumbers.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="group flex items-center gap-4 text-xl text-warm-white/80 hover:text-warm-white transition-colors"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-warm-white/30 group-hover:border-warm-white/70 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              {label}
            </a>
          ))}

          {/* Email */}
          <a
            href="mailto:photographersyedwajahat@gmail.com"
            className="group flex items-center gap-4 text-xl text-warm-white/80 hover:text-warm-white transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-warm-white/30 group-hover:border-warm-white/70 transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            sywajahat4@gamil.com
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/sy.photography"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-xl text-warm-white/80 hover:text-warm-white transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-warm-white/30 group-hover:border-warm-white/70 transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </span>
            @sy.photography
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutFooterSection;