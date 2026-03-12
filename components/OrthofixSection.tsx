'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const ThreeBottle = dynamic(() => import('@/components/ThreeBottle'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500/50 border-t-gold-500 rounded-full animate-spin" />
    </div>
  ),
});

const FEATURES = [
  'Reduces chronic joint pain and stiffness',
  'Helps restore cartilage and synovial fluid',
  'Natural reduction of inflammation',
];

const FLOATING_HERBS = [
  { label: 'Ashwagandha', angle: -40, radius: 180 },
  { label: 'Gurkhalil', angle: 40, radius: 195 },
  { label: 'Kali Erai', angle: 140, radius: 185 },
  { label: 'Rasna', angle: 220, radius: 190 },
];

export default function OrthofixSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Section heading entrance ── */
      gsap.fromTo(
        '.orthofix-heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      /* ── Features stagger ── */
      gsap.fromTo(
        '.orthofix-feature',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.orthofix-features', start: 'top 80%' },
        },
      );

      /* ── Stats ── */
      gsap.fromTo(
        '.orthofix-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.orthofix-stats', start: 'top 82%' },
        },
      );

      /* ── 3D canvas scale in ── */
      if (canvasRef.current) {
        gsap.fromTo(
          canvasRef.current,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: canvasRef.current, start: 'top 80%' },
          },
        );

        /* ── Camera zoom effect simulated via scale on scroll ── */
        gsap.to(canvasRef.current, {
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      /* ── Floating herb labels ── */
      gsap.fromTo(
        '.herb-float-label',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.8)',
          scrollTrigger: { trigger: canvasRef.current, start: 'top 75%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="orthofix"
      className="py-24 px-6 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, #050505 0%, #080808 50%, #050505 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Top tag ── */}
        <div className="text-center mb-4">
          <p className="section-tag">Ingredient Focus</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: 3D Bottle ── */}
          <div
            ref={canvasRef}
            className="relative will-change-transform order-2 md:order-1"
            style={{ height: isMobile ? '380px' : '520px' }}
          >
            {/* Floating ingredient labels around bottle */}
            {!isMobile &&
              FLOATING_HERBS.map((herb, i) => {
                const rad = (herb.angle * Math.PI) / 180;
                const x = 50 + (Math.cos(rad) * herb.radius) / 5.2;
                const y = 50 + (Math.sin(rad) * herb.radius) / 5.2;
                return (
                  <div
                    key={herb.label}
                    className="herb-float-label absolute z-10 pointer-events-none"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: `float ${5 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.6}s`,
                    }}
                  >
                    <div
                      className="glass-card px-3 py-1.5 rounded-full text-xs font-sans text-gold-400 border-gold-500/30 whitespace-nowrap"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.25))',
                      }}
                    >
                      ✦ {herb.label}
                    </div>
                  </div>
                );
              })}

            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
              }}
            />

            {!isMobile ? (
              <ThreeBottle className="w-full h-full" showParticles />
            ) : (
              /* Simplified mobile: static bottle illustration */
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 120 260" width="120" height="260" fill="none">
                  <defs>
                    <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#282828" />
                      <stop offset="100%" stopColor="#0d0d0d" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M35 240 Q25 230 25 200 L25 100 Q25 85 35 80 L40 70 L40 55 Q40 45 50 45 Q55 40 60 40 Q65 40 70 45 L80 55 L80 70 L85 80 Q95 85 95 100 L95 200 Q95 230 85 240 Z"
                    fill="url(#bottleGrad)"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1"
                  />
                  <rect x="50" y="30" width="20" height="18" rx="3" fill="#111111" />
                  <rect x="55" y="15" width="10" height="18" rx="2" fill="#1a1a1a" />
                  <rect x="50" y="8" width="20" height="10" rx="2" fill="#111111" />
                  <ellipse cx="60" cy="240" rx="25" ry="5" fill="#0a0a0a" />
                  <line x1="35" y1="130" x2="85" y2="130" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                  <text x="42" y="155" fill="rgba(220,220,220,0.7)" fontSize="8" fontFamily="serif">
                    Ashokvati
                  </text>
                  <rect x="44" y="72" width="2" height="15" rx="1" fill="#c0c0c0" opacity="0.8" />
                </svg>
              </div>
            )}
          </div>

          {/* ── Right: Content ── */}
          <div className="order-1 md:order-2">
            <div className="orthofix-heading">
              <h2 className="heading-lg text-cream mb-4">
                Orthofix <span className="text-gold-400">Care</span>
              </h2>
              <p className="text-cream/55 font-sans text-sm leading-relaxed max-w-sm mb-6">
                A powerful synergy of nature&apos;s best anti-inflammatory roots
                and herbs designed for mobility.
              </p>
            </div>

            {/* Features */}
            <div className="orthofix-features space-y-4 mb-8">
              {FEATURES.map((f) => (
                <div key={f} className="orthofix-feature feature-item">
                  <div className="feature-dot">
                    <svg className="w-3 h-3 text-gold-400" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-cream/70 text-sm font-sans leading-relaxed">{f}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="orthofix-stats grid grid-cols-2 gap-5 mb-8">
              {[
                { val: '4 Roots', desc: 'Ancient botanical herbs' },
                { val: '24 Hours', desc: 'Continuous inflammation reduction' },
              ].map((s) => (
                <div key={s.val} className="orthofix-stat glass-card rounded-2xl p-4">
                  <p className="stat-number text-2xl">{s.val}</p>
                  <p className="text-cream/45 text-xs font-sans mt-1 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>

            <a href="#shop" className="btn-gold">
              Shop Orthofix Care
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
