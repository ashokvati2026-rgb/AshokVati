'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* 3D bottle — client-only, wraps @react-three/fiber Canvas */
const HeroBottle3D = dynamic(() => import('@/components/HeroBottle3D'), {
  ssr: false,
});

/* ─── SVG Tree components ─────────────────────── */
function TreesSVGBack() {
  const xs = [70, 160, 255, 350, 445, 540, 630, 720, 810, 905, 995, 1085, 1175, 1265, 1365, 1430];
  return (
    <svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ display: 'block' }}
    >
      {xs.map((x, i) => {
        const h = 200 + (i % 5) * 55;
        const w = 32 + (i % 4) * 12;
        const baseY = 615 - (i % 3) * 35;
        return (
          <g key={i} transform={`translate(${x}, ${baseY})`}>
            <polygon
              points={`0,0 -${w},-${h} ${w},0`}
              fill={`rgba(27,38,32,${0.75 + (i % 3) * 0.07})`}
            />
            <polygon
              points={`0,-${h * 0.55} -${w * 0.75},-${h} ${w * 0.75},-${h * 0.55}`}
              fill={`rgba(32,45,38,${0.72 + (i % 4) * 0.05})`}
            />
          </g>
        );
      })}
    </svg>
  );
}

function TreesSVGMid() {
  const xs = [30, 145, 275, 405, 535, 655, 780, 900, 1020, 1150, 1280, 1400];
  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ display: 'block' }}
    >
      {xs.map((x, i) => {
        const h = 260 + (i % 4) * 70;
        const w = 40 + (i % 3) * 15;
        const baseY = 518;
        return (
          <g key={i} transform={`translate(${x}, ${baseY})`}>
            <polygon
              points={`0,0 -${w},-${h} ${w},0`}
              fill={`rgba(25,35,30,${0.82 + (i % 3) * 0.06})`}
            />
            <polygon
              points={`0,-${h * 0.5} -${w * 0.72},-${h} ${w * 0.72},-${h * 0.5}`}
              fill={`rgba(30,42,35,${0.78 + (i % 4) * 0.04})`}
            />
            <polygon
              points={`0,-${h * 0.72} -${w * 0.48},-${h} ${w * 0.48},-${h * 0.72}`}
              fill={`rgba(35,48,41,${0.75 + (i % 3) * 0.05})`}
            />
          </g>
        );
      })}
    </svg>
  );
}

function TreesSVGFore() {
  const xs = [0, 200, 390, 580, 770, 950, 1150, 1360];
  return (
    <svg
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ display: 'block' }}
    >
      <rect x="0" y="400" width="1440" height="22" fill="#141c18" />
      {xs.map((x, i) => {
        const h = 320 + (i % 3) * 65;
        const w = 55 + (i % 2) * 20;
        return (
          <g key={i} transform={`translate(${x + 60}, 418)`}>
            <polygon points={`0,0 -${w},-${h} ${w},0`} fill="#17221c" />
            <polygon
              points={`0,-${h * 0.48} -${w * 0.7},-${h} ${w * 0.7},-${h * 0.48}`}
              fill="#1b2821"
            />
            <polygon
              points={`0,-${h * 0.67} -${w * 0.5},-${h} ${w * 0.5},-${h * 0.67}`}
              fill="#22322a"
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Floating herb particles ─────────────────── */
const HERBS = [
  { left: '8%', top: '38%', delay: '0s', dur: '7s', size: 14 },
  { left: '18%', top: '55%', delay: '1.2s', dur: '6s', size: 10 },
  { left: '30%', top: '42%', delay: '0.5s', dur: '8s', size: 16 },
  { left: '44%', top: '65%', delay: '2s', dur: '5s', size: 11 },
  { left: '58%', top: '45%', delay: '0.8s', dur: '9s', size: 13 },
  { left: '70%', top: '60%', delay: '1.5s', dur: '6.5s', size: 15 },
  { left: '80%', top: '37%', delay: '0.3s', dur: '7.5s', size: 12 },
  { left: '90%', top: '52%', delay: '1.8s', dur: '5.5s', size: 9 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const treesBackRef = useRef<HTMLDivElement>(null);
  const treesMidRef = useRef<HTMLDivElement>(null);
  const treesForeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Entrance animation ── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.hero-tag',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.4,
      )
        .fromTo(
          '.hero-title-line-1',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          0.65,
        )
        .fromTo(
          '.hero-title-line-2',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          0.85,
        )
        .fromTo(
          '.hero-desc',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          1.1,
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          1.35,
        )
        .fromTo(
          '.hero-scroll-indicator',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.7,
        );

      /* ── Parallax layers on scroll ── */
      const st = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true };

      gsap.to(bgRef.current, { y: '25%', ease: 'none', scrollTrigger: { ...st, scrub: 0.8 } });
      gsap.to(lightRef.current, { y: '-12%', ease: 'none', scrollTrigger: { ...st, scrub: 0.6 } });
      gsap.to(treesBackRef.current, { y: '18%', ease: 'none', scrollTrigger: { ...st, scrub: 1 } });
      gsap.to(treesMidRef.current, { y: '32%', ease: 'none', scrollTrigger: { ...st, scrub: 1.4 } });
      gsap.to(treesForeRef.current, { y: '50%', ease: 'none', scrollTrigger: { ...st, scrub: 2 } });

      // Content fades out as user scrolls
      gsap.to(contentRef.current, {
        y: '-18%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '35% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen overflow-hidden"
      style={{ background: '#1A241F' }}
    >
      {/* ── Atmosphere / sky base ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255,255,255,0.04) 0%, rgba(35,48,41,0.65) 45%, #1A241F 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(35,48,41,0.4) 25%, #1A241F 60%, #17201C 100%)',
        }}
      />

      {/* ── Sunlight rays ── */}
      <div
        ref={lightRef}
        className="absolute top-0 left-0 right-0 pointer-events-none will-change-transform"
        style={{ height: '75%' }}
      >
        {/* Central glow */}
        <div
          className="absolute"
          style={{
            top: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '480px',
            height: '480px',
            background:
              'radial-gradient(ellipse at center, rgba(230,230,230,0.10) 0%, rgba(160,160,160,0.03) 35%, transparent 65%)',
            filter: 'blur(10px)',
          }}
        />
        {/* Individual light shafts */}
        {[
          { left: '28%', width: '2px', skew: '-20deg', delay: '0s' },
          { left: '34%', width: '3px', skew: '-12deg', delay: '1s' },
          { left: '40%', width: '1.5px', skew: '-6deg', delay: '2s' },
          { left: '46%', width: '4px', skew: '0deg', delay: '0.5s' },
          { left: '52%', width: '2px', skew: '6deg', delay: '1.5s' },
          { left: '58%', width: '3px', skew: '13deg', delay: '2.5s' },
          { left: '64%', width: '1.5px', skew: '20deg', delay: '0.8s' },
        ].map((ray, i) => (
          <div
            key={i}
            className="absolute animate-ray"
            style={{
              top: 0,
              left: ray.left,
              width: ray.width,
              height: '72%',
              background: `linear-gradient(to bottom, rgba(220,220,220,0.22) 0%, transparent 100%)`,
              transform: `skewX(${ray.skew})`,
              transformOrigin: 'top center',
              animationDelay: ray.delay,
              filter: 'blur(1.5px)',
            }}
          />
        ))}
      </div>

      {/* ── Background trees ── */}
      <div
        ref={treesBackRef}
        className="absolute bottom-0 w-full pointer-events-none will-change-transform"
        style={{ zIndex: 2 }}
      >
        <TreesSVGBack />
      </div>

      {/* ── Mid trees ── */}
      <div
        ref={treesMidRef}
        className="absolute bottom-0 w-full pointer-events-none will-change-transform"
        style={{ zIndex: 3 }}
      >
        <TreesSVGMid />
      </div>

      {/* ── Foreground trees ── */}
      <div
        ref={treesForeRef}
        className="absolute bottom-0 w-full pointer-events-none will-change-transform"
        style={{ zIndex: 5 }}
      >
        <TreesSVGFore />
      </div>

      {/* ── Floating herbs / particles ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 6 }}
      >
        {HERBS.map((h, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: h.left,
              top: h.top,
              animation: `float ${h.dur} ease-in-out infinite`,
              animationDelay: h.delay,
              opacity: 0.35 + (i % 3) * 0.12,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width={h.size}
              height={h.size}
              style={{
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))',
              }}
            >
              {i % 3 === 0 ? (
                /* Leaf shape A */
                <path
                  d="M12 2C12 2 4 7.5 4 14C4 18.42 7.58 22 12 22C16.42 22 20 18.42 20 14C20 7.5 12 2 12 2Z"
                  fill={i % 2 === 0 ? 'rgba(220,220,220,0.60)' : 'rgba(180,180,180,0.45)'}
                />
              ) : i % 3 === 1 ? (
                /* Leaf shape B */
                <path
                  d="M12 21C12 21 3 15 3 9C3 5.69 5.69 3 9 3C10.6 3 12 3.9 12 3.9C12 3.9 13.4 3 15 3C18.31 3 21 5.69 21 9C21 15 12 21 12 21Z"
                  fill="rgba(170,170,170,0.45)"
                />
              ) : (
                /* Herb / droplet */
                <path
                  d="M12 2L5 10H9V22H15V10H19L12 2Z"
                  fill="rgba(200,200,200,0.50)"
                />
              )}
            </svg>
          </div>
        ))}
      </div>

      {/* ── 3D Bottle Model with orbiting leaves ── */}
      <HeroBottle3D />

      {/* ── Hero content ── */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center will-change-transform"
      >
        <p className="hero-tag section-tag mb-5">Natural Ayurvedic Formulas</p>

        <h1 className="mb-1">
          <span className="hero-title-line-1 heading-xl text-cream block drop-shadow-lg">
            Ancient Wisdom for
          </span>
          <span
            className="hero-title-line-2 heading-xl italic block"
            style={{
              color: '#D4AF37',
              textShadow: '0 0 40px rgba(212,175,55,0.15)',
            }}
          >
            Modern Wellness
          </span>
        </h1>

        <p className="hero-desc mt-5 max-w-xl text-cream/65 text-base leading-relaxed font-sans">
          Natural Ayurvedic formulas of traditional herbs crafted with
          wisdom-precision extraction methods to restore balance of the body,
          mind &amp; soul.
        </p>

        <div className="hero-cta mt-8 flex gap-4 flex-wrap justify-center">
          <a href="#formulas" className="btn-gold">
            Explore The Formulas
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-cream/50 text-[10px] tracking-[0.35em] uppercase font-sans">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-gold-500/60 to-transparent" />
          <div
            className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #040404)',
          zIndex: 15,
        }}
      />
    </section>
  );
}
